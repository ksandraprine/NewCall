const canvas = document.getElementById('field');
const ctx = canvas.getContext('2d');
let array = CreateArray(47, 77);
let interval = true;
let cycle = document.getElementById('count');
let numberCycle = 0;
let started = true;
canvas.onclick = function (event) {
    const x = event.offsetX;
    const y = event.offsetY;
    drawField(Math.floor(x / 10), Math.floor(y / 10));
    array[Math.floor(y / 10) + 1][Math.floor(x / 10) + 1] = true;
};
function Counter(i, j) {
    let count = 0;
    if (array[i - 1][j - 1] === true)
        count += 1;
    if (array[i - 1][j] === true)
        count += 1;
    if (array[i - 1][j + 1] === true)
        count += 1;
    if (array[i][j + 1] === true)
        count += 1;
    if (array[i + 1][j + 1] === true)
        count += 1;
    if (array[i + 1][j] === true)
        count += 1;
    if (array[i + 1][j - 1] === true)
        count += 1;
    if (array[i][j - 1] === true)
        count += 1;
    return count;
}
function LifeCell() {
    let newArray = CreateArray(47, 77);
    let counter;
    for (let i = 1; i < 46; i++) {
        for (let j = 1; j < 76; j++) {
            counter = Counter(i, j);
            if ((array[i][j] === false) && (counter === 3))
                newArray[i][j] = true;
            if ((array[i][j] === true) && ((counter > 1) && (counter < 4)))
                newArray[i][j] = true;
        }
    }
    return newArray;
}
function Print() {
    for (let i = 1; i < 46; i++) {
        for (let j = 1; j < 76; j++) {
            if (array[i][j] === true)
                drawField(j - 1, i - 1);
        }
    }
}
function drawField(x, y) {
    //ctx.clearRect(0, 0, 500, 300);
    ctx.fillRect(x * 10, y * 10, 10, 10);
}
function StartGame() {
    if (started) {
        started = false;
        if (interval === true)
            RandomFilling();
        interval = true;
        const renewal = setInterval(() => {
            if (interval === false) {
                clearInterval(renewal);
                return;
            }
            numberCycle++;
            cycle.textContent = numberCycle.toString();
            array = LifeCell();
            ctx.clearRect(0, 0, 750, 450);
            Print();
        }, 200);
    }
}
function PauseGame() {
    interval = false;
    started = true;
}
function CreateArray(rows, columns) {
    let x = new Array(rows);
    for (let i = 0; i < rows; i++) {
        let c = new Array(columns);
        for (let i = 0; i < columns; i++) {
            c[i] = false;
        }
        x[i] = c;
    }
    return x;
}
function RandomFilling() {
    let r;
    let x;
    let y;
    for (let i = 0; i < 675; i++) {
        x = Math.floor(Math.random() * 75);
        y = Math.floor(Math.random() * 45);
        array[y + 1][x + 1] = true;
        drawField(x, y);
    }
}
function RestartGame() {
    interval = false;
    ctx.clearRect(0, 0, 750, 450);
    array = CreateArray(47, 77);
    numberCycle = 0;
    started = true;
    cycle.textContent = numberCycle.toString();
    interval = true;
}
