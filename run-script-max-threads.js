import { getConnectedNodes } from "./utils.js";

/** @param {import(".").NS } ns */
export async function main(ns) {
  const connectedNodes = getConnectedNodes(ns);
  const script = ns.args[0];
  const target = ns.args[1];
  for (let i = 0; i < connectedNodes.length; i++) {
    const node = connectedNodes[i];
    const hostname = connectedNodes[i].hostname;
    const maxRam = node.maxRam;
    const scriptRam = ns.getScriptRam(script);
    const threads = Math.floor(maxRam / scriptRam);
    if (node.hasAdminRights && maxRam > 0) {
      ns.killall(hostname);
      if (ns.fileExists(script)) {
        ns.rm(script, hostname);
      }
      await ns.scp(script, "home", hostname);
      ns.exec(script, hostname, threads, target);
    }
  }
}
