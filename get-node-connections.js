export async function main(ns) {
	// Run scan script
	// store scanned nodes in array
	// scan nodes in array and remove from array when scan is done
	// store found nodes in scanned nodes array 
	let scannedServers = []
	let scanList = ['home']
	let connections = {}
	for (const node of scanList) {
		if (!scannedServers.includes(node)) {
			const result = ns.scan(node)
			connections[(node)] = result;
			for (const server of result) {
				if (!scanList.includes(server)){
					scanList.push(server)
				}
				if (!scannedServers.includes(node)) {
					scannedServers.push(node)
				}
			}
		}
	}
	for (const node of scanList) {
		ns.tprint(`${node} has connections with: ${connections[(node)]} `)
	}
	// for (const node of scanList){
	// 	const maxMoney = ns.getServerNumPortsRequired(node);
	// 	ns.tprint(`${node}\tports required:\t${maxMoney}`)
	// }
}