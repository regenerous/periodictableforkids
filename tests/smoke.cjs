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
  assert.ok(document.querySelectorAll(".element-tile.is-recipe-partner").length >= 4, "highlights Oxygen recipe partners");

  document.querySelector("#legendToggle").click();
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
  assert.match(localStorage.getItem("bubble-lab-progress-v1"), /water/, "saves the recipe");

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
  assert.equal(errors.length, 0, errors.map(error => error.message).join("\n"));
  console.log("Smoke test passed: branding, 118 elements, cousin filters, partner clues, 3D atom, crafting meters, all 10 recipes, and saved stickers.");
  dom.window.close();
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
