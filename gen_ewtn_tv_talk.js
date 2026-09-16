let pptxgen;
try { pptxgen = require("pptxgenjs"); }
catch { pptxgen = require("/private/tmp/claude-501/-Users-bartodt-ewtn-tv-talk/254292a4-14be-47b6-b773-a86289a0448d/scratchpad/node_modules/pptxgenjs"); }

const PLUGIN = "/Users/bartodt/Library/Application Support/Claude/local-agent-mode-sessions/e81aba7d-6f2a-4777-9f77-e604f4f38053/effb56d9-3e15-4a01-8688-b775f780f70c/rpm/plugin_01QiSGyCbnPNTHKpDKWzqUdx";
const IMG = "/Users/bartodt/ewtn-tv-talk/images";

// --- Color roles (from brand/tokens.css) -------------------------------------
const BRAND    = "F3E060"; // --zaelow: fills / large accents only
const BRAND_INK= "B7A211"; // --zaelow-ink: legible accent on light
const BRAND_LT = "FCF7DC"; // zaelow tint
const TEXT     = "211E20"; // --thunder
const SURFACE  = "FFFFFF"; // --white
const MUTED    = "707070"; // --dove-gray
const BORDER   = "E5E5E5"; // --mercury
const WILD     = "F5F5F5"; // --wild-sand
const D_CARD   = "2B2729";
const D_BORDER = "3A3638";
const D_TEXT   = "E5E5E5";
const D_MUTED  = "B0B0B0";

const FB = "Calibri";        // Instrument Sans is not installed on most targets
const FH = "Calibri Light";

const DECK = "EWTN+ for TV";
const TOTAL = 13;

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9"; // 10 x 5.625"
pres.title = DECK;

// --- shared chrome -----------------------------------------------------------
function chrome(slide, n, dark, noWordmark) {
  const c = dark ? D_MUTED : MUTED;
  slide.addText(`Zaelot · ${DECK}`, { x: 0.62, y: 5.23, w: 3, h: 0.14, fontSize: 8, color: c, fontFace: FB, margin: 0 });
  slide.addText(`${String(n).padStart(2, "0")} / ${String(TOTAL).padStart(2, "0")}`,
    { x: 6.4, y: 5.23, w: 2.98, h: 0.14, fontSize: 8, color: c, align: "right", fontFace: FB, margin: 0 });
  if (!noWordmark) {
    slide.addImage({ path: `${PLUGIN}/brand/logo/zaelot-logo-${dark ? "white" : "thunder"}.png`, x: 4.74, y: 5.30, w: 0.52, h: 0.156 });
  }
}

function sectionHead(slide, label, y, w) {
  slide.addText(label, { x: 0.62, y, w: w || 8.76, h: 0.22, fontSize: 8.5, bold: true, color: BRAND_INK, fontFace: FB, charSpacing: 1, margin: 0 });
  slide.addShape(pres.shapes.LINE, { x: 0.62, y: y + 0.22, w: w || 8.76, h: 0, line: { color: BRAND_INK, width: 1 } });
}

function bullets(items) {
  return items.map(t => ({ text: t, options: { bullet: { indent: 12 } } }));
}

// =============================================================================
// 01 — cover
// =============================================================================
{
  const s = pres.addSlide();
  s.background = { color: TEXT };
  s.addImage({ path: `${PLUGIN}/brand/logo/zaelot-logo-white.png`, x: 4.20, y: 0.42, w: 1.60, h: 0.479 });

  s.addText("A streaming app for three platforms with a single codebase",
    { x: 0.62, y: 1.28, w: 3.95, h: 0.48, fontSize: 10.5, bold: true, color: BRAND, fontFace: FB, valign: "top", margin: 0 });
  s.addText([{ text: "EWTN+ ", options: { color: SURFACE } }, { text: "for TV", options: { color: BRAND } }],
    { x: 0.62, y: 1.76, w: 3.95, h: 0.90, fontSize: 42, bold: true, fontFace: FH, lineSpacingMultiple: 1.05, valign: "top", margin: 0 });
  s.addText("How we built it with React Native, what problems we ran into, and how we solved them.",
    { x: 0.62, y: 2.74, w: 3.95, h: 0.86, fontSize: 12.5, color: D_MUTED, fontFace: FB, lineSpacingMultiple: 1.25, valign: "top", margin: 0 });

  s.addImage({ path: `${IMG}/home-screenshot.png`, x: 4.78, y: 1.22, w: 4.60, h: 2.588 });

  s.addShape(pres.shapes.LINE, { x: 0.62, y: 4.05, w: 8.76, h: 0, line: { color: BRAND, width: 1 } });
  const spec = [
    ["Stores", "Apple App Store · Google Play · Amazon Appstore"],
    ["Devices", "Apple TV · Android TV / Google TV · Fire TV"],
    ["Timeline", "July 2025 to January 2026"],
  ];
  const sw = (8.76 - 0.4) / 3;
  spec.forEach(([k, v], i) => {
    const x = 0.62 + i * (sw + 0.2);
    s.addText(k, { x, y: 4.22, w: sw, h: 0.20, fontSize: 9, bold: true, color: D_MUTED, fontFace: FB, margin: 0 });
    s.addText(v, { x, y: 4.44, w: sw, h: 0.50, fontSize: 11, bold: true, color: SURFACE, fontFace: FB, lineSpacingMultiple: 1.15, valign: "top", margin: 0 });
  });
  chrome(s, 1, true, true); // logo already present (centered) — one logo per slide
}

// =============================================================================
// 02 — feature-grid: TV hardware limitations
// =============================================================================
{
  const s = pres.addSlide();
  sectionHead(s, "CONTEXT", 0.50);
  s.addText("TV hardware limitations",
    { x: 0.62, y: 0.90, w: 8.76, h: 0.50, fontSize: 28, bold: true, color: TEXT, fontFace: FH, valign: "top", margin: 0 });
  s.addText("On TV it is React, and it looks like a normal app. The machine underneath is not.",
    { x: 0.62, y: 1.48, w: 8.76, h: 0.34, fontSize: 12.5, color: MUTED, fontFace: FB, valign: "top", margin: 0 });

  const cards = [
    ["Low RAM", "1 or 2 GB"],
    ["Slower CPUs", "More limited GPU capabilities"],
    ["Constrained storage", ""],
    ["Network handling", "Isn't always reliable"],
  ];
  cards.forEach(([t, d], i) => {
    const x = 0.62 + (i % 2) * 4.51, y = 2.15 + Math.floor(i / 2) * 1.30;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w: 4.26, h: 1.15, fill: { color: WILD }, line: { color: BORDER, width: 1 }, rectRadius: 0.06 });
    s.addText(t, { x: x + 0.24, y: y + 0.22, w: 3.78, h: 0.32, fontSize: 15, bold: true, color: TEXT, fontFace: FB, margin: 0 });
    if (d) s.addText(d, { x: x + 0.24, y: y + 0.58, w: 3.78, h: 0.36, fontSize: 11, color: MUTED, fontFace: FB, margin: 0 });
  });
  chrome(s, 2, false);
}

// =============================================================================
// 03 — two columns: the client (screenshot moved to the dedicated visual slide)
// =============================================================================
{
  const s = pres.addSlide();
  sectionHead(s, "01 · THE CLIENT", 0.50);
  s.addText("EWTN: a global Catholic media network",
    { x: 0.62, y: 0.88, w: 8.76, h: 0.50, fontSize: 26, bold: true, color: TEXT, fontFace: FH, valign: "top", margin: 0 });
  s.addText("Television, radio, news and digital platforms.",
    { x: 0.62, y: 1.44, w: 8.76, h: 0.28, fontSize: 12, color: MUTED, fontFace: FB, margin: 0 });

  s.addText("What EWTN+ ships", { x: 0.62, y: 1.98, w: 4.26, h: 0.24, fontSize: 10, bold: true, color: BRAND_INK, fontFace: FB, margin: 0 });
  s.addText(bullets([
    "Global live multi-lingual channels, 24/7",
    "Multi-lingual on-demand catalog",
    "The Bible",
    "Profiles",
    "Program guide (EPG)",
    "Search",
    "Donation",
  ]), { x: 0.62, y: 2.28, w: 4.26, h: 1.90, fontSize: 11.5, color: TEXT, fontFace: FB, lineSpacingMultiple: 1.18, valign: "top", margin: 0 });

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 5.12, y: 1.90, w: 4.26, h: 2.96, fill: { color: WILD }, line: { color: BORDER, width: 1 }, rectRadius: 0.06 });
  s.addText("At a glance", { x: 5.34, y: 2.08, w: 3.82, h: 0.24, fontSize: 10, bold: true, color: BRAND_INK, fontFace: FB, margin: 0 });
  const glance = [
    ["Rollout", "English and Spanish. US only in the first stage, then worldwide."],
    ["Previous app", "A legacy TV app with fewer features, rebuilt from scratch."],
    ["Destinations", "Apple App Store (tvOS) · Google Play (Android TV / Google TV) · Amazon Appstore (Fire TV)"],
  ];
  glance.forEach(([k, v], i) => {
    const y = 2.42 + i * 0.80;
    s.addText(k, { x: 5.34, y, w: 3.82, h: 0.20, fontSize: 9, bold: true, color: TEXT, fontFace: FB, margin: 0 });
    s.addText(v, { x: 5.34, y: y + 0.21, w: 3.82, h: 0.54, fontSize: 10, color: MUTED, fontFace: FB, lineSpacingMultiple: 1.15, valign: "top", margin: 0 });
  });
  chrome(s, 3, false);
}

// =============================================================================
// 04 — section divider: the bet
// =============================================================================
{
  const s = pres.addSlide();
  s.background = { color: TEXT };
  s.addImage({ path: `${PLUGIN}/brand/logo/zaelot-logo-white.png`, x: 8.58, y: 0.22, w: 0.80, h: 0.239 });
  s.addText("02", { x: 0.62, y: 1.50, w: 2.0, h: 1.10, fontSize: 64, bold: true, color: BRAND, fontFace: FH, valign: "top", margin: 0 });
  s.addText("The bet", { x: 0.62, y: 2.62, w: 8.76, h: 0.34, fontSize: 12, bold: true, color: D_MUTED, fontFace: FB, charSpacing: 1, margin: 0 });
  s.addText("A single codebase: the bright side",
    { x: 0.62, y: 2.96, w: 8.00, h: 0.80, fontSize: 38, bold: true, color: SURFACE, fontFace: FH, valign: "top", margin: 0 });
  chrome(s, 4, true, true);
}

// =============================================================================
// 05 — flow diagram: one codebase, three platforms (the "pipe" from the HTML)
// =============================================================================
{
  const s = pres.addSlide();
  s.addText("One codebase, three platforms",
    { x: 0.62, y: 0.50, w: 8.76, h: 0.44, fontSize: 24, bold: true, color: TEXT, fontFace: FH, valign: "top", margin: 0 });
  s.addText("React Native on the react-native-tvos fork, plus Expo, in TypeScript. The same code produces every artifact the three stores accept, and Expo Application Services runs the builds and the submissions in the cloud.",
    { x: 0.62, y: 1.00, w: 8.76, h: 0.52, fontSize: 12, color: MUTED, fontFace: FB, lineSpacingMultiple: 1.2, valign: "top", margin: 0 });
  s.addShape(pres.shapes.LINE, { x: 0, y: 1.66, w: 10, h: 0, line: { color: BRAND_INK, width: 1.5 } });

  const MID = 3.275;              // vertical centre of the whole flow
  const ARROW = { color: BRAND_INK, width: 1.5, endArrowType: "triangle" };

  // --- two upstream nodes ---
  const nodes = [
    [0.62, "One codebase", "React Native tvOS + Expo, TypeScript"],
    [3.17, "EAS Build", "Cloud builds and store submissions"],
  ];
  nodes.forEach(([x, t, d]) => {
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: 2.70, w: 2.15, h: 1.15, fill: { color: WILD }, line: { color: BORDER, width: 1 }, rectRadius: 0.06 });
    s.addText(t, { x: x + 0.20, y: 2.88, w: 1.75, h: 0.28, fontSize: 13, bold: true, color: TEXT, fontFace: FB, margin: 0 });
    s.addText(d, { x: x + 0.20, y: 3.20, w: 1.75, h: 0.58, fontSize: 10, color: MUTED, fontFace: FB, lineSpacingMultiple: 1.15, valign: "top", margin: 0 });
  });
  s.addShape(pres.shapes.LINE, { x: 2.79, y: MID, w: 0.36, h: 0, line: ARROW });

  // --- fan out to the three stores ---
  const out = [
    [".ipa", "production", "Apple App Store", "tvOS, via TestFlight"],
    [".aab", "production", "Google Play", "Android TV, Google TV"],
    [".aab / .apk", "amazon-production", "Amazon Appstore", "Fire TV, Amazon variant"],
  ];
  const rowY = [1.90, 2.85, 3.80], rowH = 0.85, spine = 5.52;
  s.addShape(pres.shapes.LINE, { x: 5.32, y: MID, w: 0.20, h: 0, line: { color: BRAND_INK, width: 1.5 } });
  s.addShape(pres.shapes.LINE, { x: spine, y: rowY[0] + rowH / 2, w: 0, h: rowY[2] + rowH / 2 - (rowY[0] + rowH / 2), line: { color: BRAND_INK, width: 1.5 } });

  out.forEach(([artifact, profile, store, sub], i) => {
    const y = rowY[i];
    s.addShape(pres.shapes.LINE, { x: spine, y: y + rowH / 2, w: 0.20, h: 0, line: ARROW });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 5.72, y, w: 3.66, h: rowH, fill: { color: SURFACE }, line: { color: BORDER, width: 1 }, rectRadius: 0.06 });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 5.86, y: y + 0.13, w: 1.10, h: 0.26, fill: { type: "none" }, line: { color: MUTED, width: 1 }, rectRadius: 0.13 });
    s.addText(artifact, { x: 5.86, y: y + 0.16, w: 1.10, h: 0.20, fontSize: 9, bold: true, color: TEXT, align: "center", fontFace: FB, margin: 0 });
    s.addText(profile, { x: 5.86, y: y + 0.45, w: 1.10, h: 0.20, fontSize: 8, color: MUTED, align: "center", fontFace: FB, margin: 0 });
    s.addText(store, { x: 7.14, y: y + 0.14, w: 2.10, h: 0.28, fontSize: 12, bold: true, color: TEXT, fontFace: FB, margin: 0 });
    s.addText(sub, { x: 7.14, y: y + 0.44, w: 2.10, h: 0.26, fontSize: 10, color: MUTED, fontFace: FB, margin: 0 });
  });
  chrome(s, 5, false);
}

// =============================================================================
// 06 — ranked rows: where the cost went
// =============================================================================
{
  const s = pres.addSlide();
  sectionHead(s, "03 · CHALLENGES", 0.50);
  s.addText("Where the cost went",
    { x: 0.62, y: 0.88, w: 8.76, h: 0.46, fontSize: 26, bold: true, color: TEXT, fontFace: FH, valign: "top", margin: 0 });

  const rows = [
    ["Focus handling", "No mouse or touch screen. The remote's D-pad drives focus, and each OS's native engine decides where it lands.", true],
    ["Screen readers", "VoiceOver, TalkBack and VoiceView increase the test matrix and fail in opposite ways.", false],
    ["A single codebase for three platforms", "tvOS, Android Amazon devices and Android Google devices differ.", false],
    ["Poor documentation", "Far less material on TV apps than on mobile or web, on top of a fork that is little known.", false],
    ["Emulators vs physical devices", "Focus, accessibility and performance behave differently on real hardware.", false],
  ];
  rows.forEach(([t, why, hot], i) => {
    const y = 1.55 + i * 0.70;
    if (hot) s.addShape(pres.shapes.RECTANGLE, { x: 0.62, y, w: 0.06, h: 0.62, fill: { color: BRAND }, line: { type: "none" } });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: hot ? 0.68 : 0.62, y, w: hot ? 8.70 : 8.76, h: 0.62, fill: { color: hot ? BRAND_LT : SURFACE }, line: { color: hot ? BRAND : BORDER, width: 1 }, rectRadius: 0.05 });
    s.addShape(pres.shapes.OVAL, { x: 0.88, y: y + 0.14, w: 0.34, h: 0.34, fill: { color: TEXT }, line: { type: "none" } });
    s.addText(String(i + 1), { x: 0.88, y: y + 0.19, w: 0.34, h: 0.24, fontSize: 11, bold: true, color: SURFACE, align: "center", fontFace: FB, margin: 0 });
    s.addText(t, { x: 1.36, y: y + 0.07, w: 2.55, h: 0.48, fontSize: 12, bold: true, color: TEXT, fontFace: FB, valign: "middle", margin: 0 });
    s.addText(why, { x: 4.05, y: y + 0.08, w: 5.15, h: 0.46, fontSize: 9.5, color: MUTED, fontFace: FB, lineSpacingMultiple: 1.15, valign: "middle", margin: 0 });
  });
  chrome(s, 6, false);
}

// =============================================================================
// 07 — two columns: focus handling (diagram moved to the dedicated visual slide)
// =============================================================================
{
  const s = pres.addSlide();
  s.addText("Challenge 1", { x: 0.62, y: 0.50, w: 8.76, h: 0.24, fontSize: 9.5, bold: true, color: BRAND_INK, fontFace: FB, charSpacing: 0.6, margin: 0 });
  s.addText("Focus handling",
    { x: 0.62, y: 0.80, w: 8.76, h: 0.46, fontSize: 26, bold: true, color: TEXT, fontFace: FH, valign: "top", margin: 0 });
  s.addText("On TV there is no mouse or touch screen: focus moves with the remote's D-pad, and the native engine decides where it goes from the layout's geometry.",
    { x: 0.62, y: 1.34, w: 8.76, h: 0.52, fontSize: 12, color: MUTED, fontFace: FB, lineSpacingMultiple: 1.2, valign: "top", margin: 0 });

  s.addText("Recurring symptoms", { x: 0.62, y: 2.00, w: 4.26, h: 0.22, fontSize: 9.5, bold: true, color: BRAND_INK, fontFace: FB, margin: 0 });
  s.addText(bullets([
    "Focus escaping to the side menu during transitions",
    "Focus lost after asynchronous loads",
    "Initial focus on the wrong element",
    "Overlapping elements",
  ]), { x: 0.62, y: 2.28, w: 4.26, h: 1.50, fontSize: 11.5, color: TEXT, fontFace: FB, lineSpacingMultiple: 1.2, valign: "top", margin: 0 });

  s.addText("How we handled it", { x: 5.12, y: 2.00, w: 4.26, h: 0.22, fontSize: 9.5, bold: true, color: BRAND_INK, fontFace: FB, margin: 0 });
  s.addText(bullets([
    "Custom reusable solutions (hooks and wrappers)",
    "Preventing focus on the side menu during navigation",
  ]), { x: 5.12, y: 2.28, w: 4.26, h: 1.50, fontSize: 11.5, color: TEXT, fontFace: FB, lineSpacingMultiple: 1.2, valign: "top", margin: 0 });

  // callout — the decision (the one highlight on this slide)
  s.addShape(pres.shapes.RECTANGLE, { x: 0.62, y: 4.10, w: 0.06, h: 0.62, fill: { color: BRAND }, line: { type: "none" } });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.68, y: 4.10, w: 8.70, h: 0.62, fill: { color: BRAND_LT }, line: { type: "none" }, rectRadius: 0.05 });
  s.addText([{ text: "The decision: ", options: { bold: true } }, { text: "trust the native engine, supported by react-native-tvos APIs.", options: {} }],
    { x: 0.92, y: 4.18, w: 8.20, h: 0.46, fontSize: 12, color: TEXT, fontFace: FB, lineSpacingMultiple: 1.15, valign: "middle", margin: 0 });
  chrome(s, 7, false);
}

// =============================================================================
// 08 — full-bleed media: images only, no copy
// =============================================================================
{
  const s = pres.addSlide();
  // The focus diagram is the tallest thing the canvas allows (portrait, 1118x1370);
  // the Live screen (16:9) is centred against it. Both at their native ratio.
  s.addImage({ path: `${IMG}/live-screenshot.png`, x: 0.40, y: 1.317, w: 5.00, h: 2.813 });
  s.addImage({ path: `${IMG}/focus-example.png`, x: 5.65, y: 0.300, w: 3.955, h: 4.847 });
  chrome(s, 8, false);
}

// =============================================================================
// 09 — three columns: screen readers (screenshot dropped, focus differentiation added)
// =============================================================================
{
  const s = pres.addSlide();
  s.addText("Challenge 2", { x: 0.62, y: 0.50, w: 8.76, h: 0.24, fontSize: 9.5, bold: true, color: BRAND_INK, fontFace: FB, charSpacing: 0.6, margin: 0 });
  s.addText("Screen readers",
    { x: 0.62, y: 0.80, w: 8.76, h: 0.46, fontSize: 26, bold: true, color: TEXT, fontFace: FH, valign: "top", margin: 0 });

  s.addText("~1%", { x: 0.62, y: 1.32, w: 1.10, h: 0.56, fontSize: 32, bold: true, color: TEXT, fontFace: FH, valign: "top", margin: 0 });
  s.addText("of traffic — and still a big part of the work, because the client asks for a strong emphasis on accessibility.",
    { x: 1.80, y: 1.38, w: 7.58, h: 0.44, fontSize: 11, color: MUTED, fontFace: FB, lineSpacingMultiple: 1.18, valign: "top", margin: 0 });

  const cols = [
    ["Focus differentiation", null, [
      "On TV, accessibility-focus differs from interaction focus. The reader announces the element with accessibility-focus.",
      "The two platforms fail in opposite ways.",
    ]],
    ["Recurring symptoms", true, [
      "Elements not targeted by accessibility-focus",
      "Announced element not matching the focused one",
      "Announcements cut off when the UI updates",
      "Nothing announced on programmatic focus moves",
    ]],
    ["How we handled it", true, [
      "An AccessibleContainer wrapper, reused everywhere",
      "Every focus request paired with an accessibility-focus request",
      "PR policy: evidence videos with the reader on and off",
      "Explicit announcements on complex views",
    ]],
  ];
  cols.forEach(([label, bulleted, items], i) => {
    const x = 0.62 + i * 3.00;
    s.addText(label, { x, y: 2.03, w: 2.76, h: 0.22, fontSize: 9.5, bold: true, color: BRAND_INK, fontFace: FB, margin: 0 });
    s.addText(bulleted ? bullets(items) : items.map(t => ({ text: t })),
      { x, y: 2.31, w: 2.76, h: 1.70, fontSize: 10, color: TEXT, fontFace: FB, lineSpacingMultiple: 1.18, paraSpaceAfter: bulleted ? 0 : 6, valign: "top", margin: 0 });
  });

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.62, y: 4.10, w: 8.76, h: 0.80, fill: { color: WILD }, line: { color: BORDER, width: 1 }, rectRadius: 0.06 });
  s.addText("Why it matters", { x: 0.88, y: 4.22, w: 8.24, h: 0.20, fontSize: 9.5, bold: true, color: BRAND_INK, fontFace: FB, margin: 0 });
  s.addText("Nonprofits that are public accommodations or take federal funding are expected to meet the Americans with Disabilities Act, or face litigation.",
    { x: 0.88, y: 4.44, w: 8.24, h: 0.42, fontSize: 10.5, color: TEXT, fontFace: FB, lineSpacingMultiple: 1.15, valign: "top", margin: 0 });
  chrome(s, 9, false);
}

// =============================================================================
// 10 — table: three platforms
// =============================================================================
{
  const s = pres.addSlide();
  s.addText("Challenge 3", { x: 0.62, y: 0.42, w: 8.76, h: 0.24, fontSize: 9.5, bold: true, color: BRAND_INK, fontFace: FB, charSpacing: 0.6, margin: 0 });
  s.addText("One codebase, three behaviors",
    { x: 0.62, y: 0.72, w: 8.76, h: 0.44, fontSize: 24, bold: true, color: TEXT, fontFace: FH, valign: "top", margin: 0 });

  const hdr = ["Aspect", "tvOS (Apple TV)", "Android TV / Google TV", "Fire TV"].map(t => ({
    text: t, options: { bold: true, color: SURFACE, fill: { color: TEXT }, fontSize: 10, fontFace: FB, valign: "middle", margin: 0.06 },
  }));
  const body = [
    ["Focus engine", "Infers targets by position and alignment. Diagonals and swipe supported.", "Closest element in the pressed direction. No diagonals.", "Same as Android"],
    ["Event order", "Blur of the previous element, then focus of the new one.", "Focus of the new element before blur of the previous one.", "Same as Android"],
    ["Screen reader", "VoiceOver cannot land on a Text component.", "TalkBack lands on a Text component.", "VoiceView: similar to Android"],
    ["Video player", "react-native-video does not report bitrate changes.", "react-native-video reports bitrate changes.", "Same as Android"],
  ];
  const rows = [hdr].concat(body.map((r, ri) => r.map((t, ci) => ({
    text: t,
    options: {
      bold: ci === 0, color: TEXT, fontSize: 9.5, fontFace: FB, valign: "middle", margin: 0.06,
      fill: { color: ri % 2 ? WILD : SURFACE },
    },
  }))));

  s.addTable(rows, {
    x: 0.62, y: 1.28, w: 8.76, colW: [1.50, 2.42, 2.42, 2.42],
    rowH: [0.30, 0.72, 0.72, 0.72, 0.72],
    border: { type: "solid", color: BORDER, pt: 1 },
  });

  s.addText("Divergences between the applications are isolated in defensive config plugins: they inject native code without keeping ios / android folders around.",
    { x: 0.62, y: 4.72, w: 8.76, h: 0.34, fontSize: 10.5, color: MUTED, fontFace: FB, lineSpacingMultiple: 1.15, valign: "top", margin: 0 });
  chrome(s, 10, false);
}

// =============================================================================
// 11 — split-panel (dark): advantages / disadvantages
// =============================================================================
{
  const s = pres.addSlide();
  s.background = { color: TEXT };
  s.addImage({ path: `${PLUGIN}/brand/logo/zaelot-logo-white.png`, x: 8.58, y: 0.22, w: 0.80, h: 0.239 });
  s.addText("The bet, weighed",
    { x: 0.62, y: 0.45, w: 7.50, h: 0.44, fontSize: 24, bold: true, color: SURFACE, fontFace: FH, valign: "top", margin: 0 });
  s.addText("Fixing one platform was prone to breaking another — and the codebase can fill up with platform conditionals if nobody watches it.",
    { x: 0.62, y: 0.94, w: 7.50, h: 0.42, fontSize: 11.5, color: D_MUTED, fontFace: FB, valign: "top", margin: 0 });

  const panels = [
    ["Advantages", [
      "One codebase and a single UI for three stores.",
      "Expo Router for navigation, EAS for builds and submissions: no local Xcode or Gradle.",
      "Usable React Native ecosystem (player, state, validation), fast iteration with hot reload.",
      "The whole team had prior React experience.",
      "Room to reuse business logic for the future mobile app.",
    ], true],
    ["Disadvantages", [
      "The fork lags behind React Native and Expo. TV support is fragile.",
      "Scarce documentation.",
      "The native focus engine forces platform conditionals throughout the UI.",
      "Complex end-to-end testing.",
    ], false],
  ];
  panels.forEach(([h, items, hot], i) => {
    const x = 0.62 + i * 4.51;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: 1.38, w: 4.26, h: 3.60, fill: { color: D_CARD }, line: { color: hot ? BRAND : D_BORDER, width: hot ? 1.5 : 1 }, rectRadius: 0.08 });
    s.addText(h, { x: x + 0.22, y: 1.56, w: 3.82, h: 0.26, fontSize: 10.5, bold: true, color: hot ? BRAND : D_MUTED, fontFace: FB, margin: 0 });
    s.addText(bullets(items), { x: x + 0.22, y: 1.90, w: 3.82, h: 2.92, fontSize: 11, color: D_TEXT, fontFace: FB, lineSpacingMultiple: 1.22, valign: "top", margin: 0 });
  });
  chrome(s, 11, true, true);
}

// =============================================================================
// 12 — column-cards: documentation and devices
// =============================================================================
{
  const s = pres.addSlide();
  sectionHead(s, "CHALLENGES 4 AND 5", 0.50);
  s.addText("Documentation and devices",
    { x: 0.62, y: 0.88, w: 8.76, h: 0.46, fontSize: 26, bold: true, color: TEXT, fontFace: FH, valign: "top", margin: 0 });

  const cards = [
    ["Lack of documentation", "react-native-tvos is a fork maintained by few people, with scarce documentation — and far less material on TV apps, and on TV accessibility, than on mobile or web.", [
      "AI tools did not contribute much at first",
      "They became useful once a solid base of custom solutions existed to use as reference",
    ]],
    ["Emulators vs physical devices", "Focus, accessibility and performance behave differently on real hardware.", [
      "Apple TV's VoiceOver can only be tested on a physical device",
      "Fire TV has no official emulator: testing runs over adb against physical sticks",
      "Focus timing and the system keyboard differ between the Android TV emulator and a real Google TV",
      "D-pad lag and screen-transition delays only show up on hardware",
    ]],
  ];
  cards.forEach(([t, lead, items], i) => {
    const x = 0.62 + i * 4.51;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: 1.46, w: 4.26, h: 3.50, fill: { color: SURFACE }, line: { color: BORDER, width: 1 }, rectRadius: 0.08 });
    s.addText(t, { x: x + 0.22, y: 1.64, w: 3.82, h: 0.30, fontSize: 15, bold: true, color: TEXT, fontFace: FB, margin: 0 });
    s.addText(lead, { x: x + 0.22, y: 1.98, w: 3.82, h: 0.86, fontSize: 10.5, color: MUTED, fontFace: FB, lineSpacingMultiple: 1.18, valign: "top", margin: 0 });
    s.addText(bullets(items), { x: x + 0.22, y: 2.92, w: 3.82, h: 1.90, fontSize: 10.5, color: TEXT, fontFace: FB, lineSpacingMultiple: 1.18, valign: "top", margin: 0 });
  });
  chrome(s, 12, false);
}

// =============================================================================
// 13 — closing (dark): what to take home
// =============================================================================
{
  const s = pres.addSlide();
  s.background = { color: TEXT };
  s.addImage({ path: `${PLUGIN}/brand/logo/zaelot-logo-white.png`, x: 8.58, y: 0.22, w: 0.80, h: 0.239 });
  s.addText("04 · Closing", { x: 0.62, y: 0.50, w: 8.76, h: 0.24, fontSize: 9.5, bold: true, color: BRAND, fontFace: FB, charSpacing: 0.6, margin: 0 });
  s.addText("What to take home",
    { x: 0.62, y: 0.80, w: 8.76, h: 0.52, fontSize: 30, bold: true, color: SURFACE, fontFace: FH, valign: "top", margin: 0 });
  s.addText("The assessment is still positive: the app is in production, in three stores, built by a small team.",
    { x: 0.62, y: 1.36, w: 8.76, h: 0.30, fontSize: 12.5, color: D_MUTED, fontFace: FB, valign: "top", margin: 0 });

  const take = [
    ["One app, three stores, a small team.", "The bet works, with the cost concentrated in focus and accessibility."],
    ["The native focus engine and screen readers are the real TV problem.", "The rest is conventional React Native development."],
    ["What upstream does not document, the team documents.", "In code and in guides."],
    ["End-to-end testing with Suitest.", "To catch any kind of instability in time."],
  ];
  take.forEach(([t, d], i) => {
    const y = 1.98 + i * 0.76;
    s.addText(String(i + 1).padStart(2, "0"), { x: 0.62, y: y + 0.06, w: 0.55, h: 0.30, fontSize: 15, bold: true, color: BRAND, fontFace: FH, margin: 0 });
    s.addText(t, { x: 1.26, y: y, w: 8.12, h: 0.28, fontSize: 13, bold: true, color: SURFACE, fontFace: FB, margin: 0 });
    s.addText(d, { x: 1.26, y: y + 0.30, w: 8.12, h: 0.28, fontSize: 11, color: D_MUTED, fontFace: FB, margin: 0 });
    if (i < take.length - 1) s.addShape(pres.shapes.LINE, { x: 1.26, y: y + 0.66, w: 8.12, h: 0, line: { color: D_BORDER, width: 1 } });
  });
  chrome(s, 13, true, true);
}

pres.writeFile({ fileName: "/Users/bartodt/ewtn-tv-talk/ewtn-tv-talk.pptx" })
  .then(f => console.log("written:", f));
