import { createElement } from "../utils/create-dom.js";

function createOptions() {
  Object.keys(unitMap).forEach(i => {
    unitTypeInput.appendChild(createElement("option", {
      text: i,
      value: i
    }));
  });
}

function changeOptions() {
  emmitterUnitInput.innerHTML = "";
  acceptorUnitInput.innerHTML = "";
  
  currentUnitMap = unitMap[unitTypeInput.value];

  Object.keys(currentUnitMap).forEach((i) => {
    
    acceptorUnitInput.appendChild(createElement("option", {
      text: currentUnitMap[i].displayName,
      value: i
    }));
    emmitterUnitInput.appendChild(createElement("option", {
      text: currentUnitMap[i].displayName,
      value: i
    }));
  });
}

function convertUnit() {
  let acceptedValue;
  if (unitAcceptor.value) {
    acceptedValue = unitAcceptor.value || 0;
  } else {
    unitEmmitter.value = "";
    return;
  }
  
  const standardValue = currentUnitMap[acceptorUnitInput.value].toBase(acceptedValue);
  
  const resultValue = currentUnitMap[emmitterUnitInput.value].fromBase(standardValue);

  unitEmmitter.value = resultValue;
}


document.getElementById("unit-converter-anchor").classList.add("active");

let currentUnitMap;

const unitMap = {
  length: {
    meter: {
      displayName: "Meter",
      toBase: x => x,
      fromBase: x => x
    },
    millimeter: {
      displayName: "Millimeter",
      toBase: x => x / 1000,
      fromBase: x => x * 1000
    },
    centimeter: {
      displayName: "Centimeter",
      toBase: x => x / 100,
      fromBase: x => x * 100
    },
    decimeter: {
      displayName: "Decimeter",
      toBase: x => x / 10,
      fromBase: x => x * 10
    },
    kilometer: {
      displayName: "Kilometer",
      toBase: x => x * 1000,
      fromBase: x => x / 1000
    },
    inch: {
      displayName: "Inch",
      toBase: x => x * 0.0254,
      fromBase: x => x / 0.0254
    },
    foot: {
      displayName: "Foot",
      toBase: x => x * 0.3048,
      fromBase: x => x / 0.3048
    }
  },

  temperature: {
    kelvin: {
      displayName: "Kelvin",
      toBase: x => x,
      fromBase: x => x
    },
    celsius: {
      displayName: "Celsius",
      toBase: x => x + 273.15,
      fromBase: x => x - 273.15
    },
    fahrenheit: {
      displayName: "Fahrenheit",
      toBase: x => (x - 32) * 5/9 + 273.15,
      fromBase: x => (x - 273.15) * 9/5 + 32
    }
  },

  pressure: {
    pascal: {
      displayName: "Pascal",
      toBase: x => x,
      fromBase: x => x
    },
    bar: {
      displayName: "Bar",
      toBase: x => x * 1e5,
      fromBase: x => x / 1e5
    },
    atmosphere: {
      displayName: "Atmosphere",
      toBase: x => x * 101325,
      fromBase: x => x / 101325
    },
    torr: {
      displayName: "Torr",
      toBase: x => x * 133.322,
      fromBase: x => x / 133.322
    }
  },

  weight: {
    kilogram: {
      displayName: "Kilogram",
      toBase: x => x,
      fromBase: x => x
    },
    gram: {
      displayName: "Gram",
      toBase: x => x / 1000,
      fromBase: x => x * 1000
    },
    milligram: {
      displayName: "Milligram",
      toBase: x => x / 1e6,
      fromBase: x => x * 1e6
    },
    pound: {
      displayName: "Pound",
      toBase: x => x * 0.45359237,
      fromBase: x => x / 0.45359237
    },
    ounce: {
      displayName: "Ounce",
      toBase: x => x * 0.028349523125,
      fromBase: x => x / 0.028349523125
    },
    ton: {
      displayName: "Tonne",
      toBase: x => x * 1000,
      fromBase: x => x / 1000
    }
  },

  energy: {
    joule: {
      displayName: "Joule",
      toBase: x => x,
      fromBase: x => x
    },
    electronVolt: {
      displayName: "Electron Volt",
      toBase: x => x * 1.602176634e-19,
      fromBase: x => x / 1.602176634e-19
    }
  },
  
  time: {
    second: {
      displayName: "Second",
      toBase: x => x,
      fromBase: x => x 
    },
    minute: {
      displayName: "Minute",
      toBase: x => x * 60,
      fromBase: x => x / 60
    },
    hour:   {
      displayName: "Hour",
      toBase: x => x * 3600,
      fromBase: x => x / 3600 
    }
},

power: {
  watt: { displayName: "Watt", toBase: x => x, fromBase: x => x },
  kilowatt: { displayName: "Kilowatt", toBase: x => x * 1000, fromBase: x => x / 1000 },
  horsepower: { displayName: "Horsepower", toBase: x => x * 745.699872, fromBase: x => x / 745.699872 }
},

frequency: {
  hertz: { displayName: "Hertz", toBase: x => x, fromBase: x => x },
  kilohertz: { displayName: "Kilohertz", toBase: x => x * 1e3, fromBase: x => x / 1e3 },
  megahertz: { displayName: "Megahertz", toBase: x => x * 1e6, fromBase: x => x / 1e6 }
},

speed: {
  "m/s": { displayName: "m/s", toBase: x => x, fromBase: x => x },
  "km/h": { displayName: "km/h", toBase: x => x / 3.6, fromBase: x => x * 3.6 },
  mph: { displayName: "mph", toBase: x => x * 0.44704, fromBase: x => x / 0.44704 }
},

angle: {
  radian: { displayName: "Radian", toBase: x => x, fromBase: x => x },
  degree: { displayName: "Degree", toBase: x => x * Math.PI / 180, fromBase: x => x * 180 / Math.PI }
},

data: {
  byte: { displayName: "Byte", toBase: x => x, fromBase: x => x },
  bit: { displayName: "Bit", toBase: x => x / 8, fromBase: x => x * 8 },
  kilobyte: { displayName: "KB", toBase: x => x * 1024, fromBase: x => x / 1024 },
  megabyte: { displayName: "MB", toBase: x => x * 1024**2, fromBase: x => x / 1024**2 },
  gigabyte: { displayName: "GB", toBase: x => x * 1024**3, fromBase: x => x / 1024**3 }
}
};

const unitTypeInput = document.getElementById("unit-type");
unitTypeInput.addEventListener("input", () => {
  changeOptions();
  convertUnit();
});

const unitAcceptor = document.getElementById("acceptor-input");
unitAcceptor.addEventListener("input", convertUnit);
const acceptorUnitInput = document.getElementById("acceptor-unit-input");
acceptorUnitInput.addEventListener("input", convertUnit);

const unitEmmitter = document.getElementById("emmitter-input");
const emmitterUnitInput = document.getElementById("emmitter-unit-input");
emmitterUnitInput.addEventListener("input", convertUnit);

const swapUnitBtn = document.getElementById("swap-unit");
swapUnitBtn.addEventListener("click", swapUnits);

let swapOnlyUnit = true;
let swapOnlyValue = false;

function swapUnits() {
  const emmitter = { unit: emmitterUnitInput.value, value: unitEmmitter.value};
  const acceptor = { unit: acceptorUnitInput.value, value: unitAcceptor.value};
  
  emmitterUnitInput.value = acceptor.unit;
  unitEmmitter.value = acceptor.value;
  
  if (!swapOnlyValue) acceptorUnitInput.value = emmitter.unit;
  if (!swapOnlyUnit) unitAcceptor.value = emmitter.value;
  
  convertUnit();
}

window.addEventListener("DOMContentLoaded", () => {
  createOptions();
  changeOptions();
  convertUnit();
});
