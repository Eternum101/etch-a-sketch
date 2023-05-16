const DEFAULT_COLOUR = 'black';
const DEFAULT_MODE = 'colour';

const colourPicker = document.getElementById('colourPicker');
const colourBtn = document.getElementById('colourBtn');
const rainbowBtn = document.getElementById('rainbowBtn');
const eraserBtn = document.getElementById('eraserBtn'); 
const sizeValue = document.getElementById('sizeValue');
const sizeSlider = document.getElementById('sizeSlider');

let currentColour = DEFAULT_COLOUR;
let currentMode = DEFAULT_MODE;
let click = false;

function setCurrentColour(newColour) {
    currentColour= newColour; 
}

function setCurrentMode(newMode) {
    activateButton(newMode);
    currentMode = newMode; 
}

colourPicker.oninput = (e) => setCurrentColour(e.target.value);
colourBtn.onclick = () => setCurrentMode('colour');
rainbowBtn.onclick = () => setCurrentMode('rainbow');
eraserBtn.onclick = () => setCurrentMode('eraser');
sizeSlider.onmousemove = (e) => updateSizeValue(e.target.value);
sizeSlider.onchange = (e) => changeSize(e.target.value);

function populateGrid(size) {   
let grid = document.querySelector(".grid");
let squares = grid.querySelectorAll("div");
let amount = size * size;

squares.forEach((div) => div.remove());
grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`; 
grid.style.gridTemplateRows = `repeat(${size}, 1fr)`; 

for(let i = 0; i < amount; i++) {
    let square = document.createElement("div");
    square.addEventListener("mouseover", colourSquare);
    square.style.backgroundColor = "white"; 
    grid.insertAdjacentElement("beforeend", square);  
    }
}

function changeSize(input) {
    if (input >=2 && input <=100) {
        populateGrid(input);
    }
}

function colourSquare() {
    if (click) {
        if (currentMode === "rainbow") {
            this.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        } else if (currentMode === 'colour') {
            this.style.backgroundColor = currentColour;
        } else if (currentMode === 'eraser') {
            this.style.backgroundColor = '#fefefe';
        }
    }
}

function changeColour(choice) {
    colour = choice; 
}

function clearGrid() {
    let grid = document.querySelector(".grid");
    let squares = grid.querySelectorAll("div");
    squares.forEach((div) => div.style.backgroundColor = "white");
}

function activateButton(newMode) {
    if (currentMode === 'rainbow') {
        rainbowBtn.classList.remove('active');
    } else if (currentMode === 'colour') {
        colourBtn.classList.remove('active');
    } else if (currentMode === 'eraser') {
        eraserBtn.classList.remove('active');
    }

    if (newMode === 'rainbow') {
        rainbowBtn.classList.add('active');
        colourPicker.style.opacity = '0.5';
        colourPicker.disabled = true;
      } else if (newMode === 'colour') {
        colourBtn.classList.add('active');
        colourPicker.style.opacity = '1';
        colourPicker.disabled = false;
    } else if (newMode === 'eraser') {
        eraserBtn.classList.add('active');
    }
}

function updateSizeValue(value) {
    sizeValue.innerHTML = `${value} x ${value}`;
}

document.querySelector(".grid").addEventListener("click", () => {
    click = !click; 
});

populateGrid(16);