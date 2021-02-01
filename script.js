const gridContainer = document.querySelector('.grid-container');
const resetButton = document.querySelector('#reset-button');
const modeButtons = document.querySelectorAll('.option-buttons');
const currentMode = document.querySelector('#current-mode');
let modeSelection = 'black-and-white-mode';

modeButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
        modeSelection = btn.id;
        modeButtons.forEach((btn) => {
            btn.classList.remove('selected');
        });
        btn.classList.add('selected');
    });
});

let gridSize = 16;

drawGrid(gridSize);

function selectSquare() {
    switch (modeSelection) {
        case 'black-and-white-mode':
            this.classList.remove('gray');
            this.style.backgroundColor = 'black';
            this.style.opacity = 1;
            break;
        case 'opacity-mode':
            let currentOpacity = Number(this.style.backgroundColor.slice(-4, -1));
            if (currentOpacity <= 0.9) {
                this.style.backgroundColor = `rgba(0, 0, 0, ${currentOpacity + 0.1})`;
                this.classList.add('gray');
            } else if (this.classList.contains('gray') && this.style.backgroundColor === 'rgb(0, 0, 0)') {
                return;
            } else {
                this.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
            }
            break;
        case 'color-mode':
            this.classList.remove('gray');
            this.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
            break;
    }

}

function drawGrid(size) {
    let numSquares = size * size;

    gridContainer.textContent = ``;
    gridContainer.style.cssText = `grid-template-columns: repeat(${size}, 1fr); grid-template-rows: repeat(${size}, 1fr)`;

    for (i = 0; i < numSquares; i++) {
        div = document.createElement('div');
        div.classList.add('gridSquare');
        gridContainer.appendChild(div);
    }

    let allDivs = document.querySelectorAll('.gridSquare')
    allDivs.forEach(div => div.addEventListener('mouseover', selectSquare));
}

function resetGrid() {
    gridSize = parseInt(prompt("What grid size would you like? 1-100", gridSize));
    if (!Number.isInteger(gridSize) || gridSize <= 0 || gridSize > 100) {
        alert('Please pick a whole number between 1 and 100.');
        return;
    } else {
        drawGrid(gridSize);
    }
}

resetButton.addEventListener('click', resetGrid);