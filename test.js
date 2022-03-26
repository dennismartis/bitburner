import { getConnectedNodes } from "./utils.js";

/** @param {NS} ns **/
export async function main(ns) {
  console.log(getConnectedNodes(ns, "home"));
}
