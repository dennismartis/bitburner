import { getNodesWithAdminRights } from './utils.js'
/** @param {NS} ns **/
export async function main(ns) {
	const file = ns.args[0]
	const source = ns.args[1] || 'home'
	const nodes = getNodesWithAdminRights(ns);
	for (let i = 0 ; i < nodes.length ; i++ ) {
		const destination = nodes[i];
		if (ns.fileExists(file, destination)) {
			ns.rm(file, destination);
		};
		await ns.scp(file, source, destination);
	};
}