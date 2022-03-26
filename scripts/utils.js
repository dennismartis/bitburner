/** @param {NS} ns **/
export function getConnectedNodes(ns) {
  // Returns a list with all the nodes on the network
  let scannedServers = [];
  let scanList = ["home"];
  for (const node of scanList) {
    if (!scannedServers.includes(node)) {
      const resultsList = ns.scan(node);
      for (const server of resultsList) {
        if (!scanList.includes(server)) {
          scanList.push(server);
        }
        if (!scannedServers.includes(node)) {
          scannedServers.push(node);
        }
      }
    }
  }
  return scanList;
}

export function getAllNetworkConnections(ns) {
  // Returns an object with the nodes as keys and their network connections as values
  let scannedServers = [];
  let scanList = ["home"];
  let connections = {};
  for (const node of scanList) {
    if (!scannedServers.includes(node)) {
      let result = ns.scan(node);
      connections[node] = result;
      for (const server of result) {
        if (!scanList.includes(server)) {
          scanList.push(server);
        }
        if (!scannedServers.includes(node)) {
          scannedServers.push(node);
        }
      }
    }
  }
  return connections;
}

export function nodeListToObj(ns, nodeList) {
  const nodeObjects = [];
  for (const host of nodeList) {
    const object = ns.getServer(host);
    nodeObjects.push(object);
  }
  return nodeObjects;
}

export function getNodesWithAdminRights(ns) {
  // Returns a list with all the nodes on the network
  const scanList = ["home"];
  const scannedServers = [];
  const nodesWithAdminRights = [];
  for (const node of scanList) {
    if (!scannedServers.includes(node)) {
      const resultsList = ns.scan(node);
      for (const server of resultsList) {
        if (!scanList.includes(server)) {
          scanList.push(server);
        }
        if (!scannedServers.includes(node)) {
          scannedServers.push(node);
        }
      }
    }
  }
  const index = scanList.indexOf("home");
  if (index > -1) {
    scanList.splice(index, 1);
  }
  const nodeObjects = [];
  for (const host of scanList) {
    const object = ns.getServer(host);
    nodeObjects.push(object);
  }
  for (const node of nodeObjects) {
    if (node.hasAdminRights) {
      nodesWithAdminRights.push(node.hostname);
    }
  }
  return nodesWithAdminRights;
}
export function sortObjArray(objArray, item) {
  objArray.sort(function (a, b) {
    const itemA = `${a}.${item}`.toUpperCase(); // ignore upper and lowercase
    const itemB = `${b}.${item}`.toUpperCase(); // ignore upper and lowercase
    if (itemA < itemB) {
      return -1;
    }
    if (itemA > itemB) {
      return 1;
    }
    // names must be equal
    return 0;
  });
  return objArray;
  // objArray.sort(function(a, b, item) {
  //
  // 	var textA = `${a}.${item}`.toUpperCase();
  // 	var textB = `${b}.${item}`.toUpperCase();
  // 	if (/[a-zA-Z]+$/.test(textA) && /^[a-zA-Z]+$/.test(textB)){
  // 		return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
  // 	}
  // 	});
}
