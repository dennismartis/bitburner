import { nodeListToObj } from './utils.js'
import { getNodesWithAdminRights } from './utils.js'

/** @param {NS} ns **/
export async function main(ns) {
	const nodes = getNodesWithAdminRights(ns);
	//nodes.sort()
	ns.tprint(nodes)
	var nodeObjects = nodeListToObj(ns, nodes);
	// nodeObjects.sort((a, b) => a.hostname.toUpperCase() > b.hostname.toUpperCase());
	nodeObjects.sort(function(a, b) {
		const hostA = a.hostname.toUpperCase(); // ignore upper and lowercase
		const hostB = b.hostname.toUpperCase(); // ignore upper and lowercase
		if (hostA < hostB) {
			return -1;
		}
		if (hostA > hostB) {
			return 1;
		}
		// names must be equal
		return 0;
		});
	await ns.write('hack_analytics.txt','Hack Analytics\n', 'w')
	for (let i = 0; i < nodes.length; i++ ) {
		const node = nodeObjects[i]
		const host = node.hostname
		const timeWeak =  ns.getWeakenTime(host) / 1000
		const timeGrow = ns.getGrowTime(host) / 1000
		const timeHack = ns.getHackTime(host) / 1000
		const reqHackSkill = node.requiredHackingSkill
		const serverGrowth = node.serverGrowth
		const moneyMax = ns.nFormat(node.moneyMax, '0a')
		const moneyAvailable = ns.nFormat(node.moneyAvailable, '0a')
		const hackDifficulty = node.hackDifficulty
		const hackSuccesRate= ns.hackAnalyzeChance(host)
		const hackAmmount = ns.hackAnalyze(host)
		const maxYield = ns.nFormat((node.moneyMax * hackAmmount * hackSuccesRate), '0a')
		await ns.write('hack_analytics.txt',`\n======= ${host} ===========\n`, 'a')
		await ns.write('hack_analytics.txt',`${timeWeak} Weaken time \n`, 'a')
		await ns.write('hack_analytics.txt',`${timeGrow} Grow time \n`, 'a')
		await ns.write('hack_analytics.txt',`${timeHack} Hack time \n`, 'a')
		await ns.write('hack_analytics.txt',`${reqHackSkill} Required hack \n`, 'a')
		await ns.write('hack_analytics.txt',`${serverGrowth} Server growth \n`, 'a')
		await ns.write('hack_analytics.txt',`${moneyMax} Maximum money\n`, 'a')
		await ns.write('hack_analytics.txt',`${moneyAvailable} Money available\n`, 'a')
		await ns.write('hack_analytics.txt',`${hackDifficulty} Hack difficulty\n`, 'a')
		await ns.write('hack_analytics.txt',`${hackAmmount} Hack ammount\n`, 'a')
		await ns.write('hack_analytics.txt',`${hackSuccesRate} Hack succesrate\n`, 'a')
		await ns.write('hack_analytics.txt',`${maxYield} Maximum yield\n`, 'a')

	}
	const mults = ns.getHackingMultipliers()

}