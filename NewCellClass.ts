class NewCell{
    protected _canvas: any;
    protected _start: any;
    protected _generation: any;
    protected _restart: any;
    protected _pause: any;
    protected _ctx: any;
    protected _cellX: number;
    protected _cellY: number;
    protected _cageSize: number;
    protected _fieldWidht: number;
    protected _fieldHeight: number;
    protected _arrayYears: Array<Array<number>>;
    protected _yearCell: number;
    protected _ColorCell: Array<String>;
    protected _isIntervalStarted:boolean;
    protected _cycle: HTMLElement;
    protected _numberCycle: number;
    protected _started:boolean;
    protected _intervalTame: number;

constructor(){
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
    this._fieldWidht = this._cellX*this._cageSize;
    this._fieldHeight = this._cellY*this._cageSize;
    this._arrayYears = this._CreateArray(this._cellY+2,this._cellX+2);
    this._yearCell = 5;
    this._ColorCell = this._ColorCellArray('Sand', this._yearCell);
    this._isIntervalStarted = true;
    this._cycle = document.getElementById('count');
    this._numberCycle = 0;
    this._started = true;
    this._intervalTame = 100;

}
protected _onClickCanvas(event: any){
    const x = event.offsetX; 
    const y = event.offsetY;
    console.log(Math.floor(y/this._cageSize)+1);
    console.log(Math.floor(x/this._cageSize)+1);
    this._arrayYears[Math.floor(y/this._cageSize)+1][Math.floor(x/this._cageSize)+1] = 1;
    this._ctx.fillStyle = this._ColorCell[0];
    this._drawPoint(Math.floor(x/this._cageSize), Math.floor(y/this._cageSize));
}
protected _LifeCell(): Array<Array<number>>{
    let newArray: Array<Array<number>> = this._CreateArray(this._cellY+2,this._cellX+2);
    let counter: number;
    for (let i=1; i<this._arrayYears.length-1;i++){
        for(let j=1; j<this._arrayYears[i].length-1;j++){
            counter = this._Counter(i,j);
            if((this._arrayYears[i][j] === 0)&&(counter === 3)) newArray[i][j] = 1;
            if((this._arrayYears[i][j] > 0)&&((counter>1)&&(counter<5))) {
                //for(let i: number=1; i < yearCell; i++){
                newArray[i][j] = this._arrayYears[i][j] < this._yearCell ? this._arrayYears[i][j] += 1: 0;
                    //if(array[i][j] === i) newArray[i][j] = i+1;
                //} 
                //if(array[i][j] === yearCell) newArray[i][j] = 0;
            }
        }
    }
   return newArray;
}
protected _drawField(): void{
    for (let i=1; i<this._arrayYears.length-1;i++){
        for(let j=1; j<this._arrayYears[i].length-1;j++){
            if(this._arrayYears[i][j] > 0){
                this._ctx.fillStyle = this._ColorCell[this._arrayYears[i][j]-1];
                this._drawPoint(j-1, i-1);
            } 
        }
    }
}

protected _drawPoint(x: number, y: number):void {
    this._ctx.fillRect(x*this._cageSize, y*this._cageSize, this._cageSize, this._cageSize);
}
protected _StartGame(): void{
if(this._started){
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
            }, this._intervalTame)
        }
    
}
protected _PauseGame():void{
    this._isIntervalStarted = false;
    this._started = true;
}
protected _CreateArray(rows: number,columns: number): Array<Array<number>> {
    let x: Array<Array<number>> = new Array(rows);
    for (let i = 0; i < rows; i++) {
       let c: Array<number> = new Array(columns);
       for(let i = 0; i<columns;i++){
           c[i] = 0;
       }
        x[i] = c;
    }
    return x;
 }
protected _RandomFilling(): void{
     let r;
     let x;
     let y;
     for (let i=0; i<((this._cellX*this._cellY)*0.2); i++){    // заполняется до 20 процентов поля
        x = Math.floor(Math.random() * this._cellX);
        y = Math.floor(Math.random() * this._cellY);
        this._arrayYears[y + 1][x + 1]=1;
        this._ctx.fillStyle = this._ColorCell[0];
        this._drawPoint(x,y);
     }
 }

 protected _RestartGame(): void{
    this._isIntervalStarted = false;
    this._ctx.clearRect(0, 0, this._fieldWidht, this._fieldHeight);
    this._arrayYears = this._CreateArray(this._cellY+2,this._cellX+2);
    this._numberCycle = 0;
    this._started = true;
    this._cycle.textContent = this._numberCycle.toString();
}
protected _ColorCellArray(habitat: String, yearCell: number): Array<String>{
    let arr: Array<String> = new Array(yearCell);
    const step: number = Math.floor(255/ yearCell)-30;
    let color = 255;
    for(let i: number = 0; i<yearCell; i++){
        if(habitat === 'Sand'){
        arr[i] = `#00${color.toString(16).toUpperCase()}00`;
        color -= step;
        }
    }
    return arr;
}
protected _Counter(i: number, j: number): number{
    let count = 0;
    if (this._arrayYears[i-1][j-1]) count += 1; //и тип
    if (this._arrayYears[i-1][j]) count += 1;
    if (this._arrayYears[i-1][j+1]) count += 1;
    if (this._arrayYears[i][j+1]) count += 1;
    if (this._arrayYears[i+1][j+1]) count += 1;
    if (this._arrayYears[i+1][j]) count += 1;
    if (this._arrayYears[i+1][j-1]) count += 1;
    if (this._arrayYears[i][j-1]) count += 1;
    return count;
}
}

const newCell = new NewCell();

class Cell{
    habitat: String;
        yearsOfLive: number;
        arrayColors: Array<String>;
}