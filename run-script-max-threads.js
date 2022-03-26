import { getConnectedNodes } from "./utils.js";

/** @param {import(".").NS } ns */
export async function main(ns) {
  const connectedNodes = getConnectedNodes(ns);
  const script = ns.args[0];
  const target = ns.args[1];
  for (let i = 0; i < connectedNodes.length; i++) {
    const node = connectedNodes[i];
    const hostname = connectedNodes[i].hostname;
    if (node.hasAdminRights) {
      const maxRam = node.maxRam;
      const scriptRam = ns.getScriptRam(script);
      const threads = Math.floor(maxRam / scriptRam);
      ns.exec(script, hostname, threads, target);
    }
  }
}
