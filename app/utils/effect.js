
const strecthFactor = 0.05;
const maxStretch = 0.7;
const displacementFactor = 0.02;
const activeStateScale = 1.02;

/** @param {HTMLElement} element */
export function setStretchStyle(element) {
  if (!element.classList.contains("stretch")) return element;

  /** To track the starting position of the touch  @type {Array<number>} */
  let fingerStart = [];
  
  /** To track the maximum magnitude of strecthening  @type {Array<number>} */
  let maxStretchReached = [0,0];
  
  /** To track the maximum displacement  @type {Array<number>} */
  let maxDisplacement = [0,0];

  function handleMove(event) {
    event.preventDefault();

    const finger = event.touches[0];
    let x = finger.clientX;
    let y = finger.clientY;

    let dX = x - fingerStart[0];
    let dY = y - fingerStart[1];

    const changeX = Math.abs(dX);
    const changeY = Math.abs(dY);

    let strectchX = Math.min(changeX / 250 * strecthFactor, maxStretch);
    let strectchY = Math.min(changeY / 150 * strecthFactor, maxStretch);
    
    maxStretchReached = [Math.max(maxStretchReached[0], strectchX), Math.max(maxStretchReached[1], strectchY)];

    let disX = dX * displacementFactor;
    let disY = dY * displacementFactor;

    maxDisplacement[0] = Math.abs(maxDisplacement[0]) >= Math.abs(disX) ? maxDisplacement[0] : disX;
    maxDisplacement[1] = Math.abs(maxDisplacement[1]) >= Math.abs(disY) ? maxDisplacement[1] : disY;

    element.style.transform = `
    scale(${activeStateScale + strectchX}, ${activeStateScale + strectchY})
    translate(${disX}px, ${disY}px)`

    return;
  }

  element.addEventListener("touchstart", (touch) => {
    element.classList.add("touched");
    element.style.zIndex = 5;
    
    const event = touch.touches[0];
    
    element.style.transition = "all 300ms ease, transform 0s";
    
    fingerStart = [event.clientX, event.clientY];
    maxStretchReached = [ 0, 0];
    maxDisplacement = [0,0];
    
    element.addEventListener("touchmove", handleMove);
  });

  element.addEventListener("touchend", () => {
    element.removeEventListener("touchmove", handleMove);

    element.classList.remove("touched");
    
    element.style.transition = "all 300ms ease-in-out, transform 200ms ease-in-out";
    element.style.transform = `
    scale(${ 1 - maxStretchReached[0]/1.5 }, ${1 - maxStretchReached[1]/1.5 }) 
    translate(${ -maxDisplacement[0] }px, ${ -maxDisplacement[1] }px)`;
    
    setTimeout(() => {
      element.style.transform = `scale(1, 1) translate(0px, 0px)`;
      element.style.zIndex = "auto";
    }, 200)
  });

  return element;
}
