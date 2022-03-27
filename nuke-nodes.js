import { getConnectedNodes } from "./utils.js";

/** @param {import(".").NS } ns */
function printResults(ns, program, portsOpen) {
  ns.tprint(`Opened ${program} port on nodes: ${portsOpen} `);
}

export async function main(ns) {
  const nodeObjects = getConnectedNodes(ns);
  const sshPortOpen = [];
  const ftpPortOpen = [];
  const smtpPortOpen = [];
  const httpPortOpen = [];
  const sqlPortOpen = [];
  const nuked = [];
  for (let i = 0; i < connectedNodes.length; i++) {
    const node = nodeObjects[i];
    const hostname = node.hostname;
    if (hostname === "home" || node.hasAdminRights) {
      continue;
    }
    if (ns.fileExists("BruteSSH.exe", "home") && !node.sshPortOpen) {
      await ns.brutessh(hostname);
      sshPortOpen.push(hostname);
    }
    if (ns.fileExists("FTPcrack.exe", "home") && !node.ftpPortOpen) {
      await ns.ftpcrack(hostname);
      ftpPortOpen.push(hostname);
    }
    if (ns.fileExists("relaySMTP.exe", "home") && !node.smtpPortOpen) {
      await ns.relaysmtp(hostname);
      smtpPortOpen.push(hostname);
    }
    if (ns.fileExists("HTTPWorm.exe", "home") && !node.httpPortOpen) {
      await ns.httpworm(hostname);
      httpPortOpen.push(hostname);
    }
    if (ns.fileExists("SQLInject.exe", "home") && !node.sqlPortOpen) {
      await ns.sqlinject(hostname);
      sqlPortOpen.push(hostname);
    }
    if (
      ns.fileExists("NUKE.exe", "home") &&
      node.openPortCount >= node.numOpenPortsRequired
    ) {
      await ns.nuke(hostname);
      nuked.push(hostname);
    }
  }
  if (sshPortOpen.length > 0) {
    printResults(ns, "ssh", sshPortOpen);
  }
  if (smtpPortOpen.length > 0) {
    printResults(ns, "smtp", smtpPortOpen);
  }
  if (ftpPortOpen.length > 0) {
    printResults(ns, "ftp", ftpPortOpen);
  }
  if (httpPortOpen.length > 0) {
    printResults(ns, "http", httpPortOpen);
  }
  if (sqlPortOpen.length > 0) {
    printResults(ns, "sql", sqlPortOpen);
  }
  if (nuked.length > 0) {
    ns.tprint(`Nuked the following nodes: ${nuked} `);
  }
}
