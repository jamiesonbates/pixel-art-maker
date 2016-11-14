(function() {
  'use strict';

// Global Variables
const grid = document.getElementById('grid');
const colorPallet = document.getElementById('color-palette');
let color = '';
const theme1Btn = document.getElementById('theme-1');
const theme2Btn = document.getElementById('theme-2');

const colorSelection = document.getElementById('color-selection');
console.log(colorSelection);
colorSelection.addEventListener('click', (event) => {
  console.log(event);
});


// Automation of Grid and Pixel Size
// let gridColumns = 50;


// Create Grid of pixels
let gridMaker = function(gridColumns) {
  let oldGrid = document.getElementById('grid');
  while (oldGrid.firstChild) {
    oldGrid.removeChild(oldGrid.firstChild);
  }
  let gridRowsActual = 400 / (1000 / gridColumns);
  let gridRows = Math.floor(400 / (1000 / gridColumns));
  let gridColumnWidth = ((1000 / gridColumns) / 10)+ '%';
  let gridRowHeight = (((400 / gridRowsActual) - 1) / 4) + '%';
  for (let i = 0; i < gridColumns; i++) {
    let newColumn = document.createElement('div');
    newColumn.classList.add('column');
    newColumn.style.width = gridColumnWidth;

    for (let j = 0; j < gridRows; j++) {
      let newRow = document.createElement('div');
      newRow.style.height = gridRowHeight;
      newColumn.append(newRow);
    }

    grid.append(newColumn);
  }
}
gridMaker(50);

const smallestGrid = document.getElementById('smallest');
const smallGrid = document.getElementById('small');
const bigGrid = document.getElementById('big');
const biggestGrid = document.getElementById('biggest');

smallestGrid.addEventListener('click', (event) => {
  gridMaker(125);
});
smallGrid.addEventListener('click', (event) => {
  gridMaker(85);
});
bigGrid.addEventListener('click', (event) => {
  gridMaker(50);
});
biggestGrid.addEventListener('click', (event) => {
  gridMaker(40);
});

// Changing Pixel Color
grid.addEventListener('click', (event) => {
  if (event.target.id === 'grid') {
    return;
  }
  else if (eraserOn) {
    event.target.style.backgroundColor = 'white';
    event.target.removeAttribute('id');
    console.log(event.target);
  }
  else if (currentColor.style.backgroundColor) {
    event.target.style.backgroundColor = currentColor.style.backgroundColor;
  }
  else {
  event.target.id = color;
  }
});

// Extracting Color from Palette
colorPallet.addEventListener('click', (event) => {
  if (eraserClickCount !== 0) {
    eraserClickCount++;
    eraserOn = false;
  }
  color = event.target.id;
  if (currentColor.style.backgroundColor) {
    currentColor.removeAttribute('style');
    currentColor.id = event.target.id;
  } else {
    currentColor.id = event.target.id;
  }
});

// Paint *Brush*
let dragging = false;

grid.addEventListener('mousedown', (event) => {
  dragging = true;
});

grid.addEventListener('mouseover', (event) => { // figure out mouseenter
  if (dragging) {
    if (event.target.id === 'grid') {
      return;
    }
    else if (eraserOn) {
      event.target.style.backgroundColor = 'white';
      event.target.removeAttribute('id');
      console.log(event.target);
    }
    else if (currentColor.style.backgroundColor) {
      event.target.style.backgroundColor = currentColor.style.backgroundColor;
    }
    else {
    event.target.id = color;
    }
  }
});

grid.addEventListener('mouseup', (event) => {
  dragging = false;
});

// Eraser
let eraser = document.getElementById('eraser');
console.log(eraser);
let eraserOn = false;
let eraserClickCount = 0;

eraser.addEventListener('click', () => {
  eraserClickCount++;
  console.log(eraserClickCount);

  if (eraserClickCount % 2 !== 0) {
    eraserOn = true;
  }
  else {
    eraserOn = false;
  }
})

// Putting Colors from Themes in the Palette
const themePaletteSwap = function(className) {
  let buttonSibling = event.target.nextSibling;
  let themeColors = document.getElementsByClassName(className);
  let paletteColors = document.getElementsByClassName('cp-color');
  for (let i = 0; i < themeColors.length; i++) {
    let paletteColorID = paletteColors[i].id;
    let themeColorID = themeColors[i].id;
    paletteColors[i].id = themeColorID;
    themeColors[i].id = paletteColorID;
  }
}

theme1Btn.addEventListener('click', (event) => {
    themePaletteSwap('first-theme');
});

theme2Btn.addEventListener('click', (event) => {
    themePaletteSwap('second-theme');
})

})();

// Color Picker
let currentColor = document.querySelector('.current-color');

let changeEventHandler = function(event) {
  let changedElement = document.getElementById('color-selection').value;
  currentColor.style.backgroundColor = changedElement;
};
