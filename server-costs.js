/** @param {import(".").NS } ns */
export async function main(ns) {
  const serverLimit = ns.getPurchasedServerLimit();
  const maxRam = ns.getPurchasedServerMaxRam();
  const myMoney = ns.nFormat(ns.getServerMoneyAvailable("home"), "0a");
  for (let i = 1; i <= serverLimit; i++) {
    const purchaseCostServer = ns.getPurchasedServerCost(Math.pow(2, i));
    const purchaseCostAllServers = purchaseCostServer * serverLimit;
    ns.tprint(
      Math.pow(2, i) +
        " -- cost per server: " +
        ns.nFormat(purchaseCostServer, "0a") +
        ", cost for maximum servers: " +
        ns.nFormat(purchaseCostAllServers, "0a")
    );
  }
  ns.tprint(` ${serverLimit} Maximum servers`);
  ns.tprint(`${maxRam} Max ram `);
  ns.tprint(`money available: ${myMoney} `);
}
