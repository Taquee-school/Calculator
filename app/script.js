//#region UI helper functions
import { createElement } from "./utils/create-dom.js";
import { setStretchStyle } from "./utils/effect.js";

function createButton(id = null, className = null, icon = null, text = null, clickFunction = null) {
  const button = document.createElement("button");
  if (id) { button.id = id }
  if (className) { button.className = className }
  if (icon) { button.appendChild(icon) }
  if (text) {
    let p = document.createElement("p");
    p.textContent = text;
    button.appendChild(p);
  }
  if (clickFunction) {
    button.addEventListener("click", clickFunction);
  }
  return button;
}

/**
 * @param {('regular'|'bold'|'fill')} type 
 * @param {string} name 
 * @param {Function} clickFunction 
 * @param {string} id 
 */
function createIcon(type, name, clickFunction = null, id = null) {
  const icon = document.createElement("i");
  icon.className = `ph-${type} ph-${name}`;
  if (clickFunction) { icon.addEventListener("click", clickFunction); }
  return icon;
}
//#endregion UI helper functions

export function updateDeviceColor() {
  const themeTag = document.head.querySelector('meta[name="theme-color"]');
  if (!themeTag) return;
  const color = getComputedStyle(app).getPropertyValue("--primary-bg").trim();
  themeTag.setAttribute("content", color);
}

export const app = document.getElementById("app");

const appWrapper = document.getElementById("app-wrapper");

const appTopBar = document.getElementById("app-top-bar");

//#region Tools panel
const toolsPanel = createElement("div", {
  className: "mode-toggle-div stretch",
  id: "tools-panel"
});
appTopBar.appendChild(toolsPanel);

toolsPanel.appendChild(createElement("a", {
  id: "simple-calculator-anchor",
  href: "../simple-calculator/index.html",
 }, [createIcon("bold", "calculator")]));

 toolsPanel.appendChild(createElement("a", {
  id: "unit-converter-anchor",
  href: "../unit-converter/index.html",
 }, [createIcon("bold", "swap")]));

 toolsPanel.appendChild(createElement("a", {
  id: "currency-converter-anchor",
  href: "../currency-converter/index.html",
 }, [createIcon("bold", "currency-dollar")]));

 toolsPanel.appendChild(createElement("a", {
  id: "scientific-calculator-anchor",
  href: "../scientific-calculator/index.html",
 }, [createIcon("bold", "atom")]));
//#endregion Tools panel

//#region Option panel
function showOptionPanel() {
  if (optionPanel.style.display == "flex") return;
  
  bnOption.removeEventListener("click", showOptionPanel);
  
  optionPanel.style.display = "flex";
  optionPanel.classList.add("anim-appear-panel");
  
  optionPanel.addEventListener( "animationend", () => {
    optionPanel.classList.remove("anim-appear-panel");
    bnOption.addEventListener("click", hideOptionPanel);
  }, { once: true });
}

function hideOptionPanel() {
  if (optionPanel.style.display == "none") return;
  
  bnOption.removeEventListener("click", hideOptionPanel);
  
  optionPanel.classList.add("anim-disappear-panel");
  
  optionPanel.addEventListener( "animationend", () => {
    optionPanel.classList.remove("anim-disappear-panel");
    optionPanel.style.display = "none";
    bnOption.addEventListener("click", showOptionPanel);
  }, { once: true });
}

const bnOption = createElement("button", {
  title: "Options",
  id: "options-btn",
  className: "options-btn ripple stretch toggle"
}, [ createIcon("bold", "dots-three-vertical")], {"click": [showOptionPanel]});
appTopBar.appendChild(bnOption);

const optionPanel = createElement("div", {
  id: "option-panel",
  className: "added-panel"
});
appWrapper.appendChild(optionPanel);

optionPanel.appendChild(setRippleStyle(createElement("button", {
  id: "theme-btn",
  className:  "option-panel-btn ripple"
}, [ createIcon("fill", "paint-roller"), createElement("p", { textContent: "Theme" })],
{ "click": [showThemePanel] })));

optionPanel.appendChild(setRippleStyle(createElement("button", {
  id: "palette-btn",
  className: "option-panel-btn ripple"
}, [createIcon("fill", "palette"), createElement("p", { textContent: "Palette" })],
{ "click": [showPalettePanel] })));

optionPanel.appendChild(setRippleStyle(createElement("button", {
  id: "shape-btn",
  className:  "option-panel-btn ripple"
}, [createIcon("fill", "cube"), createElement("p", { textContent: "Shape" })],
{ "click": [showShapePanel] })));
//#endregion Option panel

//#region Theme panel
let appliedTheme = "dark";
let appliedThemeIcon = null;
let selectedTheme = "dark";
let selectedThemeIcon = null;

function applyTheme() {
  app.classList.remove(appliedTheme);
  appliedThemeIcon = selectedThemeIcon;
  appliedTheme = selectedTheme;
  app.classList.add(appliedTheme);
  updateDeviceColor();
  hideThemePanel();
  localStorage.setItem("theme", appliedTheme);
}

function showThemePanel() {
  if (ThemePanel.style.display == "flex") return;
  
  hideOptionPanel();
  ThemePanel.style.display = "flex";
  
  ThemePanel.classList.add("anim-appear-panel");
  
  ThemePanel.addEventListener("animationend", () => {
    ThemePanel.classList.remove("anim-appear-panel");
  });
}

function hideThemePanel() {
  if (ThemePanel.style.display == "none") return;
  
  selectedThemeIcon.className = "ph-bold ph-circle";
  selectedThemeIcon = appliedThemeIcon;
  selectedThemeIcon.className = "ph-fill ph-radio-button";
  
  ThemePanel.classList.add("anim-disappear-panel");
  
  ThemePanel.addEventListener("animationend", () => {
    ThemePanel.style.display = "none";
    ThemePanel.classList.remove("anim-disappear-panel");
    },{ once: true }
  );
}

const ThemePanel = createElement("div", {
  className: "added-panel",
  id: "theme-panel"
});
ThemePanel.style.display = "none";
appWrapper.appendChild(ThemePanel);

ThemePanel.appendChild(createElement("p", {
  className: "added-panel-header",
  textContent:  "Choose Theme"
}));

const darkIcon = createIcon("fill", "radio-button");
appliedThemeIcon = darkIcon;
selectedThemeIcon = darkIcon;
ThemePanel.appendChild(setRippleStyle(createButton("dark-btn-theme", "option-panel-btn ripple", darkIcon, "Dark", () => {
  selectedThemeIcon.className = "ph-bold ph-circle";
  selectedTheme = "dark";
  selectedThemeIcon = darkIcon;
  selectedThemeIcon.className = "ph-fill ph-radio-button";
})));

const lightIcon = createIcon("bold", "circle");
ThemePanel.appendChild(setRippleStyle(createButton("light-btn-theme", "option-panel-btn ripple", lightIcon, "Light", () => {
  selectedThemeIcon.className = "ph-bold ph-circle";
  selectedTheme = "light";
  selectedThemeIcon = lightIcon;
  selectedThemeIcon.className = "ph-fill ph-radio-button";
})));

const ThemePanelBtnDiv = createElement("div", { className: "added-panel-btn-div" });
ThemePanel.appendChild(ThemePanelBtnDiv);

ThemePanelBtnDiv.appendChild(createButton("cancel-btn-theme", null, null, "cancel", hideThemePanel));
ThemePanelBtnDiv.appendChild(createButton("cancel-btn-theme", null, null, "ok", applyTheme));
//#endregion Theme panel

//#region Palette panel
let appliedPalette = "blue";
let appliedPaletteIcon = null;
let selectedPalette = "blue";
let selectedPaletteIcon = null;

function applyPalette() {
  app.classList.remove(appliedPalette);
  appliedPalette = selectedPalette;
  appliedPaletteIcon = selectedPaletteIcon;
  app.classList.add(appliedPalette);
  updateDeviceColor();
  hidePalettePanel();
  localStorage.setItem("palette", appliedPalette);
}

function showPalettePanel() {
  if (PalettePanel.style.display == "flex") return;
  
  hideOptionPanel();
  
  PalettePanel.style.display = "flex";
  PalettePanel.classList.add("anim-appear-panel");
  
  PalettePanel.addEventListener("animationend", () => {
    PalettePanel.classList.remove("anim-appear-panel");
  }, { once: true });
}

function hidePalettePanel() {
  if (PalettePanel.style.display == "none") return;
  
  selectedPaletteIcon.className = "ph-bold ph-circle";
  selectedPaletteIcon = appliedPaletteIcon;
  selectedPaletteIcon.className = "ph-fill ph-radio-button";
  
  PalettePanel.classList.add("anim-disappear-panel");
  
  PalettePanel.addEventListener("animationend", () => {
    PalettePanel.style.display = "none";
    PalettePanel.classList.remove("anim-disappear-panel");
  }, { once: true });
}

const PalettePanel = createElement("div", {
  className: "added-panel",
  id: "palette-panel"
});
PalettePanel.style.display = "none";
appWrapper.appendChild(PalettePanel);

PalettePanel.appendChild(createElement("p", {
  className: "added-panel-header",
  textContent: "Choose Palette"
}));

const blueIcon = createIcon("fill", "radio-button");
selectedPaletteIcon = blueIcon;
appliedPaletteIcon = blueIcon;
PalettePanel.appendChild(setRippleStyle(createButton("blue-btn-palette", "option-panel-btn ripple", blueIcon, "Blue", () => {
  selectedPaletteIcon.className = "ph-bold ph-circle";
  selectedPalette = "blue";
  selectedPaletteIcon = blueIcon;
  selectedPaletteIcon.className = "ph-fill ph-radio-button";
})));

const greenIcon = createIcon("bold", "circle");
PalettePanel.appendChild(setRippleStyle(createButton("green-btn-palette", "option-panel-btn ripple", greenIcon, "Green", () => {
  selectedPaletteIcon.className = "ph-bold ph-circle";
  selectedPalette = "green";
  selectedPaletteIcon = greenIcon;
  selectedPaletteIcon.className = "ph-fill ph-radio-button";
})));

const orangeIcon = createIcon("bold", "circle");
PalettePanel.appendChild(setRippleStyle(createButton("orange-btn-palette", "option-panel-btn ripple", orangeIcon, "orange", () => {
  selectedPaletteIcon.className = "ph-bold ph-circle";
  selectedPalette = "orange";
  selectedPaletteIcon = orangeIcon;
  selectedPaletteIcon.className = "ph-fill ph-radio-button";
})));

const monochromeIcon = createIcon("bold", "circle");
PalettePanel.appendChild(setRippleStyle(createButton("monochrome-btn-palette", "option-panel-btn ripple", monochromeIcon, "Monochrome", () => {
  selectedPaletteIcon.className = "ph-bold ph-circle";
  selectedPalette = "monochrome";
  selectedPaletteIcon = monochromeIcon;
  selectedPaletteIcon.className = "ph-fill ph-radio-button";
})));

const PalettePanelBtnDiv = createElement("div", { className: "added-panel-btn-div" });
PalettePanel.appendChild(PalettePanelBtnDiv);

PalettePanelBtnDiv.appendChild(createButton("cancel-btn-palette", null, null, "cancel", hidePalettePanel));
PalettePanelBtnDiv.appendChild(createButton("cancel-btn-palette", null, null, "ok", applyPalette));
//#endregion Palette panel

//#region Shape panel
let appliedShape = "squircle";
let appliedShapeI = null;
let selectedShape = "squircle";
let selectedShapeI = null;

function applyShape() {
  app.classList.remove(appliedShape);
  appliedShape = selectedShape;
  appliedShapeI = selectedShapeI;
  app.classList.add(appliedShape);
  hideShapePanel();
  localStorage.setItem("shape", appliedShape);
}

function showShapePanel() {
  if (ShapePanel.style.display == "flex") return;
  
  hideOptionPanel();
  
  ShapePanel.style.display = "flex";
  ShapePanel.classList.add("anim-appear-panel");
  
  ShapePanel.addEventListener("animationend", () => {
    ShapePanel.classList.remove("anim-appear-panel");
  }, { once: true });
}

function hideShapePanel() {
  if (ShapePanel.style.display == "none") return;
  
  selectedShapeI.className = "ph-bold ph-circle";
  selectedShapeI = appliedShapeI;
  selectedShapeI.className = "ph-fill ph-radio-button";
  
  ShapePanel.classList.add("anim-disappear-panel");
  
  ShapePanel.addEventListener( "animationend", () => {
    ShapePanel.style.display = "none";
    ShapePanel.classList.remove("anim-disappear-panel");
  }, { once: true });
}

const ShapePanel = createElement("div", {
  className: "added-panel",
  id: "shape-panel"
});
ShapePanel.style.display = "none";
appWrapper.appendChild(ShapePanel);

ShapePanel.appendChild(createElement("p", {
  className: "added-panel-header",
  textContent: "Choose Shape"
}));

const squircleIcon = createIcon("fill", "radio-button");
appliedShapeI = squircleIcon;
selectedShapeI = squircleIcon;
ShapePanel.appendChild(setRippleStyle(createButton("squircle-btn-shape", "option-panel-btn ripple", squircleIcon, "Squircle", () => {
  selectedShapeI.className = "ph-bold ph-circle";
  selectedShape = "squircle";
  selectedShapeI = squircleIcon;
  selectedShapeI.className = "ph-fill ph-radio-button";
})));

const circleIcon = createIcon("bold", "circle");
ShapePanel.appendChild(setRippleStyle(createButton("circle-btn-shape", "option-panel-btn ripple", circleIcon, "Circle", () => {
  selectedShapeI.className = "ph-bold ph-circle";
  selectedShape = "circle";
  selectedShapeI = circleIcon;
  selectedShapeI.className = "ph-fill ph-radio-button";
})));

const ShapePanelBtnDiv = createElement("div", { className: "added-panel-btn-div" });
ShapePanel.appendChild(ShapePanelBtnDiv)

ShapePanelBtnDiv.appendChild(createButton("cancel-btn-shape", null, null, "cancel", hideShapePanel));
ShapePanelBtnDiv.appendChild(createButton("cancel-btn-shape", null, null, "ok", applyShape));
//#endregion Shape panel

//#region Local storage
export function checkLocalStorage() {
  updateUI(
    localStorage.getItem("theme"),
    localStorage.getItem("palette"),
    localStorage.getItem("shape")
  );
}

function updateUI(theme, palette, shape) {
  const themeMap = { "light": lightIcon, "dark": darkIcon };
  const paletteMap = {
    "blue": blueIcon,
    "green": greenIcon,
    "orange": orangeIcon,
    "monochrome": monochromeIcon,
  };
  const shapeMap = { "squircle": squircleIcon, "circle": circleIcon };
  if (theme) {
    selectedThemeIcon.className = "ph-bold ph-circle";
    selectedThemeIcon = themeMap[theme];
    selectedTheme = theme;
    selectedThemeIcon.className = "ph-fill ph-radio-button";
    applyTheme();
  }
  if (palette) {
    try {
      selectedPaletteIcon.className = "ph-bold ph-circle";
      selectedPaletteIcon = paletteMap[palette];
      selectedPalette = palette;
      selectedPaletteIcon.className = "ph-fill ph-radio-button";
    } catch {
      localStorage.setItem("palette", null);
      selectedPaletteIcon = blueIcon;
      selectedPalette = "blue";
      selectedPaletteIcon.className = "ph-fill ph-radio-button";
      applyPalette();
    }
    applyPalette();
  }
  if (shape) {
    selectedShapeI.className = "ph-bold ph-circle";
    selectedShape = shape;
    selectedShapeI = shapeMap[shape];
    selectedShapeI.className = "ph-fill ph-radio-button";
    applyShape();
  }
}

//document.querySelectorAll(".ripple").forEach((button) => setRippleStyle(button));
document.querySelectorAll(".stretch").forEach((button) => setStretchStyle(button));

function setRippleStyle(button) {
  button.addEventListener("click", function (event) {
    const circle = document.createElement("span");
    circle.classList.add("ripple-span");

    const rect = button.getBoundingClientRect();
    let diameter = Math.max(rect.width, rect.height);
    let radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;

    circle.style.left = `${event.clientX - rect.left - radius}px`;
    circle.style.top = `${event.clientY - rect.top - radius}px`;

    button.appendChild(circle);

    setTimeout(() => {
      circle.remove();
    }, 600);
  });
  
  return button;
}

//#endregion Local storage
app.dataset.os = "ios";

document.addEventListener("DOMContentLoaded", () => {
  updateDeviceColor();
  checkLocalStorage();
});