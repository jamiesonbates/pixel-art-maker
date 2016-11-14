(function() {
  'use strict';

// Automation of Grid and Pixel Size
const grid = document.getElementById('grid');

let gridMaker = function(gridColumns) {
  // Remove old grid
  let oldGrid = document.getElementById('grid');

  while (oldGrid.firstChild) {
    oldGrid.removeChild(oldGrid.firstChild);
  };

  // Math for number of rows and pixel size
  let gridRowsActual = 400 / (1000 / gridColumns);
  let gridRows = Math.floor(400 / (1000 / gridColumns));
  let gridColumnWidth = ((1000 / gridColumns) / 10)+ '%';
  let gridRowHeight = (((400 / gridRowsActual) - 1) / 4) + '%';

  // Creation and appending of elements for grid
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
// Default Grid
gridMaker(50);



// Resizing Grid on User Button Click
const smallestGrid = document.getElementById('smallest');
const smallGrid = document.getElementById('small');
const defaultGrid = document.getElementById('default');
const bigGrid = document.getElementById('big');

let removeGreen = function() {
  smallestGrid.classList.remove('green-highlight');
  smallGrid.classList.remove('green-highlight');
  defaultGrid.classList.remove('green-highlight');
  bigGrid.classList.remove('green-highlight');
}


smallestGrid.addEventListener('click', (event) => {
  gridMaker(125);
  removeGreen();
  smallestGrid.classList.add('green-highlight');
});

smallGrid.addEventListener('click', (event) => {
  gridMaker(85);
  removeGreen();
  smallGrid.classList.add('green-highlight');
});

defaultGrid.addEventListener('click', (event) => {
  gridMaker(50);removeGreen();
  defaultGrid.classList.add('green-highlight');
});

bigGrid.addEventListener('click', (event) => {
  gridMaker(40);
  removeGreen();
  bigGrid.classList.add('green-highlight');
});



// Adding a Color to a Pixel in the Grid
let color = '';

grid.addEventListener('click', (event) => {
  if (event.target.id === 'grid') {
    return;
  }
  else if (eraserOn) {
    event.target.style.backgroundColor = 'white';
    event.target.removeAttribute('id');
  }
  else if (currentColor.style.backgroundColor) {
    event.target.style.backgroundColor = currentColor.style.backgroundColor;
  }
  else {
  event.target.id = color;
  }
});



// Changing Active Color by Clicking on Color in Palette
const colorPallet = document.getElementById('color-palette');

colorPallet.addEventListener('click', (event) => {
  if (event.target.id === 'color-palette' || event.target.classList.contains('container')) {
    return;
  }
  color = event.target.id;

  if (eraserClickCount !== 0) {
    eraserClickCount++;
    eraserOn = false;
  }

  if (currentColor.style.backgroundColor) {
    currentColor.removeAttribute('style');
    currentColor.id = event.target.id;
  }
  else {
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
let eraserOn = false;
let eraserClickCount = 0;

eraser.addEventListener('click', () => {
  eraserClickCount++;

  if (eraserClickCount % 2 !== 0) {
    eraserOn = true;
  }
  else {
    eraserOn = false;
  };
});

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
  };
};



// Swap Theme Colors Into Palette
const theme1Btn = document.getElementById('theme-1');
const theme2Btn = document.getElementById('theme-2');
const theme3Btn = document.getElementById('theme-3');

theme1Btn.addEventListener('click', (event) => {
    themePaletteSwap('first-theme');
});

theme2Btn.addEventListener('click', (event) => {
    themePaletteSwap('second-theme');
});

theme3Btn.addEventListener('click', (event) => {
    themePaletteSwap('third-theme');
});

})();



// Color Picker
let currentColor = document.querySelector('.current-color');

let changeEventHandler = function(event) {
  let changedElement = document.getElementById('color-selection').value;
  currentColor.style.backgroundColor = changedElement;
};
