/** @param {NS} ns **/
export function getConnectedNodes(ns, host = "home") {
  const scannedNodes = [host];
  for (const node of scannedNodes) {
    const scanList = ns.scan(node);
    for (const scan of scanList) {
      if (!scannedNodes.includes(scan)) {
        scannedNodes.push(scan);
      }
    }
  }
  const home = scannedNodes.indexOf(host);
  if (home > -1) {
    scannedNodes.splice(home, 1);
  }
  return scannedNodes;
}
