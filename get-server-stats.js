/** @param {import(".").NS } ns */
export async function main(ns) {
  const hostname = ns.args[0];
  const nodeObject = ns.getServer(hostname);
  const maxMoney = ns.getServerMaxMoney(hostname);
  const money = ns.getServerMoneyAvailable(hostname);
  const baseDifficulty = nodeObject.baseDifficulty;

  ns.tprint(`${hostname} stats\n============= `);
  ns.tprint(`Money available: ${nodeObject.moneyAvailable}`);
  ns.tprint(`Max money: ${nodeObject.maxMoney}`);
  ns.tprint(`Base difficulty: ${nodeObject.baseDifficulty}`);
  ns.tprint(`Min difficulty: ${nodeObject.minDifficulty}`);
  ns.tprint(`Hack difficulty: ${nodeObject.hackDifficulty}`);
  ns.tprint(`Required hacking skill: ${nodeObject.requiredHackingSkill}`);
  ns.tprint(`Server growth: ${nodeObject.serverGrowth}`);
  ns.tprint(`Open ports required: ${nodeObject.openPortsRequired}`);
  ns.tprint(`Open port count: ${nodeObject.openPortCount}`);
  ns.tprint(`Backdoor installed: ${nodeObject.backdoorInstalled}`);
  ns.tprint(`CPU cores: ${nodeObject.cpuCores}`);
  ns.tprint(`Max Ram: ${nodeObject.maxRam}`);
  ns.tprint(`Ram used: ${nodeObject.ramUsed}`);
}
