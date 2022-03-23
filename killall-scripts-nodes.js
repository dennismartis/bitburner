import { getConnectedNodes } from './utils.js';
/** @param {NS} ns **/
export async function main(ns) {
	const connectedNodes = getConnectedNodes(ns)
	for (let i = 0; i < connectedNodes.length; i++) {
		if (connectedNodes[i] != 'home'){
			ns.killall(connectedNodes[i])
		}
	}
}