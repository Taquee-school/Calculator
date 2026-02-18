document.getElementById("simple-calculator-anchor").classList.add("active");

// #region Expression
let expression = "";

const expressionPanel = document.getElementById("expression-panel");

const expressionElement = document.getElementById("expression");
expressionElement.textContent = expression;

function addToExpression(part) {
  const span = document.createElement("span");
  span.textContent = part;
  span.className = ["÷", "×", "+", "-", ".", "(", ")", "%"].includes(part) ? "operator-text" : "number-text";
  expressionElement.appendChild(span);
  expression += part;
  requestAnimationFrame(() => {
    updateExpression();
  });
}

const buttonPanel = document.getElementById("button-panel");

buttonPanel.querySelectorAll(".numbers").forEach(button => {
  button.addEventListener("click", () => {
    addToExpression(button.dataset.value);
  })
});

buttonPanel.querySelectorAll(".operators").forEach(button => {
  button.addEventListener("click", () => {
    if (button.dataset.work) {}
    else {
      addToExpression(button.dataset.value);
    }
  })
});

const clearBtn = document.querySelector("[data-work='clear']");
clearBtn.addEventListener("click", clearExpression);

function clearExpression() {
  expressionElement.innerHTML = null;
  expression = "";
  expressionElement.style.fontSize = `70px`;
  updateExpression();
}

function updateExpression() {
  adjustFontSize();
  expressionElement.scrollLeft = expressionElement.scrollWidth;
}
// #endregion Expression

// #region Backspace
const bnBackspace = document.getElementById("bn-backspace");
let pressTimer1;
let pressTimer2;
let pressTimer3;
let repeatInterval1;
let repeatInterval2;
let repeatInterval3;
let increaseSpeed;

function cutExpression() {
  if (!expressionElement.lastChild) { return }
  expression = expression.slice(0, -1);
  expressionElement.removeChild(expressionElement.lastChild);
  updateExpression();
}

function startRepeat1() {
  repeatInterval1 = setInterval(cutExpression, 300);
}
function startRepeat2() {
  repeatInterval2 = setInterval(cutExpression, 200);
}
function startRepeat3() {
  repeatInterval3 = setInterval(cutExpression, 50);
}

function handlePress() {
  cutExpression();
  pressTimer1 = setTimeout(() => {
    startRepeat1();
  }, 300);
  pressTimer2 = setTimeout(() => {
    clearInterval(repeatInterval1);
    startRepeat2();
  }, 1200);
  pressTimer3 = setTimeout(() => {
    clearInterval(repeatInterval3);
    startRepeat3();
  }, 1500);
}

function handleRelease() {
  clearTimeout(pressTimer1);
  clearTimeout(pressTimer2);
  clearTimeout(pressTimer3);
  clearInterval(repeatInterval1);
  clearInterval(repeatInterval2);
  clearInterval(repeatInterval3);
}

bnBackspace.addEventListener("touchstart", handlePress);
bnBackspace.addEventListener("touchend", handleRelease);
bnBackspace.addEventListener("mouseleave", handleRelease);
// #endregion Backspace button

// #region Font size
const MINIMUM_FONT_SIZE_PX = 25;
const DEFAULT_FONT_SIZE_PX = parseFloat(expressionElement.style.fontSize) || 70;
let currentFontSize = DEFAULT_FONT_SIZE_PX;

function adjustFontSize() {
  currentFontSize = parseFloat(expressionElement.style.fontSize) || DEFAULT_FONT_SIZE_PX;

  if (checkOverflowX(expressionElement)) {
    
    // size reduced roughly
    while (currentFontSize > MINIMUM_FONT_SIZE_PX && checkOverflowX(expressionElement)) {
      currentFontSize -= 1;
      expressionElement.style.fontSize = `${currentFontSize}px`;
    }

    // size reduced precisely
    while (currentFontSize > MINIMUM_FONT_SIZE_PX && checkOverflowX(expressionElement)) {
      currentFontSize -= 0.2;
      expressionElement.style.fontSize = `${currentFontSize}px`;
    }

    // Back to minimum size
    if (currentFontSize < MINIMUM_FONT_SIZE_PX) {
      expressionElement.style.fontSize = `${MINIMUM_FONT_SIZE_PX}px`;
    }
  }
  
  else if (currentFontSize < DEFAULT_FONT_SIZE_PX) {

    while (currentFontSize <= DEFAULT_FONT_SIZE_PX) {

      if (checkOverflowX(expressionElement)) {
        expressionElement.style.fontSize = `${currentFontSize - 1}px`;
        break;
      } 
      
      else {
        currentFontSize++;
        expressionElement.style.fontSize = `${currentFontSize}px`;
      }
    }
  }
}

function checkOverflowX(element) { return element.scrollWidth > element.clientWidth }
// #endregion Font size