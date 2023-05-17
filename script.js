// Create Variables
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

// Sets the current colour
function setCurrentColour(newColour) {
    currentColour= newColour; 
}

// Sets the current mode based on the activateButton function
function setCurrentMode(newMode) {
    activateButton(newMode);
    currentMode = newMode; 
}

// Variety of events to execute certain functionalities
colourPicker.oninput = (e) => setCurrentColour(e.target.value);
colourBtn.onclick = () => setCurrentMode('colour');
rainbowBtn.onclick = () => setCurrentMode('rainbow');
eraserBtn.onclick = () => setCurrentMode('eraser');
sizeSlider.onmousemove = (e) => updateSizeValue(e.target.value);
sizeSlider.onchange = (e) => changeSize(e.target.value);

// Creates a new grid of a specified size
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

// Changes the size of the grid
function changeSize(input) {
    if (input >=2 && input <=100) {
        populateGrid(input);
    }
}

// Changes the background colour of the calling element based on currentMode and currentColour if click is true
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

// Assigns the value of the choice argument to the colour variable
function changeColour(choice) {
    colour = choice; 
}

// Clears the grid
function clearGrid() {
    let grid = document.querySelector(".grid");
    let squares = grid.querySelectorAll("div");
    squares.forEach((div) => div.style.backgroundColor = "white");
}

// Removes the 'active' class from the button corresponding to currentMode and adds it to the button corresponding to newMode, updates colourPicker opacity and disable state
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

// Updates the innerHTML of the sizeValue element to display the value argument in the specified format
function updateSizeValue(value) {
    sizeValue.innerHTML = `${value} x ${value}`;
}

// Adds an event listener to the element with class "grid" that toggles the value of the click variable on click
document.querySelector(".grid").addEventListener("click", () => {
    click = !click; 
});

// Populates the grid 16 x 16
populateGrid(16);