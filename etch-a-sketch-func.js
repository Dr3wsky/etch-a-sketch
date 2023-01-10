/* Initialize default values and DOM manipulations */
const DEFAULT_COLOR = 'black';
const DEFAULT_MODE = 'color';
const DEFAULT_SIZE = 16;

let color = DEFAULT_COLOR;
let size = DEFAULT_SIZE;
let mode = DEFAULT_MODE;


const colorPicker = document.getElementById('colorPicker');
const colorBtn = document.getElementById('colorBtn');
const rainbowBtn = document.getElementById('rainbowBtn');
const eraserBtn = document.getElementById('eraserBtn');
const clearBtn = document.getElementById('clearBtn');
const sizeValue = document.getElementById('sizeValue');
const sizeSlider = document.getElementById('sizeSlider');
const screen = document.getElementById('screen');

window.onload = () => {
    makePixels(DEFAULT_SIZE);
};

/* Add events to settings */

/* Changes start of mouseDown variable, to allow continuous drawing */
let mouseDown = false;
window.onmousedown = () => (mouseDown = true);
window.onmouseup = () => (mouseDown = false);

clearBtn.onclick = () => resetScreen();



/* Define working functions */
function clearScreen() {
    screen.innerHTML = '';
};

function resetScreen() {
    clearScreen();
    makePixels(size);
};

function makePixels(size) {
    screen.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    screen.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size *size; i++) {
        const pixel = document.createElement('div');
        pixel.classList.add('pixel');
        pixel.addEventListener('mouseover', draw);
        pixel.addEventListener('mousedown', draw);
        screen.appendChild(pixel);
    };
};

function draw(e) {
    if (e.type == 'mouseover' && !mouseDown) return;
    if (mode == 'color') {
        e.target.style.backgroundColor = color;
        e.target.style.border = color;
    };
};
