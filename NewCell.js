const canvas = document.getElementById('field');
const ;
this._ctx = this._canvas.getContext('2d');
const ;
this._cellX;
number = 75;
const ;
this._cellY;
number = 45;
const cageSize = 10;
const ;
this._fieldWidht;
number = this._cellX * this._cageSize;
const ;
this._fieldHeight;
number = this._cellY * this._cageSize;
let;
this._arrayYears;
Array < Array < number >> ;
this._CreateArray(this._cellY + 2, this._cellX + 2);
const ;
this._yearCell;
number = 5;
const ;
this._ColorCell;
Array < String > ;
this._ColorCellArray('Sand', this._yearCell);
let;
this._isIntervalStarted;
boolean = true;
let;
this._cycle;
HTMLElement = document.getElementById('count');
let;
this._numberCycle;
number = 0;
let;
this._started;
boolean = true;
const ;
this._intervalTame;
number = 100;
// interface Cell{
//     habitat: String;
//     yearsOfLive: number;
//     arrayColors: Array<String>;
// }
// const sandCellArray: Array<String> = ColorCellArray('Sand', 6); //для клеток, предрасположенных жить в песке
// const sandCell: Cell = {
//     habitat: 'Sand',
//     yearsOfLive: 6,
//     arrayColors: sandCellArray
// };
// const forestCellArray: Array<String> = ColorCellArray('', 5);
// const forestCell: Cell = {
//     habitat: 'Sand',
//     yearsOfLive: 5,
//     arrayColors: forestCellArray
// };
// const typeCell: Array<Cell> = [sandCell, sandCell]; 
this._canvas.onclick = function (event) {
    const x = event.offsetX;
    const y = event.offsetY;
    this._arrayYears[Math.floor(y / this._cageSize) + 1][Math.floor(x / this._cageSize) + 1] = 1;
    this._ctx.fillStyle = this._ColorCell[0];
    this._drawPoint(Math.floor(x / this._cageSize), Math.floor(y / this._cageSize));
};
function () { }
this._LifeCell();
Array < Array < number >> {
    let, newArray: Array < Array < number >> , this: ._CreateArray(this._cellY + 2, this._cellX + 2),
    let, counter: number,
    : ._arrayYears.length - 1, i
}++;
{
    for (let j = 1; j < this._arrayYears[i].length - 1; j++) {
        counter = this._Counter(i, j);
        if ((this._arrayYears[i][j] === 0) && (counter === 3))
            newArray[i][j] = 1;
        if ((this._arrayYears[i][j] > 0) && ((counter > 1) && (counter < 4))) {
            //for(let i: number=1; i < yearCell; i++){
            newArray[i][j] = this._arrayYears[i][j] < this._yearCell ? this._arrayYears[i][j] += 1 : 0;
            //if(array[i][j] === i) newArray[i][j] = i+1;
            //} 
            //if(array[i][j] === yearCell) newArray[i][j] = 0;
        }
    }
}
return newArray;
function () { }
this._drawField();
void {
    : ._arrayYears.length - 1, i
}++;
{
    for (let j = 1; j < this._arrayYears[i].length - 1; j++) {
        if (this._arrayYears[i][j] > 0) {
            this._ctx.fillStyle = this._ColorCell[this._arrayYears[i][j] - 1];
            this._drawPoint(j - 1, i - 1);
        }
    }
}
function () { }
this._drawPoint(x, number, y, number);
void {
    ctx: this._ctx.fillRect(x * this._cageSize, y * this._cageSize, this._cageSize, this._cageSize)
};
function StartGame() {
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
function PauseGame() {
    this._isIntervalStarted = false;
    this._started = true;
}
function () { }
this._CreateArray(rows, number, columns, number);
Array < Array < number >> {
    let, x = new Array(rows),
    for(let, i = 0, i, , rows, i) { }
}++;
{
    let c = new Array(columns);
    for (let i = 0; i < columns; i++) {
        c[i] = 0;
    }
    x[i] = c;
}
return x;
function RandomFilling() {
    let r;
    let x;
    let y;
    for (let i = 0; i < ((this._cellX * this._cellY) * 0.2); i++) { // заполняется до 20 процентов поля
        x = Math.floor(Math.random() * this._cellX);
        y = Math.floor(Math.random() * this._cellY);
        this._arrayYears[y + 1][x + 1] = 1;
        this._ctx.fillStyle = this._ColorCell[0];
        this._drawPoint(x, y);
    }
}
function RestartGame() {
    this._isIntervalStarted = false;
    this._ctx.clearRect(0, 0, this._fieldWidht, this._fieldHeight);
    this._arrayYears = this._CreateArray(this._cellY + 2, this._cellX + 2);
    this._numberCycle = 0;
    this._started = true;
    this._cycle.textContent = this._numberCycle.toString();
}
function () { }
this._ColorCellArray(habitat, String, this._yearCell, number);
Array < String > {
    let, arr: Array < String > , new: Array(this._yearCell),
    const: step, number = Math.floor(255 / this._yearCell) - 30,
    let, color = 255
}++;
{
    if (habitat === 'Sand') {
        arr[i] = `#0000${color.toString(16).toUpperCase()}`;
        color -= step;
    }
}
return arr;
function () { }
this._Counter(i, number, j, number);
number;
{
    let count = 0;
    if (this._arrayYears[i - 1][j - 1])
        count += 1;
    if (this._arrayYears[i - 1][j])
        count += 1;
    if (this._arrayYears[i - 1][j + 1])
        count += 1;
    if (this._arrayYears[i][j + 1])
        count += 1;
    if (this._arrayYears[i + 1][j + 1])
        count += 1;
    if (this._arrayYears[i + 1][j])
        count += 1;
    if (this._arrayYears[i + 1][j - 1])
        count += 1;
    if (this._arrayYears[i][j - 1])
        count += 1;
    return count;
}
