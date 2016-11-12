(function() {
  'use strict';

// Global Variables
const grid = document.getElementById('grid');
const colorPallet = document.getElementById('color-palette');
let color = '';
const theme1Btn = document.getElementById('theme-1');
const theme2Btn = document.getElementById('theme-2');

// Automation of Grid and Pixel Size
const gridColumns = 50;
const gridRowsActual = 400 / (1000 / gridColumns);
const gridRows = Math.floor(400 / (1000 / gridColumns));
const gridColumnWidth = ((1000 / gridColumns) / 10)+ '%';
const gridRowHeight = (((400 / gridRowsActual) - 1) / 4) + '%';

// Create Grid of pixels
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

// Changing Pixel Color
grid.addEventListener('click', (event) => {
  event.target.id = color;
});

// Extracting Color from Pallet
colorPallet.addEventListener('click', (event) => {
  color = event.target.id;
});

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
