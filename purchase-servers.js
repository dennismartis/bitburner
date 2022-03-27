/** @param {import(".").NS } ns */
export async function main(ns) {
  // Iterator we'll use for our loop
  ram = ns.args[0];
  script = ns.args[1] || "early-hack-script.js";
  var i = 0;

  // Continuously try to purchase servers until we've reached the maximum
  // amount of servers
  while (i < ns.getPurchasedServerLimit()) {
    // Check if we have enough money to purchase a server
    if (ns.getServerMoneyAvailable("home") > ns.getPurchasedServerCost(ram)) {
      // If we have enough money, then:
      //  1. Purchase the server
      //  2. Copy our hacking script onto the newly-purchased server
      //  3. Run our hacking script on the newly-purchased server with 3 threads
      //  4. Increment our iterator to indicate that we've bought a new server
      var hostname = ns.purchaseServer("pserv-" + i, ram);
      const maxRam = ns.getServerMaxRam(hostname);
      const scriptRam = ns.getScriptRam(script);
      const threads = Math.floor(maxRam / scriptRam);
      await ns.scp(script, hostname);
      ns.exec(script, hostname, threads);
      ++i;
      await ns.sleep(1000);
    }
  }
}
