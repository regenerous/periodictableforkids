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
      window.matchMedia = () => ({ matches: false, addListener() {}, removeListener() {} });
    }
  });

  await new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("App did not load")), 5000);
    dom.window.addEventListener("load", () => setTimeout(() => { clearTimeout(timer); resolve(); }, 150));
  });

  const { document, localStorage } = dom.window;
  assert.equal(document.querySelectorAll(".element-tile").length, 118, "renders all 118 elements");
  assert.match(document.querySelector("#elementDetail").textContent, /Oxygen/, "starts with oxygen selected");

  document.querySelector('[data-view-target="maker"]').click();
  assert.equal(document.querySelector("#makerView").hidden, false, "opens the molecule maker");
  document.querySelector('[data-symbol="H"]').click();
  document.querySelector('[data-symbol="H"]').click();
  document.querySelector('[data-symbol="O"]').click();
  assert.equal(document.querySelectorAll(".mix-atom").length, 3, "adds three atoms to the mixer");
  document.querySelector("#discoverMix").click();
  assert.match(document.querySelector("#discoveryResult").textContent, /Water/, "discovers water");
  assert.match(localStorage.getItem("bubble-lab-progress-v1"), /water/, "saves the recipe");

  const moreRecipes = [
    ["O","O","Oxygen Pair"],
    ["H","H","Hydrogen Pair"],
    ["N","N","Nitrogen Pair"],
    ["C","O","O","Carbon Dioxide"],
    ["C","H","H","H","H","Methane"],
    ["N","H","H","H","Ammonia"],
    ["Na","Cl","Table Salt"],
    ["Si","O","O","Silica"],
    ["Fe","Fe","O","O","O","Rust"]
  ];
  for (const recipe of moreRecipes) {
    document.querySelector("#discoveryResult .try-again").click();
    const expected = recipe.at(-1);
    recipe.slice(0,-1).forEach(symbol => document.querySelector(`[data-symbol="${symbol}"]`).click());
    document.querySelector("#discoverMix").click();
    assert.match(document.querySelector("#discoveryResult").textContent, new RegExp(expected), `discovers ${expected}`);
  }

  assert.equal(JSON.parse(localStorage.getItem("bubble-lab-progress-v1")).recipes.length, 10, "saves all ten recipes");

  document.querySelector('[data-view-target="collection"]').click();
  assert.equal(document.querySelector("#collectionView").hidden, false, "opens the sticker book");
  assert.equal(document.querySelectorAll("#moleculeStickers .is-found").length, 10, "shows all recipe stickers");
  assert.equal(errors.length, 0, errors.map(error => error.message).join("\n"));
  console.log("Smoke test passed: 118 elements, navigation, all 10 recipes, saved sticker progress.");
  dom.window.close();
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
