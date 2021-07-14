class NewCell {
    constructor() {
        this._biomSelect = document.getElementById('select');
        this._biomSelect.addEventListener('click', this._onClickSelectBiom.bind(this));
        this._canvas = document.getElementById('field');
        this._canvas.addEventListener('click', this._onClickCanvas.bind(this));
        this._start = document.getElementById('start');
        this._start.addEventListener('click', this._StartGame.bind(this));
        this._generation = document.getElementById('generation');
        this._generation.addEventListener('click', this._RandomFilling.bind(this));
        this._restart = document.getElementById('restart');
        this._restart.addEventListener('click', this._RestartGame.bind(this));
        this._pause = document.getElementById('pause');
        this._pause.addEventListener('click', this._PauseGame.bind(this));
        this._ctx = this._canvas.getContext('2d');
        this._cellX = 75;
        this._cellY = 45;
        this._cageSize = 10;
        this._fieldWidht = this._cellX * this._cageSize;
        this._fieldHeight = this._cellY * this._cageSize;
        this._arrayYears = this._CreateArray(this._cellY + 2, this._cellX + 2);
        this._isIntervalStarted = true;
        this._cycle = document.getElementById('count');
        this._numberCycle = 0;
        this._started = true;
        this._intervalTame = 200;
        this._type = ["Sand", "Forest", "Ocean"];
        this._old = [10, 8, 6]; //для песка
        this._numberBiom = 0; //для песка
        this._counter = 0;
        this._hibbitatCounter = 0;
    }
    _onClickSelectBiom() {
        this._biom = this._biomSelect.value;
        if (this._biom === this._type[0]) {
            this._old = [10, 8, 6]; //для песка
            this._numberBiom = 0; //для песка
            this._canvas.style.backgroundColor = 'burlywood';
        }
        if (this._biom === this._type[1]) {
            this._old = [8, 10, 8]; //для леса
            this._numberBiom = 1; //для леса
            this._canvas.style.backgroundColor = 'lightgreen';
        }
        if (this._biom === this._type[2]) {
            this._old = [5, 7, 10]; //для воды
            this._numberBiom = 2; //для воды
            this._canvas.style.backgroundColor = 'lightskyblue';
        }
    }
    _onClickCanvas(event) {
        const x = event.offsetX;
        const y = event.offsetY;
        this._randomCell = Math.floor(Math.random() * this._type.length);
        this._arrayYears[Math.floor(y / this._cageSize) + 1][Math.floor(x / this._cageSize) + 1] = new Cell(this._type[this._randomCell], this._old[this._randomCell]);
        this._ctx.fillStyle = this._arrayYears[Math.floor(y / this._cageSize) + 1][Math.floor(x / this._cageSize) + 1].getArrayColors()[0];
        this._drawPoint(Math.floor(x / this._cageSize), Math.floor(y / this._cageSize));
    }
    _LifeCell() {
        let newArray = this._CreateArray(this._cellY + 2, this._cellX + 2);
        for (let i = 1; i < this._arrayYears.length - 1; i++) {
            for (let j = 1; j < this._arrayYears[i].length - 1; j++) {
                this._Counter(i, j);
                if ((this._arrayYears[i][j] === undefined) && (this._counter === 3)) {
                    if (this._hibbitatCounter > 1)
                        newArray[i][j] = new Cell(this._type[this._numberBiom], this._old[this._numberBiom]);
                    else {
                        this._randomCell = Math.floor(Math.random() * this._type.length);
                        newArray[i][j] = new Cell(this._type[this._randomCell], this._old[this._randomCell]);
                    }
                }
                if ((this._arrayYears[i][j]) && ((this._counter > 1) && (this._counter < 4))) {
                    if (this._arrayYears[i][j].years < this._arrayYears[i][j].yearsOfLive) {
                        this._arrayYears[i][j].years += 1;
                        newArray[i][j] = this._arrayYears[i][j];
                    }
                    else
                        newArray[i][j] = undefined;
                }
                this._counter = 0;
                this._hibbitatCounter = 0;
            }
        }
        return newArray;
    }
    _drawField() {
        for (let i = 1; i < this._arrayYears.length - 1; i++) {
            for (let j = 1; j < this._arrayYears[i].length - 1; j++) {
                if (this._arrayYears[i][j]) {
                    this._ctx.fillStyle = this._arrayYears[i][j].getArrayColors()[this._arrayYears[i][j].years];
                    this._drawPoint(j - 1, i - 1);
                }
            }
        }
    }
    _drawPoint(x, y) {
        this._ctx.fillRect(x * this._cageSize, y * this._cageSize, this._cageSize, this._cageSize);
    }
    _StartGame() {
        // let cell: Cell = new Cell('Ocean', 5);
        // cell.yearsOfLive += 1;
        // console.log(cell.getArrayColors().length);
        if (this._started) {
            this._started = false;
            this._isIntervalStarted = true;
            const renewal = setInterval(() => {
                if (this._isIntervalStarted === false) {
                    clearInterval(renewal);
                    return;
                }
                this._numberCycle++;
                this._cycle.textContent = this._numberCycle.toString();
                this._arrayYears = this._LifeCell();
                this._ctx.clearRect(0, 0, this._fieldWidht, this._fieldHeight);
                this._drawField();
            }, this._intervalTame);
        }
    }
    _PauseGame() {
        this._isIntervalStarted = false;
        this._started = true;
    }
    _CreateArray(rows, columns) {
        let x = new Array(rows);
        for (let i = 0; i < rows; i++) {
            let c = new Array(columns);
            for (let i = 0; i < columns; i++) {
                c[i] = undefined;
            }
            x[i] = c;
        }
        return x;
    }
    _RandomFilling() {
        let x;
        let y;
        for (let i = 0; i < ((this._cellX * this._cellY) * 0.2); i++) { // заполняется до 20 процентов поля
            x = Math.floor(Math.random() * this._cellX);
            y = Math.floor(Math.random() * this._cellY);
            this._randomCell = Math.floor(Math.random() * this._type.length);
            this._arrayYears[y + 1][x + 1] = new Cell(this._type[this._randomCell], this._old[this._randomCell]);
            this._ctx.fillStyle = this._arrayYears[y + 1][x + 1].getArrayColors()[0];
            this._drawPoint(x, y);
        }
    }
    _RestartGame() {
        this._isIntervalStarted = false;
        this._ctx.clearRect(0, 0, this._fieldWidht, this._fieldHeight);
        this._arrayYears = this._CreateArray(this._cellY + 2, this._cellX + 2);
        this._numberCycle = 0;
        this._started = true;
        this._cycle.textContent = this._numberCycle.toString();
    }
    _Counter(i, j) {
        if (this._arrayYears[i - 1][j - 1]) {
            this._counter += 1;
            if (this._arrayYears[i - 1][j - 1].getHabitat() === this._type[this._numberBiom])
                this._hibbitatCounter += 1;
        }
        if (this._arrayYears[i - 1][j]) {
            this._counter += 1;
            if (this._type[this._numberBiom] === this._arrayYears[i - 1][j].getHabitat())
                this._hibbitatCounter += 1;
        }
        if (this._arrayYears[i - 1][j + 1]) {
            this._counter += 1;
            if (this._type[this._numberBiom] === this._arrayYears[i - 1][j + 1].getHabitat())
                this._hibbitatCounter += 1;
        }
        if (this._arrayYears[i][j + 1]) {
            this._counter += 1;
            if (this._type[this._numberBiom] === this._arrayYears[i][j + 1].getHabitat())
                this._hibbitatCounter += 1;
        }
        if (this._arrayYears[i + 1][j + 1]) {
            this._counter += 1;
            if (this._type[this._numberBiom] === this._arrayYears[i + 1][j + 1].getHabitat())
                this._hibbitatCounter += 1;
        }
        if (this._arrayYears[i + 1][j]) {
            this._counter += 1;
            if (this._type[this._numberBiom] === this._arrayYears[i + 1][j].getHabitat())
                this._hibbitatCounter += 1;
        }
        if (this._arrayYears[i + 1][j - 1]) {
            this._counter += 1;
            if (this._type[this._numberBiom] === this._arrayYears[i + 1][j - 1].getHabitat())
                this._hibbitatCounter += 1;
        }
        if (this._arrayYears[i][j - 1]) {
            this._counter += 1;
            if (this._type[this._numberBiom] === this._arrayYears[i][j - 1].getHabitat())
                this._hibbitatCounter += 1;
        }
    }
}
const newCell = new NewCell();
class Cell {
    constructor(habitat, yearsOfLive) {
        this.yearsOfLive = yearsOfLive;
        this._habitat = habitat;
        this._ColorCellArray();
        this.years = 0;
    }
    _ColorCellArray() {
        this._arrayColors = new Array(this.yearsOfLive);
        const step = Math.floor(255 / this.yearsOfLive);
        let color = 255;
        if (this._habitat === 'Sand') {
            for (let i = 0; i < this.yearsOfLive; i++) {
                this._arrayColors[i] = `#${color.toString(16).toUpperCase()}0000`;
                color -= step;
            }
        }
        if (this._habitat === 'Forest') {
            for (let i = 0; i < this.yearsOfLive; i++) {
                this._arrayColors[i] = `#00${color.toString(16).toUpperCase()}00`;
                color -= step;
            }
        }
        if (this._habitat === 'Ocean') {
            for (let i = 0; i < this.yearsOfLive; i++) {
                this._arrayColors[i] = `#0000${color.toString(16).toUpperCase()}`;
                color -= step;
            }
        }
    }
    getArrayColors() {
        return this._arrayColors;
    }
    getHabitat() {
        return this._habitat;
    }
}
