/** @param {NS} ns **/
export function getConnectedNodes(ns, host) {
  const scannedNodes = [host];
  for (const node of scannedNodes) {
    const scanList = ns.scan(node);
    console.log(
      "🚀 ~ file: utils.js ~ line 6 ~ getConnectedNodes ~ scanList",
      scanList
    );
    for (const scan of scanList) {
      console.log(
        "🚀 ~ file: utils.js ~ line 8 ~ getConnectedNodes ~ scan",
        scan
      );
      if (!scannedNodes.includes(scan)) {
        scannedNodes.push(scan);
        console.log(
          "🚀 ~ file: utils.js ~ line 11 ~ getConnectedNodes ~ scan",
          scan
        );
      }
    }
  }
  console.log(
    "🚀 ~ file: utils.js ~ line 16 ~ getConnectedNodes ~ scannedNodes",
    scannedNodes
  );
  return scannedNodes;
}
