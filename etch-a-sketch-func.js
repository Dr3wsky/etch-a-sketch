/* Initialize default values and DOM manipulations */
const DEFAULT_COLOR = "black";
const DEFAULT_MODE = "color";
const DEFAULT_SIZE = 16;

let activeColor = DEFAULT_COLOR;
let activeSize = DEFAULT_SIZE;
let activeMode = DEFAULT_MODE;

const colorPicker = document.getElementById("colorPicker");
const colorBtn = document.getElementById("colorBtn");
const rainbowBtn = document.getElementById("rainbowBtn");
const eraserBtn = document.getElementById("eraserBtn");
const clearBtn = document.getElementById("clearBtn");
const sizeValue = document.getElementById("sizeValue");
const sizeSlider = document.getElementById("sizeSlider");
const screen = document.getElementById("screen");

window.onload = () => {
  makePixels(DEFAULT_SIZE);
};

/* Add events to settings */

/* Changes start of mouseDown variable, to allow continuous drawing */
let mouseDown = false;
window.onmousedown = () => (mouseDown = true);
window.onmouseup = () => (mouseDown = false);

clearBtn.onclick = () => resetScreen();
colorPicker.oninput = (e) => setColor(e.target.value);
colorBtn.onclick = () => setMode("color");
rainbowBtn.onclick = () => setMode("rainbow");
eraserBtn.onclick = () => setMode("eraser");
sizeSlider.oninput = (e) => setScreenSize(e.target.value);

/* Define working functions */
function clearScreen() {
  screen.innerHTML = "";
}

function resetScreen() {
  clearScreen();
  makePixels(activeSize);
}

function setScreenSize(newSize) {
  activeSize = newSize;
  resetScreen();
  sizeValue.innerHTML = `${newSize} x ${newSize}`;
}

function setColor(newColor) {
  activeColor = newColor;
}

function setMode(newMode) {
  setActiveButton(newMode);
  activeMode = newMode;
}

function makePixels(size) {
  screen.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  screen.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size * size; i++) {
    const pixel = document.createElement("div");
    pixel.classList.add("pixel");
    pixel.addEventListener("mouseover", draw);
    pixel.addEventListener("mousedown", draw);
    screen.appendChild(pixel);
  }
}

function draw(e) {
  if (e.type === "mouseover" && !mouseDown) return;
  if (activeMode === "color") {
    e.target.style.backgroundColor = activeColor;
    e.target.style.border = activeColor;
  }
  if (activeMode === "rainbow") {
    const randomR = Math.floor(Math.random() * 256);
    const randomG = Math.floor(Math.random() * 256);
    const randomB = Math.floor(Math.random() * 256);
    e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
    e.target.style.border = `rgb(${randomR}, ${randomG}, ${randomB})`;
  }
  if (activeMode === "eraser") {
    e.target.style.backgroundColor = "white";
    e.target.style.border = "var(--primary-light) 1px solid";
  }
}

function setActiveButton(newMode) {
  if (activeMode === "rainbow") {
    rainbowBtn.classList.remove("active");
  } else if (activeMode === "color") {
    colorBtn.classList.remove("active");
  } else if (activeMode === "eraser") {
    eraserBtn.classList.remove("active");
  }

  if (newMode === "rainbow") {
    rainbowBtn.classList.add("active");
  } else if (newMode === "color") {
    colorBtn.classList.add("active");
  } else if (newMode === "eraser") {
    eraserBtn.classList.add("active");
  }
}
