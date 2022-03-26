import { getNodesWithAdminRights } from "./utils.js";
import { nodeListToObj } from "./utils.js";

/** @param {NS} ns **/
export async function main(ns) {
  const target = ns.args[0];
  const ratios = [0.05, 0.15, 0.8];
  const hackDelay = 10000;
  const growDelay = 10000;
  const weakenDelay = 10000;
  const hackScript = "hack.js";
  const weakenScript = "weaken.js";
  const growScript = "grow.js";
  const hackRatio = ratios[0];
  const weakenRatio = ratios[1];
  const growRatio = ratios[2];
  var availableThreads = {};
  //Collect all nodes with admin rights
  const adminNodes = getNodesWithAdminRights(ns);
  const purchasedNodes = ns.getPurchasedServers();
  ns.tprint(`pur nodes: ${adminNodes} `);
  const nodeObjects = nodeListToObj(ns, adminNodes);
  ns.tprint(nodeObjects);
  for (let i = 0; i < adminNodes.length; i++) {
    const node = nodeObjects[i];
    const hostname = node.hostname;
    const availableRam = node.maxRam;
    const scriptRam = ns.getScriptRam(growScript);
    const availableThreadsOnNode = Math.floor(availableRam / scriptRam);
    node.threadsAvailable = availableThreadsOnNode;
    availableThreads[`${hostname}`] = availableThreadsOnNode;
    if (!ns.fileExists(hackScript, hostname)) {
      await ns.scp(hackScript, "home", hostname);
    }
    if (!ns.fileExists(growScript, hostname)) {
      await ns.scp(growScript, "home", hostname);
    }
    if (!ns.fileExists(weakenScript, hostname)) {
      await ns.scp(weakenScript, "home", hostname);
    }
  }
  //const totalThreads =
  var totalThreads = Object.values(availableThreads).reduce((a, b) => a + b, 0);
  var hackThreads = Math.floor(totalThreads * hackRatio);
  var weakenThreads = Math.floor(totalThreads * weakenRatio);
  var growThreads = Math.floor(totalThreads * growRatio);
  ns.tprint(`total threads available: ${totalThreads} `);
  ns.tprint(`total hack threads available: ${hackThreads} `);
  ns.tprint(`total weaken available: ${weakenThreads} `);
  ns.tprint("Starting weaken scripts");
  for (let i = 0; i < adminNodes.length; i++) {
    ns.tprint(nodeObjects[i].hostname);
    const node = nodeObjects[i];
    const hostname = node.hostname;
    const threads = node.threadsAvailable;
    ns.tprint(threads);
    //ns.killall(hostname)
    if (threads > 0 && weakenThreads > 0) {
      await ns.sleep(weakenDelay);
      if (threads <= weakenThreads) {
        const numThreads = threads;
        ns.exec(weakenScript, hostname, numThreads, target);
        weakenThreads = weakenThreads - numThreads;
        node.threadsAvailable = node.threadsAvailable - numThreads;
        ns.tprint(weakenThreads);
      } else {
        const numThreads = weakenThreads;
        ns.exec(weakenScript, hostname, numThreads, target);
        weakenThreads = weakenThreads - numThreads;
        node.threadsAvailable = node.threadsAvailable - numThreads;
        ns.tprint(weakenThreads);
      }
    }
  }
  ns.tprint("waiting for security to lower");
  const securityLevel = ns.getServerSecurityLevel(target);
  const minSecurityLevel = ns.getServerMinSecurityLevel(target);
  while (securityLevel > minSecurityLevel + 5) {
    ns.tprint(`securitylevel: ${securityLevel} `);
    await ns.sleep(1000);
  }
  ns.tprint("starting grow scripts now");
  for (let i = 0; i < adminNodes.length; i++) {
    const node = nodeObjects[i];
    const hostname = node.hostname;
    //const maxRam = ns.getServerMaxRam(hostname)
    //const usedRam = ns.getServerUsedRam(hostname)
    const threads = node.threadsAvailable;
    if (threads > 0 && growThreads > 0) {
      await ns.sleep(growDelay);
      if (threads <= growThreads) {
        const numThreads = threads;
        ns.exec(growScript, hostname, numThreads, target);
        growThreads = growThreads - numThreads;
        node.threadsAvailable = node.threadsAvailable - numThreads;
        ns.tprint(`growthreads: ${growThreads}`);
        ns.tprint(`weakenthreads: ${weakenThreads}`);
      } else {
        const numThreads = growThreads;
        ns.exec(growScript, hostname, numThreads, target);
        growThreads = growThreads - numThreads;
        node.threadsAvailable = node.threadsAvailable - numThreads;
        ns.tprint(`growthreads: ${growThreads}`);
        ns.tprint(`weakenthreads: ${weakenThreads}`);
      }
    }
  }
  const availableMoney = ns.getServerMoneyAvailable(target);
  const totalMoney = ns.getServerMaxMoney(target);
  ns.tprint("waiting for money to grow");
  while (availableMoney < totalMoney * 0.8) {
    ns.tprint(`available money: ${availableMoney}`);
    await ns.sleep(5000);
  }

  for (let i = 0; i < adminNodes.length; i++) {
    const node = nodeObjects[i];
    const hostname = node.hostname;
    const threads = node.threadsAvailable;
    if (threads > 0 && hackThreads > 0) {
      await ns.sleep(hackDelay);
      if (threads <= hackThreads) {
        const numThreads = threads;
        ns.exec(hackScript, hostname, numThreads, target);
        hackThreads = hackThreads - numThreads;
      } else {
        const numThreads = hackThreads;
        ns.exec(hackScript, hostname, numThreads, target);
        hackThreads = hackThreads - numThreads;
      }
    }
  }
}
