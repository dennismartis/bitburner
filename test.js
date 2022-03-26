import { getConnectedNodes } from "./utils.js";

export async function main(ns) {
  console.log(getConnectedNodes(ns, "home"));
}
