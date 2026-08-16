(() => {
  "use strict";

  const VERSION = "0.2.0";
  const STORAGE_KEY = "bubble-lab-progress-v1";
  const ELEMENTS = window.ELEMENT_DATA;

  const CATEGORY_INFO = {
    alkali: { label: "Bouncy metals", color: "var(--alkali)", description:"Very soft metals that love to join other atoms. Keep them away from water!" },
    alkaline: { label: "Earthy metals", color: "var(--alkaline)", description:"Light metals often found inside rocks, soil, bones, and shells." },
    transition: { label: "Strong metals", color: "var(--transition)", description:"Strong, shiny metals used for tools, wires, coins, buildings, and machines." },
    post: { label: "Soft metals", color: "var(--post)", description:"Metals that are usually softer and melt more easily than the strong metals." },
    metalloid: { label: "In-between", color: "var(--metalloid)", description:"These act partly like metals and partly like nonmetals. Many help computers work." },
    reactive: { label: "Busy nonmetals", color: "var(--reactive)", description:"Busy atoms that often team up with other atoms to make new things." },
    noble: { label: "Calm gases", color: "var(--noble)", description:"Quiet gases that almost always float around alone instead of joining a team." },
    lanthanide: { label: "Shiny rare metals", color: "var(--lanthanide)", description:"Shiny metals that help make bright screens, lasers, and powerful magnets." },
    actinide: { label: "Heavy metals", color: "var(--actinide)", description:"Very heavy atoms. Many give off energy and need special care from scientists." },
    unknown: { label: "Mystery elements", color: "var(--unknown)", description:"Super-rare lab-made atoms that scientists are still trying to understand." }
  };

  const ELEMENT_ITEMS = {
    H:[["💧","Water"],["☀️","Stars"],["🚀","Rocket fuel"]], He:[["🎈","Balloons"],["🧲","MRI scanners"],["🚀","Space rockets"]],
    Li:[["🔋","Batteries"],["📱","Phones"],["🛴","Scooters"]], Be:[["🛰️","Satellites"],["✈️","Airplanes"],["🔬","X-ray windows"]],
    B:[["🧪","Slime helper"],["🥘","Strong glass"],["🎾","Sports gear"]], C:[["✏️","Pencils"],["💎","Diamonds"],["🌱","Living things"]],
    N:[["🌬️","The air"],["🌿","Plant food"],["🍨","Super-cold mist"]], O:[["💧","Water"],["🌿","Plants"],["🫁","Your body"]],
    F:[["🪥","Toothpaste"],["🍳","Nonstick pans"],["👕","Rain jackets"]], Ne:[["🪧","Bright signs"],["💡","Glow lamps"],["⚡","Light tubes"]],
    Na:[["🧂","Table salt"],["🧼","Soap"],["💡","Streetlights"]], Mg:[["🎆","Fireworks"],["🚲","Bikes"],["🍃","Green leaves"]],
    Al:[["🥫","Food cans"],["🛩️","Airplanes"],["🧻","Kitchen foil"]], Si:[["🏖️","Sand"],["💻","Computer chips"],["🪟","Glass"]],
    P:[["🦴","Bones"],["🌾","Plant food"],["🔥","Matches"]], S:[["🥚","Egg smell"],["🛞","Rubber tires"],["💊","Medicine"]],
    Cl:[["🏊","Pool water"],["🧂","Table salt"],["🧽","Cleaners"]], Ar:[["💡","Light bulbs"],["🪟","Cozy windows"],["🔬","Science lasers"]],
    K:[["🍌","Bananas"],["🥔","Potatoes"],["💪","Your muscles"]], Ca:[["🥛","Milk"],["🦴","Bones"],["🖍️","Chalk"]],
    Sc:[["🚲","Bike frames"],["🏟️","Big bright lights"],["⚾","Sports gear"]], Ti:[["🚲","Bikes"],["🧴","Sunscreen"],["🚀","Spacecraft"]],
    V:[["🔧","Strong tools"],["🚗","Car parts"],["🌀","Springs"]], Cr:[["🚰","Shiny taps"],["🚲","Bikes"],["🎨","Bright colors"]],
    Mn:[["🔋","Batteries"],["🥫","Strong cans"],["🚆","Train tracks"]], Fe:[["🔨","Nails"],["🍳","Pans"],["🛝","Playgrounds"]],
    Co:[["🔵","Blue glass"],["🔋","Batteries"],["🧲","Magnets"]], Ni:[["🪙","Coins"],["🍞","Toasters"],["🔋","Batteries"]],
    Cu:[["🔌","Wires"],["🪙","Coins"],["🚰","Pipes"]], Zn:[["🧴","Sunscreen"],["🔋","Batteries"],["🏠","Metal roofs"]],
    Ga:[["💡","LED lights"],["🌡️","Thermometers"],["📱","Phones"]], Ge:[["🌐","Internet cables"],["📷","Cameras"],["💻","Chips"]],
    As:[["💻","Computer chips"],["💡","LED lights"],["🔬","Science tools"]], Se:[["🧴","Shampoo"],["☀️","Solar panels"],["📷","Copy machines"]],
    Br:[["🏊","Pool cleaner"],["📸","Photo film"],["🧯","Safer plastics"]], Kr:[["📸","Camera flashes"],["🚗","Headlights"],["🪟","Warm windows"]],
    Rb:[["⏰","Atomic clocks"],["🎆","Purple fireworks"],["🔬","Science labs"]], Sr:[["🎆","Red fireworks"],["🪥","Toothpaste"],["🎨","Glow paint"]],
    Y:[["📺","Bright screens"],["📷","Camera lenses"],["🔦","Lasers"]], Zr:[["💎","Sparkly gems"],["🧱","Tiles"],["🚀","Spacecraft"]],
    Nb:[["🧲","Strong magnets"],["🚀","Rockets"],["🏥","MRI scanners"]], Mo:[["🚲","Bike parts"],["🔩","Drill bits"],["🌱","Plant helper"]],
    Tc:[["🏥","Body scans"],["🩺","Medical tools"],["🔬","Research"]], Ru:[["💻","Computer chips"],["☀️","Solar cells"],["🖊️","Pen tips"]],
    Rh:[["🚗","Cleaner car air"],["💍","Jewelry"],["🪞","Mirrors"]], Pd:[["🚗","Cleaner car air"],["💍","Jewelry"],["📱","Electronics"]],
    Ag:[["💍","Jewelry"],["🪞","Mirrors"],["📱","Electronics"]], Cd:[["🔋","Batteries"],["🎨","Color pigments"],["☀️","Solar panels"]],
    In:[["📱","Touch screens"],["☀️","Solar panels"],["💡","LED lights"]], Sn:[["🥫","Food cans"],["🔌","Solder"],["🧸","Metal toys"]],
    Sb:[["🧯","Safer fabrics"],["🔋","Batteries"],["📱","Electronics"]], Te:[["☀️","Solar panels"],["💿","Special discs"],["🛞","Rubber"]],
    I:[["🧂","Iodized salt"],["🩹","First aid"],["🌊","Seaweed"]], Xe:[["📸","Camera flashes"],["🚗","Headlights"],["🚀","Space engines"]],
    Cs:[["⏰","Atomic clocks"],["🛢️","Drilling tools"],["🔬","Research"]], Ba:[["🩻","X-ray pictures"],["🎆","Green fireworks"],["🛢️","Drilling"]],
    La:[["📷","Camera lenses"],["🔋","Batteries"],["💡","Studio lights"]], Ce:[["🔥","Lighter sparks"],["🪟","Glass polish"],["🚗","Cleaner car air"]],
    Pr:[["🧲","Magnets"],["✈️","Airplane metal"],["🟡","Yellow glass"]], Nd:[["🎧","Headphones"],["💾","Hard drives"],["🚗","Toy motors"]],
    Pm:[["✨","Glow paint"],["🔋","Tiny batteries"],["🔬","Research"]], Sm:[["🎸","Guitar pickups"],["🎧","Headphones"],["🏥","Medicine"]],
    Eu:[["📺","Color screens"],["💶","Money marks"],["🔴","Red lights"]], Gd:[["🏥","MRI scanners"],["💾","Computer storage"],["🧲","Magnets"]],
    Tb:[["🟢","Green screens"],["💡","Bright lights"],["🔊","Speakers"]], Dy:[["💾","Hard drives"],["🌬️","Wind turbines"],["🔦","Lasers"]],
    Ho:[["🔦","Lasers"],["🧲","Magnets"],["🔬","Research"]], Er:[["🌐","Internet cables"],["🌸","Pink glass"],["🔦","Lasers"]],
    Tm:[["🩻","Small X-rays"],["🔦","Lasers"],["🔬","Research"]], Yb:[["🔦","Lasers"],["🔧","Strong steel"],["⏰","Atomic clocks"]],
    Lu:[["🏥","Body scans"],["🛢️","Oil making"],["💡","LED lights"]], Hf:[["💻","Computer chips"],["🔥","Plasma cutters"],["⚓","Submarine tools"]],
    Ta:[["📱","Phones"],["🎮","Game consoles"],["🦴","Medical parts"]], W:[["💡","Bulb wires"],["🔩","Drill bits"],["🎯","Darts"]],
    Re:[["✈️","Jet engines"],["🌡️","Heat sensors"],["🏥","Body scans"]], Os:[["🖊️","Pen tips"],["🧭","Compass needles"],["🔌","Electric contacts"]],
    Ir:[["🚗","Spark plugs"],["📱","Screen glass"],["🚀","Spacecraft"]], Pt:[["💍","Jewelry"],["🚗","Cleaner car air"],["💊","Medicine"]],
    Au:[["💍","Jewelry"],["📱","Phones"],["👩‍🚀","Space visors"]], Hg:[["🌡️","Old thermometers"],["💡","Fluorescent lamps"],["🔬","Science tools"]],
    Tl:[["🔭","Special glass"],["📱","Electronics"],["🏥","Body scans"]], Pb:[["🔋","Car batteries"],["🩻","X-ray shields"],["⚓","Heavy weights"]],
    Bi:[["💊","Tummy medicine"],["🚿","Fire sprinklers"],["🎨","Makeup colors"]], Po:[["🧹","Static brushes"],["🚀","Space power"],["🔬","Research"]],
    At:[["🧫","Tiny lab samples"],["🏥","Cancer research"],["🔬","Atom labs"]], Rn:[["🏠","Radon detectors"],["🪨","Some rocks"],["🔬","Research"]],
    Fr:[["🧫","Tiny lab samples"],["⚛️","Atom smashers"],["🔬","Research"]], Ra:[["⌚","Old glow paint"],["🏥","Medical history"],["🔬","Research"]],
    Ac:[["🏥","Cancer treatment"],["🔋","Tiny power"],["🔬","Research"]], Th:[["🏕️","Old lanterns"],["📷","Camera lenses"],["⚡","Future power"]],
    Pa:[["🧫","Tiny lab samples"],["⚛️","Atom science"],["🔬","Research"]], U:[["⚡","Power plants"],["🟢","Colored glass"],["⚓","Heavy weights"]],
    Np:[["🛰️","Space tools"],["🔎","Atom detectors"],["🔬","Research"]], Pu:[["🛰️","Space probes"],["🔋","Spacecraft power"],["🔬","Research"]],
    Am:[["🚨","Smoke alarms"],["🔎","Measuring tools"],["🔬","Research"]], Cm:[["🚙","Mars rover tools"],["🔋","Space power"],["🔬","Research"]],
    Bk:[["🧫","Tiny lab samples"],["⚛️","Atom smashers"],["🔬","Research"]], Cf:[["🔎","Metal detectors"],["🏥","Cancer care"],["🔬","Research"]],
    Es:[["🧫","Tiny lab samples"],["⚛️","Atom science"],["🔬","Research"]], Fm:[["🧫","Tiny lab samples"],["⚛️","Atom science"],["🔬","Research"]],
    Md:[["🧫","Tiny lab samples"],["⚛️","Atom science"],["🔬","Research"]], No:[["🧫","Tiny lab samples"],["⚛️","Atom science"],["🔬","Research"]],
    Lr:[["🧫","Tiny lab samples"],["⚛️","Atom science"],["🔬","Research"]], Rf:[["🧫","Tiny lab samples"],["⚛️","Atom smashers"],["🔬","Research"]],
    Db:[["🧫","Tiny lab samples"],["⚛️","Atom smashers"],["🔬","Research"]], Sg:[["🧫","Tiny lab samples"],["⚛️","Atom smashers"],["🔬","Research"]],
    Bh:[["🧫","Tiny lab samples"],["⚛️","Atom smashers"],["🔬","Research"]], Hs:[["🧫","Tiny lab samples"],["⚛️","Atom smashers"],["🔬","Research"]],
    Mt:[["🧫","Tiny lab samples"],["⚛️","Atom smashers"],["🔬","Research"]], Ds:[["🧫","Tiny lab samples"],["⚛️","Atom smashers"],["🔬","Research"]],
    Rg:[["🧫","Tiny lab samples"],["⚛️","Atom smashers"],["🔬","Research"]], Cn:[["🧫","Tiny lab samples"],["⚛️","Atom smashers"],["🔬","Research"]],
    Nh:[["🧫","Tiny lab samples"],["⚛️","Atom smashers"],["🔬","Research"]], Fl:[["🧫","Tiny lab samples"],["⚛️","Atom smashers"],["🔬","Research"]],
    Mc:[["🧫","Tiny lab samples"],["⚛️","Atom smashers"],["🔬","Research"]], Lv:[["🧫","Tiny lab samples"],["⚛️","Atom smashers"],["🔬","Research"]],
    Ts:[["🧫","Tiny lab samples"],["⚛️","Atom smashers"],["🔬","Research"]], Og:[["🧫","Tiny lab samples"],["⚛️","Atom smashers"],["🔬","Research"]]
  };

  const SPECIAL_FACTS = {
    H:"The lightest element! It is part of water and fills most stars.", He:"A super-light gas that can make balloons float.", Li:"A soft metal that helps rechargeable batteries save energy.",
    B:"It can help make strong glass—and even stretchy slime.", C:"Pencils, diamonds, plants, animals, and you all contain carbon.", N:"Most of the air around you is nitrogen.",
    O:"Living things use oxygen. It is also part of every drop of water.", F:"It joins other atoms to help protect your teeth.", Ne:"Electricity makes neon glow bright red-orange.",
    Na:"Sodium joins chlorine to make the salt on your food.", Mg:"Magnesium can shine with a dazzling white light.", Al:"A light metal that can be rolled into super-thin foil.",
    Si:"It is in sand, glass, and the tiny chips inside computers.", P:"Your bones and every living cell need phosphorus.", S:"Sulfur helps make rubber strong and can smell like rotten eggs.",
    Cl:"Chlorine joins sodium to make salt and helps keep pools clean.", Ar:"A calm gas that protects the tiny wire inside some light bulbs.", K:"Your muscles need potassium. Bananas have some inside.",
    Ca:"Calcium helps make bones and teeth hard.", Fe:"Iron makes strong tools and helps your blood carry oxygen.", Co:"Cobalt can make glass blue and magnets strong.",
    Ni:"Nickel helps metal fight rust. Some coins contain it.", Cu:"Copper carries electricity through wires very well.", Zn:"Zinc can help protect skin from sunlight and metal from rust.",
    Ag:"Silver is shiny, carries electricity, and makes great mirrors.", I:"Your body needs a tiny bit of iodine. It is added to some salt.", Xe:"A rare gas that makes brilliant flashes of light.",
    W:"Tungsten stays strong when it gets very, very hot.", Pt:"Platinum is rare, shiny, and helps clean car exhaust.", Au:"Gold is soft, shiny, and useful inside phones because it does not rust.",
    Hg:"Mercury is a liquid metal. It can be harmful, so never touch a spill.", Pb:"Lead is very heavy and can be harmful. It is not for touching or playing.",
    U:"Uranium stores lots of energy. Special power plants can use it.", Am:"A teeny amount of americium helps some smoke alarms notice smoke.",
    Og:"Scientists have made only a few oganesson atoms. They vanished almost at once!"
  };

  const PANTRY_SYMBOLS = ["H","C","N","O","Na","Mg","Al","Si","P","S","Cl","Fe"];
  const RECIPE_SPECS = [
    { id:"water", name:"Water", formula:"H₂O", atoms:{H:2,O:1}, icon:"💧", fact:"Water molecules fill oceans, rain, and every sip you take." },
    { id:"oxygen-pair", name:"Oxygen Pair", formula:"O₂", atoms:{O:2}, icon:"🫁", fact:"Oxygen atoms usually travel in pairs in the air we breathe." },
    { id:"hydrogen-pair", name:"Hydrogen Pair", formula:"H₂", atoms:{H:2}, icon:"🎈", fact:"Hydrogen atoms pair up to make a very light gas." },
    { id:"nitrogen-pair", name:"Nitrogen Pair", formula:"N₂", atoms:{N:2}, icon:"🌬️", fact:"Most of the air around you is made of nitrogen pairs." },
    { id:"carbon-dioxide", name:"Carbon Dioxide", formula:"CO₂", atoms:{C:1,O:2}, icon:"🫧", fact:"You breathe this atom team out. Plants use it to grow." },
    { id:"methane", name:"Methane", formula:"CH₄", atoms:{C:1,H:4}, icon:"🔥", fact:"Methane is a gas. It can be burned to make heat." },
    { id:"ammonia", name:"Ammonia", formula:"NH₃", atoms:{N:1,H:3}, icon:"🌱", fact:"Ammonia helps make plant food and many cleaners." },
    { id:"table-salt", name:"Table Salt", formula:"NaCl", atoms:{Na:1,Cl:1}, icon:"🧂", fact:"Sodium and chlorine can form a crystal team: table salt!" },
    { id:"silica", name:"Silica", formula:"SiO₂", atoms:{Si:1,O:2}, icon:"🏖️", fact:"This atom recipe helps make sand, rocks, and glass." },
    { id:"rust", name:"Rust", formula:"Fe₂O₃", atoms:{Fe:2,O:3}, icon:"🔩", fact:"When iron meets oxygen and water, reddish rust can form." }
  ];

  const RECIPE_CLUES = {
    "water":"Fill the table with two H atoms and one O atom.",
    "oxygen-pair":"Oxygen likes a buddy. Put two O atoms together.",
    "hydrogen-pair":"The lightest gas travels as a pair of H atoms.",
    "nitrogen-pair":"Most air is made from two N atoms holding together.",
    "carbon-dioxide":"One C atom needs two O partners.",
    "methane":"Put one C atom in the middle of four H atoms.",
    "ammonia":"One N atom teams up with three H atoms.",
    "table-salt":"Match one Na atom with one Cl atom.",
    "silica":"One Si atom needs two O atoms to help make sand.",
    "rust":"Use two Fe atoms and three O atoms for a rusty team."
  };

  const AWARDS = [
    {id:"first-element", icon:"🫧", name:"First Bubble", help:"Find 1 element", test:p=>p.elements.length>=1},
    {id:"ten-elements", icon:"🔟", name:"Element Scout", help:"Find 10 elements", test:p=>p.elements.length>=10},
    {id:"fifty-elements", icon:"🔭", name:"Super Explorer", help:"Find 50 elements", test:p=>p.elements.length>=50},
    {id:"first-recipe", icon:"🧪", name:"Atom Teamer", help:"Find 1 recipe", test:p=>p.recipes.length>=1},
    {id:"five-recipes", icon:"🏆", name:"Master Mixer", help:"Find 5 recipes", test:p=>p.recipes.length>=5}
  ];

  const state = {
    view:"table",
    selectedElement: ELEMENTS.find(element => element.symbol === "O"),
    activeCategory:null,
    activeRecipeId:"water",
    mix:[],
    sound:true,
    progress:loadProgress()
  };

  let atom3DController = null;
  let preferredVoice = null;

  function loadProgress() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      return { elements:Array.isArray(saved?.elements)?saved.elements:[], recipes:Array.isArray(saved?.recipes)?saved.recipes:[] };
    } catch (_) {
      return { elements:[], recipes:[] };
    }
  }

  function saveProgress() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state.progress)); } catch (_) { /* Progress still works for this visit. */ }
  }

  function categoryKey(element) {
    const value = element.category.toLowerCase();
    if (value.includes("lanthanide")) return "lanthanide";
    if (value.includes("actinide")) return "actinide";
    if (value.includes("alkaline")) return "alkaline";
    if (value.includes("alkali metal")) return "alkali";
    if (value.includes("transition metal")) return "transition";
    if (value.includes("post-transition")) return "post";
    if (value.includes("metalloid")) return "metalloid";
    if (value.includes("noble gas")) return "noble";
    if (value.includes("nonmetal") || value.includes("halogen")) return "reactive";
    return "unknown";
  }

  function elementColor(element) { return CATEGORY_INFO[categoryKey(element)].color; }
  function elementBySymbol(symbol) { return ELEMENTS.find(element => element.symbol === symbol); }
  function makeRecipeKey(atoms) {
    return Object.entries(atoms).filter(([,count])=>count>0).sort((a,b)=>elementBySymbol(a[0]).number-elementBySymbol(b[0]).number).map(([symbol,count])=>`${symbol}${count}`).join("-");
  }
  RECIPE_SPECS.forEach(recipe => { recipe.key = makeRecipeKey(recipe.atoms); });

  function activeRecipe() { return RECIPE_SPECS.find(recipe => recipe.id === state.activeRecipeId) || RECIPE_SPECS[0]; }
  function recipesForElement(symbol) { return RECIPE_SPECS.filter(recipe => Object.hasOwn(recipe.atoms, symbol)); }
  function partnerSymbolsFor(symbol) {
    return [...new Set(recipesForElement(symbol).flatMap(recipe => Object.keys(recipe.atoms)).filter(partner => partner !== symbol))];
  }

  function friendlyFact(element) {
    if (SPECIAL_FACTS[element.symbol]) return SPECIAL_FACTS[element.symbol];
    if (element.number >= 104) return "Scientists made this element in a lab. Only a few atoms have ever existed.";
    const facts = {
      alkali:"A soft, lively metal that quickly joins up with other elements.",
      alkaline:"A light-colored metal that is often found joined to other elements in rocks.",
      transition:"A useful metal. Many elements in this color group are strong and shiny.",
      post:"A metal that is usually softer than the strong metals in the middle of the table.",
      metalloid:"It acts a little like a metal and a little like a nonmetal.",
      reactive:"A busy element that likes to join other atoms in teams.",
      noble:"A calm gas that usually floats around without joining other atoms.",
      lanthanide:"A shiny metal that helps make bright lights, screens, or strong magnets.",
      actinide:"A very heavy element. Scientists handle it with special care.",
      unknown:"This is a super-rare element. Scientists are still learning what it can do."
    };
    return facts[categoryKey(element)];
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>'"]/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[char]));
  }

  function renderLegend() {
    const legend = document.querySelector("#legend");
    legend.innerHTML = `<button class="legend-item legend-clear" type="button" data-category="all" data-tip="Show every color cousin together." aria-pressed="${state.activeCategory === null}"><i style="background:linear-gradient(135deg,var(--alkali),var(--reactive),var(--noble))"></i>All colors</button>${Object.entries(CATEGORY_INFO).map(([key,info]) => `<button class="legend-item" type="button" data-category="${key}" data-tip="${escapeHtml(info.description)}" aria-label="${escapeHtml(info.label)}. ${escapeHtml(info.description)}" aria-pressed="${state.activeCategory === key}" style="--legend-color:${info.color}"><i style="background:${info.color}"></i>${info.label}</button>`).join("")}`;
    legend.querySelectorAll("button").forEach(button => button.addEventListener("click", () => {
      const category = button.dataset.category;
      state.activeCategory = category === "all" || state.activeCategory === category ? null : category;
      renderLegend();
      renderPeriodicTable();
      playTone(state.activeCategory ? 460 : 340, .06);
      showToast(state.activeCategory ? `Showing ${CATEGORY_INFO[state.activeCategory].label}` : "Showing every color cousin");
    }));
  }

  function renderPeriodicTable() {
    const table = document.querySelector("#periodicTable");
    table.innerHTML = "";
    const bridgeOne = document.createElement("div");
    bridgeOne.className = "series-label";
    bridgeOne.style.gridColumn = "3";
    bridgeOne.style.gridRow = "6";
    bridgeOne.textContent = "57–71 ↓";
    const bridgeTwo = bridgeOne.cloneNode(true);
    bridgeTwo.style.gridRow = "7";
    bridgeTwo.textContent = "89–103 ↓";
    table.append(bridgeOne, bridgeTwo);

    const partnerSymbols = partnerSymbolsFor(state.selectedElement.symbol);
    ELEMENTS.forEach(element => {
      const button = document.createElement("button");
      const found = state.progress.elements.includes(element.number);
      const selected = state.selectedElement.number === element.number;
      button.type = "button";
      const filteredOut = state.activeCategory && categoryKey(element) !== state.activeCategory;
      const recipePartner = partnerSymbols.includes(element.symbol);
      button.className = `element-tile${element.ypos > 7 ? " series-tile" : ""}${found ? " is-found" : ""}${selected ? " is-selected" : ""}${filteredOut ? " is-filtered-out" : ""}${recipePartner ? " is-recipe-partner" : ""}`;
      button.style.gridColumn = element.xpos;
      button.style.gridRow = element.ypos;
      button.style.setProperty("--tile-color", elementColor(element));
      button.dataset.number = element.number;
      button.setAttribute("aria-label", `${element.name}, element ${element.number}${recipePartner ? `, can craft with ${state.selectedElement.name}` : ""}${found ? ", sticker found" : ""}`);
      if (selected) button.setAttribute("aria-pressed", "true");
      button.innerHTML = `<span class="number">${element.number}</span><span class="symbol">${escapeHtml(element.symbol)}</span><span class="name">${escapeHtml(element.name)}</span>`;
      button.addEventListener("click", () => selectElement(element, true));
      table.append(button);
    });
    const partnerNames = partnerSymbols.map(symbol => elementBySymbol(symbol).name);
    document.querySelector("#tableRecipeHint").innerHTML = partnerNames.length
      ? `<span aria-hidden="true">🧩</span><span><strong>${escapeHtml(state.selectedElement.name)} crafting clue:</strong> puzzle-marked tiles ${partnerNames.length === 1 ? "are" : "include"} ${partnerNames.map(escapeHtml).join(", ")}.</span>`
      : `<span aria-hidden="true">🔬</span><span><strong>${escapeHtml(state.selectedElement.name)}</strong> has no crafting recipes in this first clue set yet.</span>`;
  }

  class Atom3D {
    constructor(canvas, element) {
      this.canvas = canvas;
      this.element = element;
      this.yaw = -.35;
      this.pitch = -.28;
      this.panX = 0;
      this.panY = 0;
      this.zoom = 1;
      this.tool = "spin";
      this.pointer = null;
      this.startTime = performance.now();
      this.reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      try { this.context = canvas.getContext("2d"); } catch (_) { this.context = null; }
      if (!this.context) return;
      this.bind();
      this.resize();
      if (typeof ResizeObserver === "function") {
        this.observer = new ResizeObserver(() => this.resize());
        this.observer.observe(canvas);
      }
      if (this.reducedMotion) this.draw(performance.now()); else this.frame = requestAnimationFrame(time => this.animate(time));
    }

    bind() {
      this.onPointerDown = event => {
        this.pointer = { id:event.pointerId, x:event.clientX, y:event.clientY };
        this.canvas.setPointerCapture?.(event.pointerId);
      };
      this.onPointerMove = event => {
        if (!this.pointer || this.pointer.id !== event.pointerId) return;
        const dx = event.clientX - this.pointer.x;
        const dy = event.clientY - this.pointer.y;
        this.pointer.x = event.clientX;
        this.pointer.y = event.clientY;
        if (this.tool === "move") {
          this.panX = Math.max(-90, Math.min(90, this.panX + dx));
          this.panY = Math.max(-70, Math.min(70, this.panY + dy));
        } else {
          this.yaw += dx * .012;
          this.pitch = Math.max(-1.35, Math.min(1.35, this.pitch + dy * .012));
        }
        if (this.reducedMotion) this.draw(performance.now());
      };
      this.onPointerUp = event => {
        if (this.pointer?.id === event.pointerId) this.pointer = null;
      };
      this.onWheel = event => {
        event.preventDefault();
        this.setZoom(this.zoom + (event.deltaY < 0 ? .1 : -.1));
      };
      this.canvas.addEventListener("pointerdown", this.onPointerDown);
      this.canvas.addEventListener("pointermove", this.onPointerMove);
      this.canvas.addEventListener("pointerup", this.onPointerUp);
      this.canvas.addEventListener("pointercancel", this.onPointerUp);
      this.canvas.addEventListener("wheel", this.onWheel, {passive:false});
    }

    resize() {
      if (!this.context) return;
      const bounds = this.canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      this.width = Math.max(260, bounds.width || 320);
      this.height = Math.max(250, bounds.height || 300);
      this.canvas.width = Math.round(this.width * ratio);
      this.canvas.height = Math.round(this.height * ratio);
      this.context.setTransform(ratio,0,0,ratio,0,0);
      this.draw(performance.now());
    }

    setTool(tool) { this.tool = tool; }
    setZoom(value) {
      this.zoom = Math.max(.62, Math.min(1.65, value));
      if (this.reducedMotion) this.draw(performance.now());
    }
    reset() {
      this.yaw = -.35; this.pitch = -.28; this.panX = 0; this.panY = 0; this.zoom = 1;
      if (this.reducedMotion) this.draw(performance.now());
    }

    rotate(point) {
      const cy = Math.cos(this.yaw), sy = Math.sin(this.yaw);
      const cp = Math.cos(this.pitch), sp = Math.sin(this.pitch);
      const x1 = point.x * cy + point.z * sy;
      const z1 = -point.x * sy + point.z * cy;
      return { x:x1, y:point.y * cp - z1 * sp, z:point.y * sp + z1 * cp };
    }

    orbitPoint(radius, angle, shellIndex) {
      const tiltX = .44 + (shellIndex % 3) * .34;
      const tiltZ = -.62 + (shellIndex % 4) * .38;
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);
      const y1 = y * Math.cos(tiltX);
      const z1 = y * Math.sin(tiltX);
      return this.rotate({x:x*Math.cos(tiltZ)-y1*Math.sin(tiltZ), y:x*Math.sin(tiltZ)+y1*Math.cos(tiltZ), z:z1});
    }

    project(point) {
      const scale = Math.min(this.width, this.height) * .42 * this.zoom;
      const perspective = 1 / (1.45 - point.z * .28);
      return { x:this.width/2 + this.panX + point.x*scale*perspective, y:this.height/2 + this.panY + point.y*scale*perspective, z:point.z, perspective };
    }

    drawSphere(x,y,radius,inner,outer,label="") {
      const ctx = this.context;
      const gradient = ctx.createRadialGradient(x-radius*.35,y-radius*.4,radius*.1,x,y,radius);
      gradient.addColorStop(0,"#ffffff"); gradient.addColorStop(.2,inner); gradient.addColorStop(1,outer);
      ctx.beginPath(); ctx.arc(x,y,radius,0,Math.PI*2); ctx.fillStyle=gradient; ctx.fill();
      ctx.strokeStyle="rgba(255,255,255,.86)"; ctx.lineWidth=Math.max(1.5,radius*.12); ctx.stroke();
      if (label) { ctx.fillStyle="#402343"; ctx.font=`900 ${Math.max(9,radius*.34)}px Nunito, Arial`; ctx.textAlign="center"; ctx.textBaseline="middle"; ctx.fillText(label,x,y+1); }
    }

    draw(time) {
      if (!this.context) return;
      const ctx = this.context;
      ctx.clearRect(0,0,this.width,this.height);
      const seconds = this.reducedMotion ? 0 : (time-this.startTime)/1000;
      const shellTotal = this.element.shells.length;
      const particles = [];

      this.element.shells.forEach((count,shellIndex) => {
        const radius = .26 + shellIndex * (.68/Math.max(1,shellTotal-1));
        ctx.beginPath();
        for (let step=0; step<=72; step+=1) {
          const point = this.project(this.orbitPoint(radius,step/72*Math.PI*2,shellIndex));
          if (step===0) ctx.moveTo(point.x,point.y); else ctx.lineTo(point.x,point.y);
        }
        ctx.strokeStyle=`rgba(226,241,255,${Math.max(.13,.34-shellIndex*.025)})`;
        ctx.lineWidth=1.7; ctx.stroke();

        for (let electronIndex=0; electronIndex<count; electronIndex+=1) {
          const direction = shellIndex%2 ? -1 : 1;
          const angle = electronIndex/count*Math.PI*2 + seconds*(.48+shellIndex*.07)*direction;
          const point = this.project(this.orbitPoint(radius,angle,shellIndex));
          particles.push({...point,type:"electron",size:Math.max(3.5,7.4-shellIndex*.48),label:count<=8 ? "−" : ""});
        }
      });

      const nucleus = this.project(this.rotate({x:0,y:0,z:0}));
      particles.push({...nucleus,type:"nucleus",size:Math.max(28,48-shellTotal*2.4),label:this.element.symbol});
      particles.sort((a,b)=>a.z-b.z).forEach(particle => {
        const size = particle.size * Math.max(.72,particle.perspective);
        if (particle.type === "nucleus") this.drawSphere(particle.x,particle.y,size,"#ffe983","#f25f91",particle.label);
        else this.drawSphere(particle.x,particle.y,size,"#bdf8ff","#32c7ee",particle.label);
      });
    }

    animate(time) { this.draw(time); this.frame = requestAnimationFrame(next => this.animate(next)); }
    destroy() {
      if (!this.context) return;
      cancelAnimationFrame(this.frame);
      this.observer?.disconnect();
      this.canvas.removeEventListener("pointerdown",this.onPointerDown);
      this.canvas.removeEventListener("pointermove",this.onPointerMove);
      this.canvas.removeEventListener("pointerup",this.onPointerUp);
      this.canvas.removeEventListener("pointercancel",this.onPointerUp);
      this.canvas.removeEventListener("wheel",this.onWheel);
    }
  }

  function renderElementDetail() {
    atom3DController?.destroy();
    const element = state.selectedElement;
    const category = CATEGORY_INFO[categoryKey(element)];
    const items = ELEMENT_ITEMS[element.symbol] || [["🧫","Tiny samples"],["⚛️","Atom science"],["🔬","Research"]];
    const found = state.progress.elements.includes(element.number);
    const elementRecipes = recipesForElement(element.symbol);
    const partnerNames = partnerSymbolsFor(element.symbol).map(symbol => elementBySymbol(symbol).name);
    const detail = document.querySelector("#elementDetail");
    detail.innerHTML = `
      <div class="detail-header">
        <div class="detail-symbol" style="--tile-color:${elementColor(element)}">${escapeHtml(element.symbol)}</div>
        <div class="detail-title"><h2>${escapeHtml(element.name)}</h2><p>Element ${element.number} · ${category.label}</p></div>
        <button class="speak-element" type="button" aria-label="Hear about ${escapeHtml(element.name)}">🔊</button>
      </div>
      <p class="detail-intro">${escapeHtml(friendlyFact(element))}</p>
      <div class="atom-heading"><strong>Explore the atom in 3D!</strong><span>Spin, move, and zoom</span></div>
      <div class="atom-stage">
        <canvas class="atom-canvas" role="img" aria-label="Rotatable 3D model of ${escapeHtml(element.name)} with ${element.number} moving electrons"></canvas>
        <span class="atom-drag-hint">☝️ Drag the model</span>
        <div class="atom-tools" aria-label="3D atom controls">
          <button class="atom-tool" type="button" data-atom-tool="spin" aria-pressed="true">↻ Spin</button>
          <button class="atom-tool" type="button" data-atom-tool="move" aria-pressed="false">✥ Move</button>
          <button class="atom-tool icon-only" type="button" data-atom-action="zoom-out" aria-label="Zoom out">−</button>
          <button class="atom-tool icon-only" type="button" data-atom-action="zoom-in" aria-label="Zoom in">+</button>
          <button class="atom-tool icon-only" type="button" data-atom-action="reset" aria-label="Reset atom view">⌂</button>
        </div>
      </div>
      <div class="electron-count"><b>${element.number}</b><span><strong>${element.number} electron${element.number === 1 ? "" : "s"}</strong><br>Tiny dots that zoom around the middle.</span></div>
      ${elementRecipes.length ? `<div class="recipe-partners"><strong>🧩 Crafting clue</strong><p>${escapeHtml(element.name)} can team with ${escapeHtml(partnerNames.join(", ") || "another atom of the same kind")} in ${elementRecipes.length} recipe${elementRecipes.length===1?"":"s"}.</p><button class="craft-from-element" type="button" data-recipe="${elementRecipes[0].id}">Craft ${escapeHtml(elementRecipes[0].name)} →</button></div>` : ""}
      <h3 class="uses-heading">You can find it in...</h3>
      <div class="item-cards">${items.map(([icon,label],index)=>`<div class="item-card"><span class="item-illustration" style="--item-bg:${["#dff5ff","#e3f8dd","#ffe1e9"][index%3]}">${icon}</span><b>${escapeHtml(label)}</b></div>`).join("")}</div>
      <div class="sticker-earned"><span aria-hidden="true">${found ? "⭐" : "👆"}</span>${found ? `${escapeHtml(element.name)} sticker found!` : "Tap this element in the table to earn its sticker."}</div>`;

    detail.querySelector(".speak-element").addEventListener("click", () => speakElement(element));
    atom3DController = new Atom3D(detail.querySelector(".atom-canvas"),element);
    detail.querySelectorAll("[data-atom-tool]").forEach(button => button.addEventListener("click", () => {
      detail.querySelectorAll("[data-atom-tool]").forEach(tool => tool.setAttribute("aria-pressed",String(tool===button)));
      atom3DController?.setTool(button.dataset.atomTool);
      playTone(button.dataset.atomTool === "spin" ? 480 : 390,.05);
    }));
    detail.querySelector('[data-atom-action="zoom-out"]').addEventListener("click",()=>atom3DController?.setZoom(atom3DController.zoom-.15));
    detail.querySelector('[data-atom-action="zoom-in"]').addEventListener("click",()=>atom3DController?.setZoom(atom3DController.zoom+.15));
    detail.querySelector('[data-atom-action="reset"]').addEventListener("click",()=>atom3DController?.reset());
    detail.querySelector(".craft-from-element")?.addEventListener("click", event => {
      selectRecipe(event.currentTarget.dataset.recipe);
      switchView("maker");
      window.setTimeout(()=>document.querySelector("#recipeGuide").scrollIntoView({behavior:"smooth",block:"center"}),100);
    });
  }

  function selectElement(element, fromTap = false) {
    state.selectedElement = element;
    const wasNew = !state.progress.elements.includes(element.number);
    if (fromTap && wasNew) {
      state.progress.elements.push(element.number);
      state.progress.elements.sort((a,b)=>a-b);
      saveProgress();
      burstConfetti(16);
      showToast(`⭐ New ${element.name} sticker!`);
    } else if (fromTap) {
      playTone(420, .06);
    }
    renderPeriodicTable();
    renderElementDetail();
    updateCounts();
    if (fromTap) speakElement(element);
    if (fromTap && window.innerWidth < 1100) document.querySelector("#elementDetail").scrollIntoView({behavior:"smooth", block:"start"});
  }

  function speakElement(element) {
    speak(`${element.name}. ${friendlyFact(element)} It has ${element.number} electron${element.number === 1 ? "" : "s"}.`);
  }

  function renderRecipeGuide() {
    const guide = document.querySelector("#recipeGuide");
    guide.innerHTML = RECIPE_SPECS.map(recipe => {
      const selected = recipe.id === state.activeRecipeId;
      const found = state.progress.recipes.includes(recipe.id);
      return `<button class="recipe-card${found ? " is-found" : ""}" type="button" data-recipe="${recipe.id}" aria-pressed="${selected}" aria-label="Crafting clue for ${escapeHtml(recipe.name)}. ${escapeHtml(RECIPE_CLUES[recipe.id])}"><span class="recipe-card-icon" aria-hidden="true">${recipe.icon}</span><span><b>${escapeHtml(recipe.name)}</b><small>${recipe.formula}</small></span><span class="recipe-clue">${escapeHtml(RECIPE_CLUES[recipe.id])}</span></button>`;
    }).join("");
    guide.querySelectorAll("button").forEach(button => button.addEventListener("click",()=>selectRecipe(button.dataset.recipe)));
  }

  function selectRecipe(recipeId) {
    state.activeRecipeId = recipeId;
    state.mix = [];
    document.querySelector("#discoveryResult").hidden = true;
    renderRecipeGuide();
    renderPantry();
    renderMixer();
    const recipe = activeRecipe();
    showToast(`${recipe.icon} Crafting clue: ${recipe.name}`);
    speak(`Let us craft ${recipe.name}. ${RECIPE_CLUES[recipe.id]}`);
  }

  function renderPantry() {
    const pantry = document.querySelector("#atomPantry");
    const neededSymbols = Object.keys(activeRecipe().atoms);
    pantry.innerHTML = PANTRY_SYMBOLS.map(symbol => {
      const element = elementBySymbol(symbol);
      const needed = neededSymbols.includes(symbol);
      return `<button class="pantry-atom${needed ? " is-needed" : " is-not-needed"}" type="button" data-symbol="${symbol}" style="--tile-color:${elementColor(element)}" aria-label="${needed ? "Add" : "Not needed for this clue:"} ${element.name} atom"><b>${symbol}</b><span>${element.name}</span></button>`;
    }).join("");
    pantry.querySelectorAll("button").forEach(button => button.addEventListener("click", () => addAtom(button.dataset.symbol)));
  }

  function addAtom(symbol) {
    const recipe = activeRecipe();
    if (!Object.hasOwn(recipe.atoms,symbol)) {
      showToast(`${elementBySymbol(symbol).name} is not part of this clue.`);
      playTone(180, .1);
      return;
    }
    const currentCount = state.mix.filter(item=>item===symbol).length;
    if (currentCount >= recipe.atoms[symbol]) {
      showToast(`${elementBySymbol(symbol).name} meter is already full!`);
      playTone(250,.07);
      return;
    }
    state.mix.push(symbol);
    playTone(310 + elementBySymbol(symbol).number * 5, .06);
    renderMixer();
  }

  function renderMixer() {
    const bowl = document.querySelector("#mixingBowl");
    const recipe = activeRecipe();
    const slots = Array.from({length:9},(_,index) => {
      const symbol = state.mix[index];
      if (symbol) {
        const element = elementBySymbol(symbol);
        return `<div class="craft-slot is-filled"><span class="craft-slot-number">${index+1}</span><span class="mix-atom" style="--tile-color:${elementColor(element)};animation-delay:${index*.04}s" title="${element.name}">${symbol}</span></div>`;
      }
      return `<div class="craft-slot"><span class="craft-slot-number">${index+1}</span></div>`;
    }).join("");
    bowl.innerHTML = `${slots}${state.mix.length ? "" : `<div class="empty-mixer"><span aria-hidden="true">🧩</span><b>Fill the meters!</b></div>`}`;
    const ready = currentMixKey() === recipe.key;
    bowl.classList.toggle("is-ready",ready);
    document.querySelector("#mixerHelp").textContent = ready ? "Every meter is full—your atom team is ready!" : `${state.mix.length} of ${Object.values(recipe.atoms).reduce((sum,count)=>sum+count,0)} atoms placed.`;
    renderCraftProgress();
    const disabled = state.mix.length === 0;
    document.querySelector("#undoAtom").disabled = disabled;
    document.querySelector("#clearMixer").disabled = disabled;
    document.querySelector("#discoverMix").disabled = !ready;
  }

  function renderCraftProgress() {
    const recipe = activeRecipe();
    const counts = state.mix.reduce((all,symbol)=>{all[symbol]=(all[symbol]||0)+1;return all;},{});
    const ready = currentMixKey() === recipe.key;
    const progress = document.querySelector("#craftProgress");
    progress.innerHTML = `${Object.entries(recipe.atoms).map(([symbol,needed]) => {
      const have = counts[symbol] || 0;
      const element = elementBySymbol(symbol);
      return `<div class="ingredient-meter${have>=needed ? " is-complete" : ""}"><div class="ingredient-meter-top"><span>${symbol} · ${escapeHtml(element.name)}</span><span>${have} / ${needed}${have>=needed ? " · FULL!" : ""}</span></div><div class="ingredient-meter-track" role="progressbar" aria-label="${escapeHtml(element.name)} atoms" aria-valuemin="0" aria-valuemax="${needed}" aria-valuenow="${have}"><div class="ingredient-meter-fill" style="--progress:${Math.min(100,have/needed*100)}%;--meter-color:${elementColor(element)}"></div></div></div>`;
    }).join("")}<div class="craft-status${ready ? " is-ready" : ""}">${ready ? `✨ ${recipe.name} is ready to craft!` : `Fill every meter to unlock ${recipe.name}.`}</div>`;
  }

  function currentMixKey() {
    const counts = state.mix.reduce((all,symbol) => { all[symbol] = (all[symbol] || 0) + 1; return all; }, {});
    return makeRecipeKey(counts);
  }

  function discoverMix() {
    const result = document.querySelector("#discoveryResult");
    const recipe = activeRecipe();
    result.hidden = false;
    if (recipe.key !== currentMixKey()) {
      result.innerHTML = `<div class="result-no-match"><span aria-hidden="true">🧩</span><div><h2>Fill every meter first!</h2><p>The crafting clue shows the exact number of atoms this team needs.</p><button class="try-again" type="button">Keep crafting</button></div></div>`;
      result.querySelector("button").addEventListener("click", () => {
        result.hidden = true;
        document.querySelector("#atomPantry").scrollIntoView({behavior:"smooth",block:"center"});
      });
      speak("Fill every meter first. The clue shows exactly how many atoms you need.");
      playTone(175, .16);
    } else {
      const isNew = !state.progress.recipes.includes(recipe.id);
      if (isNew) {
        state.progress.recipes.push(recipe.id);
        saveProgress();
      }
      result.innerHTML = `<div class="result-inner"><div class="result-sticker" aria-hidden="true">${recipe.icon}</div><div class="result-copy"><span class="eyebrow">${isNew ? "New sticker discovered!" : "You found it again!"}</span><h2>${escapeHtml(recipe.name)}</h2><p>${escapeHtml(recipe.fact)}</p><button class="try-again" type="button">Make another team</button></div><div class="result-formula" aria-label="Formula ${recipe.formula}">${recipe.formula}</div></div>`;
      result.querySelector("button").addEventListener("click", resetMixer);
      if (isNew) {
        burstConfetti(42);
        showToast(`🏆 ${recipe.name} sticker unlocked!`);
      }
      playSuccessTune();
      speak(`${recipe.name}! ${recipe.fact} You earned a sticker.`);
      updateCounts();
    }
    result.scrollIntoView({behavior:"smooth", block:"center"});
  }

  function resetMixer() {
    state.mix = [];
    renderMixer();
    document.querySelector("#discoveryResult").hidden = true;
    document.querySelector("#recipeGuide").scrollIntoView({behavior:"smooth",block:"center"});
  }

  function renderCollection() {
    const elementGrid = document.querySelector("#elementStickers");
    elementGrid.innerHTML = ELEMENTS.map((element,index) => {
      const found = state.progress.elements.includes(element.number);
      return `<button class="sticker${found ? " is-found" : ""}" type="button" data-number="${element.number}" style="--sticker-color:${found ? elementColor(element) : "#f3f5fa"};--sticker-turn:${(index%5-2)*.45}deg" aria-label="${found ? `${element.name} sticker. Tap to explore.` : `Mystery sticker number ${element.number}`}"><span class="sticker-icon">${found ? element.symbol : "?"}</span><b>${found ? escapeHtml(element.name) : `Mystery ${element.number}`}</b><small>${found ? `ELEMENT ${element.number}` : "NOT FOUND YET"}</small></button>`;
    }).join("");
    elementGrid.querySelectorAll(".is-found").forEach(button => button.addEventListener("click", () => {
      state.selectedElement = ELEMENTS.find(element => element.number === Number(button.dataset.number));
      switchView("table");
      renderPeriodicTable(); renderElementDetail();
      window.setTimeout(()=>document.querySelector("#elementDetail").scrollIntoView({behavior:"smooth",block:"start"}),100);
    }));

    const moleculeGrid = document.querySelector("#moleculeStickers");
    moleculeGrid.innerHTML = RECIPE_SPECS.map((recipe,index) => {
      const found = state.progress.recipes.includes(recipe.id);
      return `<div class="sticker${found ? " is-found" : ""}" style="--sticker-color:${found ? ["#9edbff","#b7eddf","#ffd98a","#ffc0d1"][index%4] : "#f3f5fa"};--sticker-turn:${(index%4-1.5)*.55}deg"><span class="sticker-icon">${found ? recipe.icon : "?"}</span><b>${found ? escapeHtml(recipe.name) : "Mystery recipe"}</b><small>${found ? recipe.formula : "NOT FOUND YET"}</small></div>`;
    }).join("");

    const awardsGrid = document.querySelector("#awardsGrid");
    awardsGrid.innerHTML = AWARDS.map(award => {
      const earned = award.test(state.progress);
      return `<div class="award${earned ? " is-earned" : ""}"><span class="award-icon">${earned ? award.icon : "🔒"}</span><b>${escapeHtml(award.name)}</b><span>${earned ? "Badge earned!" : escapeHtml(award.help)}</span></div>`;
    }).join("");
    updateCounts();
  }

  function updateCounts() {
    const total = state.progress.elements.length + state.progress.recipes.length;
    document.querySelector("#navStickerCount").textContent = total;
    document.querySelector("#collectionTotal").textContent = total;
  }

  function switchView(viewName) {
    state.view = viewName;
    document.querySelectorAll(".app-view").forEach(view => {
      const active = view.dataset.view === viewName;
      view.hidden = !active;
      view.classList.toggle("is-active", active);
    });
    document.querySelectorAll(".nav-button").forEach(button => {
      const active = button.dataset.viewTarget === viewName;
      button.classList.toggle("is-active", active);
      if (active) button.setAttribute("aria-current","page"); else button.removeAttribute("aria-current");
    });
    if (viewName === "collection") renderCollection();
    window.scrollTo({top:0,behavior:"smooth"});
    playTone(360, .05);
  }

  function speak(text) {
    if (!state.sound || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const message = new SpeechSynthesisUtterance(text);
    message.rate = .92;
    message.pitch = 1.03;
    message.volume = 1;
    message.voice = preferredVoice;
    window.speechSynthesis.speak(message);
  }

  function refreshPreferredVoice() {
    if (!("speechSynthesis" in window)) return;
    const voices = window.speechSynthesis.getVoices().filter(voice => /^en[-_]/i.test(voice.lang));
    const qualityWords = /natural|neural|premium|enhanced|ava|aria|jenny|samantha|allison|susan|daniel|aaron|google us english|microsoft.*online/i;
    const robotWords = /compact|espeak|festival|robot/i;
    preferredVoice = voices
      .map(voice => ({voice,score:(voice.localService?3:0)+(qualityWords.test(voice.name)?12:0)-(robotWords.test(voice.name)?10:0)+(/en[-_]US/i.test(voice.lang)?2:0)}))
      .sort((a,b)=>b.score-a.score)[0]?.voice || voices[0] || null;
  }

  let audioContext;
  function playTone(frequency, seconds) {
    if (!state.sound) return;
    try {
      audioContext ||= new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      oscillator.type = "sine";
      oscillator.frequency.value = Math.min(frequency, 900);
      gain.gain.setValueAtTime(.055, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(.001, audioContext.currentTime + seconds);
      oscillator.connect(gain).connect(audioContext.destination);
      oscillator.start();
      oscillator.stop(audioContext.currentTime + seconds);
    } catch (_) { /* Some browsers may only allow narration. */ }
  }

  function playSuccessTune() {
    if (!state.sound) return;
    [440,554,659].forEach((tone,index)=>window.setTimeout(()=>playTone(tone,.18),index*120));
  }

  let toastTimer;
  function showToast(message) {
    const toast = document.querySelector("#toast");
    toast.textContent = message;
    toast.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(()=>toast.classList.remove("is-visible"),2400);
  }

  function burstConfetti(count) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const layer = document.querySelector("#confetti");
    const colors = ["#ffd65a","#65e0d1","#ff6e9e","#82c9ff","#b89cff"];
    for (let index=0; index<count; index+=1) {
      const piece = document.createElement("i");
      piece.className = "confetti-piece";
      piece.style.left = `${Math.random()*100}%`;
      piece.style.setProperty("--confetti",colors[index%colors.length]);
      piece.style.setProperty("--drift",`${(Math.random()-.5)*240}px`);
      piece.style.animationDelay = `${Math.random()*.35}s`;
      layer.append(piece);
      window.setTimeout(()=>piece.remove(),2300);
    }
  }

  function bindEvents() {
    document.querySelectorAll("[data-view-target]").forEach(button => button.addEventListener("click", () => switchView(button.dataset.viewTarget)));
    document.querySelector("#soundToggle").addEventListener("click", event => {
      state.sound = !state.sound;
      event.currentTarget.setAttribute("aria-pressed",String(state.sound));
      event.currentTarget.querySelector("span").textContent = state.sound ? "🔊" : "🔇";
      event.currentTarget.querySelector("b").textContent = state.sound ? "Sound on" : "Sound off";
      if (state.sound) { playTone(440,.08); speak("Sound on!"); }
      else if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    });
    document.querySelector("#legendToggle").addEventListener("click", event => {
      const legend = document.querySelector("#legend");
      legend.hidden = !legend.hidden;
      event.currentTarget.setAttribute("aria-expanded",String(!legend.hidden));
      event.currentTarget.textContent = legend.hidden ? "Show colors" : "Hide colors";
    });
    document.querySelector("#readLesson").addEventListener("click", () => speak("An atom is one tiny building block. When atoms link up, they can make a molecule, a tiny team! Pick atoms and discover their recipes."));
    document.querySelector("#undoAtom").addEventListener("click", () => { state.mix.pop(); playTone(250,.05); renderMixer(); });
    document.querySelector("#clearMixer").addEventListener("click", resetMixer);
    document.querySelector("#discoverMix").addEventListener("click", discoverMix);
  }

  function init() {
    document.documentElement.dataset.version = VERSION;
    renderLegend();
    renderPeriodicTable();
    renderElementDetail();
    renderRecipeGuide();
    renderPantry();
    renderMixer();
    renderCollection();
    bindEvents();
    updateCounts();
    refreshPreferredVoice();
    if ("speechSynthesis" in window) window.speechSynthesis.addEventListener?.("voiceschanged",refreshPreferredVoice);
  }

  init();
})();
