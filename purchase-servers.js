/** @param {NS} ns **/
export async function main(ns) {
  var ram = ns.args[0] || 1024;
  var i = 0;

  while (ns.getPurchasedServers().length < ns.getPurchasedServerLimit()) {
    var host;
    if (ns.getServerMoneyAvailable("home") > ns.getPurchasedServerCost(ram)) {
      var host = ns.purchaseServer("pserv-" + i, ram);
      ++i;
    }
    await ns.sleep(1000);
  }
}
