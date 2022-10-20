// const canvas = document.getElementById('canvas');
// const ctx = canvas.getContext('2d');
// let x1;
// let y1;
// let x2;
// let y2;

// let startPosition = [x1, y1];
// let lineCoordinates = [x2, y2];
// let points = [];

// canvas.addEventListener("click", drawLine);
// console.log(canvas.width, canvas.height)
// function getCursorPosition(event) {
//     const rect = canvas.getBoundingClientRect()
//     let x = event.clientX - rect.left;
//     let y = event.clientY - rect.top;
//     console.log(x, y)
//     return [x, y]
// }

// function drawLine(e) {
//     ctx.beginPath();
//     ctx.moveTo(0, 0)
//     ctx.lineTo(getCursorPosition(e)[0],getCursorPosition(e)[1]);
//     ctx.stroke();
// }


const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

let isFirstPointSelected = false;
let position = [];


canvas.addEventListener('click', drawLine);

function getCursorPosition(e) {

    const rect = canvas.getBoundingClientRect()

    x = e.clientX - rect.left;
    y = e.clientY - rect.top;


    return [x, y];
}

function drawLine(e) {

    let [x, y] = getCursorPosition(e);


    if (!isFirstPointSelected) {
        isFirstPointSelected = true;
        position = [x, y];
    } else {
        context.beginPath();
        context.moveTo(position[0], position[1]);
        context.lineTo(x, y);
        context.stroke();
        isFirstPointSelected = false;
    }
    window.oncontextmenu = function () {
        isFirstPointSelected = false;
      }
};

