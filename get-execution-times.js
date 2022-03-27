import { getConnectedNodes } from "./utils.js";

/** @param {import(".").NS } ns */
export async function main(ns) {
  const connectedNodes = getConnectedNodes(ns);
  for (let i = 0; i < connectedNodes.length; i++) {
    const node = connectedNodes[i];
    const hostname = node.hostname;
    const growTime = ns.getGrowTime(hostname) / 1000;
    const growTimeFormatted = ns.nFormat(growTime, "00:00:00");
    const weakenTime = ns.getWeakenTime(hostname) / 1000;
    const hackTime = ns.getHackTime(hostname) / 1000;
    ns.tprint(
      `${hostname}:\tGrow time: ${growTimeFormatted}, Hack time: ${hackTime}, Weaken time: ${weakenTime} `
    );
  }
}
