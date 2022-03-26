import { getConnectedNodes } from "./utils.js";

/** @param {NS} ns **/
export async function main(ns) {
  ns.tprint(getConnectedNodes(ns, "home"));
}
