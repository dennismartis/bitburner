import { getConnectedNodes } from "./utils.js";

/** @param {import(".").NS } ns */
export async function main(ns) {
  ns.tprint(getConnectedNodes(ns, "home"));
}
