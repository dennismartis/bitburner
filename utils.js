/** @param {NS} ns **/
export function getConnectedNodes(ns, host) {
  const scannedNodes = [host];
  for (const node of scannedNodes) {
    const scanList = ns.scan(node);
    for (const scan of scanList) {
      console.log(scan);
      if (!scannedNodes.includes(scan)) {
        scannedNodes.push(scan);
        console.log("test");
      }
    }
  }
  return scannedNodes;
}
