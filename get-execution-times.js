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
    const weakenTimeFormatted = ns.nFormat(weakenTime, "00:00:00");
    const hackTime = ns.getHackTime(hostname) / 1000;
    const hackTimeFormatted = ns.nFormat(hackTime, "00:00:00");
    ns.tprint(
      `${hostname}: Grow time: ${growTimeFormatted}, Hack time: ${hackTimeFormatted}, Weaken time: ${weakenTimeFormatted} `
    );
  }
}
