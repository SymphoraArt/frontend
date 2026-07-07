/* ════════════ Enki mock data ════════════ */
(function () {
  const GENERATORS = [
    { id: "nano-banana-pro", name: "Nano Banana Pro", short: "Nano Banana" },
    { id: "gpt-image-2", name: "GPT Image 2", short: "GPT Image 2" },
    { id: "seedance-2", name: "Seedance 2", short: "Seedance 2" },
  ];

  const CATEGORIES = [
    "Portrait", "Character", "Cinematic", "Architecture",
    "Abstract", "Product", "Minimal", "Editorial",
  ];

  const NAV = [
    { id: "home", label: "Home", icon: "home" },
    { id: "search", label: "Search", icon: "search" },
    { id: "favorites", label: "Favorites", icon: "heart" },
    { id: "leaderboard", label: "Hall of Fame", icon: "trophy" },
    { id: "history", label: "History", icon: "history" },
    { id: "messages", label: "Messages", icon: "message", badge: 3 },
    { id: "color", label: "Color Setup", icon: "palette" },
    { id: "settings", label: "Settings", icon: "settings" },
  ];

  // curated seed set — title, artist, handle, category, generator idx, video?, prompt, vars, tags, ratio (h/w)
  const SEEDS = [
    ["Ashfall Cathedral", "Ирина Volkova", "ivolkova", "Architecture", 0, false, "Vast gothic cathedral half-swallowed by [element], volumetric god-rays, fine ash particles drifting, shot on [lens], cinematic grade", ["element", "lens"], ["gothic", "volumetric", "ash"], 1.42],
    ["Saffron Index", "Kojima Rei", "kreidesign", "Editorial", 1, false, "Editorial still life, single [object] on raw plaster, hard window light, muted saffron palette, 4x5 large format", ["object"], ["editorial", "plaster", "minimal"], 1.25],
    ["Neon Monsoon", "Devansh Rao", "drao", "Cinematic", 2, true, "Rain-soaked Mumbai alley at night, neon reflections, lone figure in [color] coat, anamorphic flares, slow dolly", ["color"], ["neon", "rain", "cinematic"], 0.56],
    ["Porcelain Heir", "Liang Mei", "lmei", "Portrait", 0, false, "Close portrait of porcelain-skinned subject, [mood] expression, soft north light, hand-painted backdrop, hasselblad", ["mood"], ["portrait", "soft", "studio"], 1.32],
    ["Salt & Static", "Noa Friedman", "noaf", "Abstract", 1, false, "Abstract macro of [material] crystallising, iridescent fringes, dark field, extreme detail", ["material"], ["macro", "abstract", "iridescent"], 1.0],
    ["The Quiet Engine", "Marco Vitale", "mvitale", "Product", 1, false, "Product hero of a brushed titanium [device], floating on seamless graphite, rim light, studio reflections", ["device"], ["product", "titanium", "studio"], 0.8],
    ["Dunes of A[x]", "Aïcha Belkadi", "aicha", "Cinematic", 2, true, "Aerial over endless dunes at golden hour, caravan of [number] silhouettes, heat shimmer, 70mm", ["number"], ["aerial", "desert", "golden"], 0.62],
    ["Cobalt Bloom", "Sven Häkkinen", "svenh", "Abstract", 0, false, "Ink blooming in water, cobalt and [color2], high speed capture, black background, hyperreal", ["color2"], ["ink", "fluid", "highspeed"], 1.5],
    ["Atelier 9", "Camille Roux", "croux", "Editorial", 1, false, "Fashion editorial, model draped in [fabric], brutalist concrete stair, overcast diffusion, film grain", ["fabric"], ["fashion", "brutalist", "film"], 1.46],
    ["Iron Pilgrim", "Tomasz Wójcik", "twojcik", "Character", 0, false, "Weathered armored wanderer, [weather] backdrop, intricate engraved plate, rim-lit dusk, concept art", ["weather"], ["character", "armor", "concept"], 1.28],
    ["Greenhouse Ghost", "Yuki Tanaka", "ytanaka", "Cinematic", 2, true, "Abandoned greenhouse reclaimed by [plant], dust motes in shafts of light, slow push-in, eerie calm", ["plant"], ["overgrown", "light", "eerie"], 0.58],
    ["Vermilion Study", "Hassan Karim", "hkarim", "Portrait", 0, false, "Dramatic side portrait, single vermilion gel, [accessory] catching light, deep shadow, editorial beauty", ["accessory"], ["beauty", "gel", "dramatic"], 1.35],
    ["Folded Light", "Greta Olsen", "golsen", "Minimal", 1, false, "Minimal paper sculpture casting [shape] shadows, warm tungsten, beige seamless, soft gradient", ["shape"], ["minimal", "paper", "shadow"], 1.0],
    ["Tidal Cathedral", "Diego Marín", "dmarin", "Architecture", 0, false, "Parametric concrete pavilion meeting the sea, [time] light, long exposure water, architectural digest", ["time"], ["architecture", "concrete", "sea"], 0.72],
    ["Moth Queen", "Priya Nair", "pnair", "Character", 0, false, "Ethereal character with moth-wing mantle, [palette] bioluminescence, forest bokeh, fantasy portrait", ["palette"], ["fantasy", "ethereal", "glow"], 1.4],
    ["Concrete Poem", "Ulla Berg", "uberg", "Minimal", 1, false, "Single brutalist [object2] on raw concrete, top light, dust, quiet tension, museum catalogue", ["object2"], ["minimal", "brutalist", "quiet"], 1.18],
    ["Crimson Transit", "Joon-ho Park", "jpark", "Cinematic", 2, true, "Bullet train interior at dusk, lone passenger, [city] blurring past, warm interior, anamorphic", ["city"], ["transit", "dusk", "anamorphic"], 0.6],
    ["Glass Botanica", "Elena Costa", "ecosta", "Product", 1, false, "Hand-blown glass vessel holding [liquid], backlit, caustics on linen, slow product reveal", ["liquid"], ["glass", "backlit", "product"], 0.85],
    ["Last Analog", "Robbie Shaw", "rshaw", "Editorial", 1, false, "Still life of vintage [gadget] on velvet, single hard light, nostalgic grade, square format", ["gadget"], ["vintage", "stilllife", "velvet"], 1.0],
    ["Aurora Spine", "Kari Nilsen", "knilsen", "Cinematic", 2, true, "Lone tent under [color3] aurora, mountains, time-lapse stars, ultra-wide, breathtaking", ["color3"], ["aurora", "night", "wide"], 0.62],
    ["Marble Idol", "Sofia Greco", "sgreco", "Abstract", 0, false, "Fractured marble bust draped in [material2], chiaroscuro, gallery spot, hyperdetailed sculpture", ["material2"], ["sculpture", "marble", "chiaroscuro"], 1.33],
    ["Citrus Hour", "Theo Lambert", "tlambert", "Product", 1, false, "Sliced [fruit] suspended mid-air, splash, vivid color block background, high-key commercial", ["fruit"], ["food", "splash", "vivid"], 0.78],
    ["Velvet Interrogation", "Nadia Hassan", "nhassan", "Portrait", 0, false, "Noir portrait, venetian-blind shadows across [subject], smoke, 1940s grade, monochrome with warm tint", ["subject"], ["noir", "shadow", "smoke"], 1.3],
    ["Pavilion of Rain", "Wei Chen", "wchen", "Architecture", 0, false, "Minimalist timber pavilion in [season] rain, reflecting pool, soft fog, architectural serenity", ["season"], ["timber", "rain", "serene"], 0.74],
  ];

  // Art-directed gradient palettes per category [base, c1, c2, c3]
  const PALETTES = {
    Portrait: ["#2a1410", "#e8a06a", "#b23b3b", "#f0d9b5"],
    Character: ["#10131f", "#7c5cff", "#27c2a0", "#e9c46a"],
    Cinematic: ["#0a1020", "#ff7a3c", "#1b6ca8", "#ffd28a"],
    Architecture: ["#1a1c1f", "#9aa7b0", "#d9c3a0", "#5b7c99"],
    Abstract: ["#160a20", "#ff4d6d", "#4dd0e1", "#ffd166"],
    Product: ["#141414", "#c0c6cc", "#e0a36a", "#5a6b7a"],
    Minimal: ["#e6e0d4", "#cbb79a", "#b9a886", "#8a7f6a"],
    Editorial: ["#1c1814", "#c98a5a", "#7a8b74", "#d8c7a8"],
  };

  function rng(str) {
    let h = 1779033703 ^ str.length;
    for (let i = 0; i < str.length; i++) { h = Math.imul(h ^ str.charCodeAt(i), 3432918353); h = (h << 13) | (h >>> 19); }
    return function () { h = Math.imul(h ^ (h >>> 16), 2246822507); h = Math.imul(h ^ (h >>> 13), 3266489909); return ((h ^= h >>> 16) >>> 0) / 4294967296; };
  }

  function genArt(seedStr, w, h, pal) {
    const r = rng(seedStr);
    let defs = "", layers = "";
    const accents = [pal[1], pal[2], pal[3], pal[2], pal[1]];
    accents.forEach((c, k) => {
      const cx = (r() * 100).toFixed(1), cy = (r() * 100).toFixed(1);
      const rad = (38 + r() * 46).toFixed(1);
      const id = "g" + k;
      defs += '<radialGradient id="' + id + '" cx="' + cx + '%" cy="' + cy + '%" r="' + rad + '%">' +
        '<stop offset="0%" stop-color="' + c + '" stop-opacity="0.92"/>' +
        '<stop offset="100%" stop-color="' + c + '" stop-opacity="0"/></radialGradient>';
      layers += '<rect width="' + w + '" height="' + h + '" fill="url(#' + id + ')"/>';
    });
    const svg =
      '<svg xmlns="http://www.w3.org/2000/svg" width="' + w + '" height="' + h + '" viewBox="0 0 ' + w + ' ' + h + '">' +
      '<defs>' + defs +
      '<linearGradient id="sh" x1="0" y1="0" x2="0" y2="1"><stop offset="55%" stop-color="#000" stop-opacity="0"/><stop offset="100%" stop-color="#000" stop-opacity="0.22"/></linearGradient></defs>' +
      '<rect width="' + w + '" height="' + h + '" fill="' + pal[0] + '"/>' + layers +
      '<rect width="' + w + '" height="' + h + '" fill="url(#sh)"/>' +
      '</svg>';
    return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
  }

  function buildPrompts(seeds, offset) {
    offset = offset || 0;
    return seeds.map((s, i) => {
      const idx = offset + i;
      const ratio = s[9];
      const w = 520;
      const h = Math.round(w * ratio);
      const seed = "enki" + idx;
      const pal = PALETTES[s[3]] || PALETTES.Abstract;
      const rotate = (n) => [pal[0], pal[1 + (n % 3)], pal[1 + ((n + 1) % 3)], pal[1 + ((n + 2) % 3)]];
      return {
        id: "p" + idx,
        title: s[0],
        artist: s[1],
        handle: s[2],
        category: s[3],
        generator: GENERATORS[s[4]].id,
        generatorName: GENERATORS[s[4]].short,
        isVideo: s[5],
        paid: (idx % 2 === 1),
        prompt: s[6],
        vars: s[7],
        tags: s[8],
        ratio: ratio,
        price: (Math.round((0.05 + (idx % 7) * 0.07) * 100) / 100),
        downloads: 120 + ((idx * 137) % 4200),
        likes: 40 + ((idx * 91) % 1800),
        img: genArt(seed, w, h, pal),
        versions: [0, 1, 2, 3].map((v) => genArt(seed + "v" + v, 640, 640, rotate(v + 1))),
      };
    });
  }

  // generate an endless-feeling pool by re-seeding the curated set
  function morePrompts(round) {
    return buildPrompts(SEEDS, round * SEEDS.length);
  }

  const RESULT_PALS = [PALETTES.Cinematic, PALETTES.Character, PALETTES.Abstract, PALETTES.Portrait, PALETTES.Editorial];

  window.ENKI = {
    GENERATORS,
    CATEGORIES,
    NAV,
    prompts: buildPrompts(SEEDS, 0),
    morePrompts,
    genResult: (seed, ratio) => {
      const map = { "16:9": [768, 432], "9:16": [432, 768], "4:5": [560, 700], "3:4": [540, 720] };
      const [w, h] = map[ratio] || [640, 640];
      const pal = RESULT_PALS[Math.floor(Math.random() * RESULT_PALS.length)];
      return genArt(seed, w, h, pal);
    },
  };
})();
