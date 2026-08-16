const assert = require("node:assert/strict");
const { JSDOM, VirtualConsole } = require("jsdom");

(async () => {
  const virtualConsole = new VirtualConsole();
  const errors = [];
  virtualConsole.on("jsdomError", error => errors.push(error));
  virtualConsole.on("error", error => errors.push(error));

  const dom = await JSDOM.fromURL("http://127.0.0.1:4173/", {
    resources: "usable",
    runScripts: "dangerously",
    pretendToBeVisual: true,
    virtualConsole,
    beforeParse(window) {
      window.scrollTo = () => {};
      window.HTMLElement.prototype.scrollIntoView = () => {};
      window.HTMLCanvasElement.prototype.getContext = () => null;
      window.matchMedia = () => ({ matches: false, addListener() {}, removeListener() {} });
    }
  });

  await new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("App did not load")), 5000);
    dom.window.addEventListener("load", () => setTimeout(() => { clearTimeout(timer); resolve(); }, 150));
  });

  const { document, localStorage } = dom.window;
  assert.equal(document.title, "Periodic Table for Kids", "uses the new product name");
  assert.equal(document.querySelectorAll(".element-tile").length, 118, "renders all 118 elements");
  assert.match(document.querySelector("#elementDetail").textContent, /Oxygen/, "starts with oxygen selected");
  assert.ok(document.querySelector(".atom-canvas"), "renders the interactive 3D atom canvas");
  assert.equal(document.querySelector('[data-atom-tool="move"]'), null, "does not offer atom move mode");
  assert.equal(document.querySelector(".atom-zoom-control").textContent.replace(/\s/g,""), "−+Zoom", "labels the plus and minus controls as Zoom");
  assert.match(document.querySelector(".atom-reset-control").textContent, /Reset/, "labels the home-view control as Reset");
  assert.ok(document.querySelector(".atom-reset-control svg"), "uses a home icon for reset");
  assert.ok(document.querySelectorAll(".element-tile.is-recipe-partner").length >= 4, "highlights Oxygen recipe partners");

  assert.equal(document.querySelector("#legend").hidden, false, "shows color cousins by default");
  assert.equal(document.querySelector('[data-category="post"]'), null, "omits the unused Soft metals filter");
  assert.equal(document.querySelector('[data-category="unknown"]'), null, "omits the unused Mystery elements filter");
  const nobleFilter = document.querySelector('[data-category="noble"]');
  assert.match(nobleFilter.dataset.tip, /gases/i, "color filter includes a kid-friendly tooltip");
  nobleFilter.click();
  assert.ok(document.querySelectorAll(".element-tile.is-filtered-out").length > 100, "color filter spotlights one cousin group");
  assert.equal(document.querySelector('[data-category="noble"]').getAttribute("aria-pressed"), "true", "announces the active filter");

  document.querySelector('[data-view-target="maker"]').click();
  assert.equal(document.querySelector("#makerView").hidden, false, "opens the molecule maker");
  document.querySelector('[data-symbol="H"]').click();
  assert.equal(document.querySelector('[aria-label="Hydrogen atoms"]').getAttribute("aria-valuenow"), "1", "updates the crafting meter");
  document.querySelector('[data-symbol="H"]').click();
  document.querySelector('[data-symbol="O"]').click();
  assert.equal(document.querySelectorAll(".mix-atom").length, 3, "adds three atoms to the mixer");
  assert.ok(document.querySelector("#mixingBowl").classList.contains("is-ready"), "animates the completed crafting table");
  assert.equal(document.querySelector("#discoverMix").disabled, false, "unlocks crafting when every meter is full");
  document.querySelector("#discoverMix").click();
  assert.match(document.querySelector("#discoveryResult").textContent, /Water/, "discovers water");
  assert.ok(document.querySelector("#mixingBowl.is-crafted-team"), "transforms the crafting table after success");
  assert.ok(document.querySelector(".atom-team-canvas"), "shows a spinnable 3D atom-team model");
  assert.match(document.querySelector(".atom-team-caption").textContent, /Water/, "labels the crafted atom team");
  assert.equal(document.querySelector("#craftAnother").hidden, false, "offers to craft another atom team");
  assert.ok(document.querySelectorAll("#confetti .confetti-piece").length >= 70, "celebrates a successful craft across the window");
  assert.match(localStorage.getItem("bubble-lab-progress-v1"), /water/, "saves the recipe");
  document.querySelector("#craftAnother").click();
  assert.equal(document.querySelectorAll("#mixingBowl .craft-slot").length, 9, "brings back the nine-slot crafting table");
  assert.equal(document.querySelector("#craftAnother").hidden, true, "hides the craft-another action after returning");

  const moreRecipes = [
    ["oxygen-pair","O","O","Oxygen Pair"],
    ["hydrogen-pair","H","H","Hydrogen Pair"],
    ["nitrogen-pair","N","N","Nitrogen Pair"],
    ["carbon-dioxide","C","O","O","Carbon Dioxide"],
    ["methane","C","H","H","H","H","Methane"],
    ["ammonia","N","H","H","H","Ammonia"],
    ["table-salt","Na","Cl","Table Salt"],
    ["silica","Si","O","O","Silica"],
    ["rust","Fe","Fe","O","O","O","Rust"]
  ];
  for (const recipe of moreRecipes) {
    const expected = recipe.at(-1);
    document.querySelector(`[data-recipe="${recipe[0]}"]`).click();
    recipe.slice(1,-1).forEach(symbol => document.querySelector(`[data-symbol="${symbol}"]`).click());
    document.querySelector("#discoverMix").click();
    assert.match(document.querySelector("#discoveryResult").textContent, new RegExp(expected), `discovers ${expected}`);
  }

  assert.equal(JSON.parse(localStorage.getItem("bubble-lab-progress-v1")).recipes.length, 10, "saves all ten recipes");

  document.querySelector('[data-view-target="collection"]').click();
  assert.equal(document.querySelector("#collectionView").hidden, false, "opens the sticker book");
  assert.equal(document.querySelectorAll("#moleculeStickers .is-found").length, 10, "shows all recipe stickers");
  const stickerTotalBeforeReset = document.querySelector("#collectionTotal").textContent;
  document.querySelector("#resetStickers").click();
  assert.equal(document.querySelector("#resetStickersModal").hidden, false, "asks before resetting stickers");
  document.querySelector("#cancelResetStickers").click();
  assert.equal(document.querySelector("#collectionTotal").textContent, stickerTotalBeforeReset, "keeps stickers when reset is canceled");
  document.querySelector("#resetStickers").click();
  document.querySelector("#confirmResetStickers").click();
  assert.equal(document.querySelector("#resetStickersModal").hidden, true, "closes the confirmation after reset");
  assert.equal(document.querySelector("#collectionTotal").textContent, "0", "resets the sticker count");
  assert.equal(document.querySelectorAll(".sticker.is-found").length, 0, "locks every sticker again");
  assert.deepEqual(JSON.parse(localStorage.getItem("bubble-lab-progress-v1")), {elements:[],recipes:[]}, "saves the reset sticker book");
  assert.equal(errors.length, 0, errors.map(error => error.message).join("\n"));
  console.log("Smoke test passed: branding, 118 elements, cousin filters, partner clues, spin/zoom atom, crafting meters, all 10 recipes, and confirmed sticker reset.");
  dom.window.close();
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
