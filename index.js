(function() {
  'use strict';

// Global Variables
const grid = document.getElementById('grid');
const colorPallet = document.getElementById('color-palette');
let color = '';
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

})();
