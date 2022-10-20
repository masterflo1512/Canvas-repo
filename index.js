const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let points = [];

canvas.addEventListener("click", drawLine);
console.log(canvas.width, canvas.height)
function getCursorPosition(event) {
    const rect = canvas.getBoundingClientRect()
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    console.log(x, y)
    return [x, y]
}

function drawLine(e) {
    ctx.beginPath();
    ctx.moveTo(0, 0)
    ctx.lineTo(getCursorPosition(e)[0],getCursorPosition(e)[1]);
    ctx.stroke();
}

