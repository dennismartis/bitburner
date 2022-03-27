import { getConnectedNodes } from "./utils.js";

/** @param {import(".").NS } ns */
export async function main(ns) {
  const connectedNodes = getConnectedNodes(ns);
  const file = ns.args[0];
  for (let i = 0; i < connectedNodes.length; i++) {
    const node = connectedNodes[i];
    const hostname = node.hostname;
    if (ns.scriptRunning(file, hostname)) {
      ns.kill(file, hostname);
    }
    await ns.scp(file, "home", hostname);
  }
}
