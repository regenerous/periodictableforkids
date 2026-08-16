(() => {
  "use strict";

  const VERSION = "0.1.0";
  const STORAGE_KEY = "bubble-lab-progress-v1";
  const ELEMENTS = window.ELEMENT_DATA;

  const CATEGORY_INFO = {
    alkali: { label: "Bouncy metals", color: "var(--alkali)" },
    alkaline: { label: "Earthy metals", color: "var(--alkaline)" },
    transition: { label: "Strong metals", color: "var(--transition)" },
    post: { label: "Soft metals", color: "var(--post)" },
    metalloid: { label: "In-between", color: "var(--metalloid)" },
    reactive: { label: "Busy nonmetals", color: "var(--reactive)" },
    noble: { label: "Calm gases", color: "var(--noble)" },
    lanthanide: { label: "Shiny rare metals", color: "var(--lanthanide)" },
    actinide: { label: "Heavy metals", color: "var(--actinide)" },
    unknown: { label: "Mystery elements", color: "var(--unknown)" }
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
    mix:[],
    sound:true,
    progress:loadProgress()
  };

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
    legend.innerHTML = Object.entries(CATEGORY_INFO).map(([key,info]) => `<span class="legend-item"><i style="background:${info.color}"></i>${info.label}</span>`).join("");
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

    ELEMENTS.forEach(element => {
      const button = document.createElement("button");
      const found = state.progress.elements.includes(element.number);
      const selected = state.selectedElement.number === element.number;
      button.type = "button";
      button.className = `element-tile${element.ypos > 7 ? " series-tile" : ""}${found ? " is-found" : ""}${selected ? " is-selected" : ""}`;
      button.style.gridColumn = element.xpos;
      button.style.gridRow = element.ypos;
      button.style.setProperty("--tile-color", elementColor(element));
      button.dataset.number = element.number;
      button.setAttribute("aria-label", `${element.name}, element ${element.number}${found ? ", sticker found" : ""}`);
      if (selected) button.setAttribute("aria-pressed", "true");
      button.innerHTML = `<span class="number">${element.number}</span><span class="symbol">${escapeHtml(element.symbol)}</span><span class="name">${escapeHtml(element.name)}</span>`;
      button.addEventListener("click", () => selectElement(element, true));
      table.append(button);
    });
  }

  function atomMarkup(element) {
    const shellCount = element.shells.length;
    return element.shells.map((electronCount, shellIndex) => {
      const size = 80 + shellIndex * (shellCount > 5 ? 31 : 38);
      const speed = Math.max(5.2, 14 - shellIndex * 1.15);
      const dots = Array.from({length:electronCount}, (_,electronIndex) => {
        const angle = (360 / electronCount) * electronIndex;
        const dotSize = electronCount > 18 ? 6 : electronCount > 8 ? 7 : 9;
        return `<i class="electron" style="--angle:${angle}deg;--negative-angle:${-angle}deg;--electron-size:${dotSize}px"></i>`;
      }).join("");
      return `<div class="electron-shell" style="--shell-size:${size}px;--speed:${speed}s;animation-direction:${shellIndex % 2 ? "reverse" : "normal"}">${dots}</div>`;
    }).join("");
  }

  function renderElementDetail() {
    const element = state.selectedElement;
    const category = CATEGORY_INFO[categoryKey(element)];
    const items = ELEMENT_ITEMS[element.symbol] || [["🧫","Tiny samples"],["⚛️","Atom science"],["🔬","Research"]];
    const found = state.progress.elements.includes(element.number);
    const detail = document.querySelector("#elementDetail");
    detail.innerHTML = `
      <div class="detail-header">
        <div class="detail-symbol" style="--tile-color:${elementColor(element)}">${escapeHtml(element.symbol)}</div>
        <div class="detail-title"><h2>${escapeHtml(element.name)}</h2><p>Element ${element.number} · ${category.label}</p></div>
        <button class="speak-element" type="button" aria-label="Hear about ${escapeHtml(element.name)}">🔊</button>
      </div>
      <p class="detail-intro">${escapeHtml(friendlyFact(element))}</p>
      <div class="atom-heading"><strong>Touch the atom!</strong><span>Tap the middle to make it zoom</span></div>
      <div class="atom-stage" aria-label="Playful model of ${escapeHtml(element.name)} with ${element.number} moving electrons">
        <div class="atom-glow"></div>${atomMarkup(element)}
        <button class="nucleus" type="button" aria-label="Make the electrons spin faster">tap me</button>
      </div>
      <div class="electron-count"><b>${element.number}</b><span><strong>${element.number} electron${element.number === 1 ? "" : "s"}</strong><br>Tiny dots that zoom around the middle.</span></div>
      <h3 class="uses-heading">You can find it in...</h3>
      <div class="item-cards">${items.map(([icon,label],index)=>`<div class="item-card"><span class="item-illustration" style="--item-bg:${["#dff5ff","#e3f8dd","#ffe1e9"][index%3]}">${icon}</span><b>${escapeHtml(label)}</b></div>`).join("")}</div>
      <div class="sticker-earned"><span aria-hidden="true">${found ? "⭐" : "👆"}</span>${found ? `${escapeHtml(element.name)} sticker found!` : "Tap this element in the table to earn its sticker."}</div>`;

    detail.querySelector(".speak-element").addEventListener("click", () => speakElement(element));
    const stage = detail.querySelector(".atom-stage");
    detail.querySelector(".nucleus").addEventListener("click", () => {
      stage.classList.add("is-zooming");
      playTone(520, .08);
      window.setTimeout(() => stage.classList.remove("is-zooming"), 1200);
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

  function renderPantry() {
    const pantry = document.querySelector("#atomPantry");
    pantry.innerHTML = PANTRY_SYMBOLS.map(symbol => {
      const element = elementBySymbol(symbol);
      return `<button class="pantry-atom" type="button" data-symbol="${symbol}" style="--tile-color:${elementColor(element)}" aria-label="Add ${element.name} atom"><b>${symbol}</b><span>${element.name}</span></button>`;
    }).join("");
    pantry.querySelectorAll("button").forEach(button => button.addEventListener("click", () => addAtom(button.dataset.symbol)));
  }

  function addAtom(symbol) {
    if (state.mix.length >= 8) {
      showToast("The mixer can hold 8 atoms. Try a recipe now!");
      playTone(180, .1);
      return;
    }
    state.mix.push(symbol);
    playTone(310 + elementBySymbol(symbol).number * 5, .06);
    renderMixer();
  }

  function renderMixer() {
    const bowl = document.querySelector("#mixingBowl");
    if (!state.mix.length) {
      bowl.innerHTML = `<div class="empty-mixer"><span aria-hidden="true">🫧</span><b>Atoms go here</b></div>`;
      document.querySelector("#mixerHelp").textContent = "Your mixer is empty. Pick an atom!";
    } else {
      bowl.innerHTML = state.mix.map((symbol,index) => {
        const element = elementBySymbol(symbol);
        return `<span class="mix-atom" style="--tile-color:${elementColor(element)};animation-delay:${index*.04}s" title="${element.name}">${symbol}</span>`;
      }).join("");
      document.querySelector("#mixerHelp").textContent = `${state.mix.length} atom${state.mix.length === 1 ? "" : "s"} in your team.`;
    }
    const disabled = state.mix.length === 0;
    document.querySelector("#undoAtom").disabled = disabled;
    document.querySelector("#clearMixer").disabled = disabled;
    document.querySelector("#discoverMix").disabled = disabled;
  }

  function currentMixKey() {
    const counts = state.mix.reduce((all,symbol) => { all[symbol] = (all[symbol] || 0) + 1; return all; }, {});
    return makeRecipeKey(counts);
  }

  function discoverMix() {
    const result = document.querySelector("#discoveryResult");
    const recipe = RECIPE_SPECS.find(item => item.key === currentMixKey());
    result.hidden = false;
    if (!recipe) {
      result.innerHTML = `<div class="result-no-match"><span aria-hidden="true">🤔</span><div><h2>That team is a mystery!</h2><p>Those atoms do not match one of our recipes yet. Try changing the number of each atom.</p><button class="try-again" type="button">Keep mixing</button></div></div>`;
      result.querySelector("button").addEventListener("click", () => {
        result.hidden = true;
        document.querySelector("#atomPantry").scrollIntoView({behavior:"smooth",block:"center"});
      });
      speak("That team is a mystery. Try changing the number of each atom.");
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
    document.querySelector("#atomPantry").scrollIntoView({behavior:"smooth",block:"center"});
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
    message.rate = .88;
    message.pitch = 1.16;
    const voices = window.speechSynthesis.getVoices();
    message.voice = voices.find(voice => voice.lang.startsWith("en") && /Samantha|Google US English|Zira|Jenny|Natural/i.test(voice.name)) || voices.find(voice=>voice.lang.startsWith("en")) || null;
    window.speechSynthesis.speak(message);
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
    renderPantry();
    renderMixer();
    renderCollection();
    bindEvents();
    updateCounts();
  }

  init();
})();
