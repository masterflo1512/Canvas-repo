
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const collapse = document.getElementById('collapse');

canvas.addEventListener('mousemove', mouseMoveListener);
canvas.addEventListener('click', confirmLine);
collapse.addEventListener('click', () =>{
    setInterval(() => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < lines.length; i++) {

            let {x1,y1,x2,y2} = lines[i];
            let newLine = getShortLine(x1,y1,x2,y2);
            lines[i] = newLine;
            context.beginPath();
            context.strokeStyle =  'red';
            context.moveTo(newLine.x1, newLine.y1);
            context.lineTo(newLine.x2, newLine.y2);
            context.stroke();    
        }
    },10)
    
})

let isFirstPointSelected = false;
let currentLineStartPointPosition = [];
let lines = [];
let pointsIntersection = {};
let intersections = []
context.lineWidth = 5;


function mouseMoveListener(e) {  
    if (isFirstPointSelected) {      
    
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.strokeStyle =  'blue';
        context.beginPath();
        context.moveTo(currentLineStartPointPosition[0], currentLineStartPointPosition[1]);
        console.log(currentLineStartPointPosition[0]);
        context.lineTo(e.offsetX,e.offsetY);
        context.stroke();
        
        for (let i = 0; i < lines.length; i++) {
            let {x1,y1,x2,y2} = lines[i]
            context.beginPath();
            context.strokeStyle =  'red';
            context.moveTo(x1, y1);
            context.lineTo(x2, y2);
            context.stroke();    
        }  
        for (let i = 0; i < intersections.length; i++) {
            drawCircle(intersections[i])
        }  
    }    
}

function confirmLine(e) {
    
    let x = e.offsetX;
    let y = e.offsetY;

    if (!isFirstPointSelected) {
        isFirstPointSelected = true;
        currentLineStartPointPosition = [x, y];    
    } else {
        lines.push({ x1: currentLineStartPointPosition[0], y1: currentLineStartPointPosition[1], x2: x, y2: y });
        isFirstPointSelected = false;
    }
    
    for (let i = 0; i < lines.length; i++) {
        console.log(lines);
        pointsIntersection = lineIntersect(currentLineStartPointPosition[0], currentLineStartPointPosition[1], x, y, lines[i].x1, lines[i].y1, lines[i].x2, lines[i].y2);
        intersections.push(pointsIntersection)
        context.strokeStyle = "black";
        context.lineWidth = 1;
        drawCircle(pointsIntersection)
    }
    

}

function getShortLine(x1,y1,x2,y2) {
    let slope = (y2 - y1) / (x2 - x1);
    let step = 1;
    console.log(slope);
    let x3,y3,x4,y4;
    if(x1>x2) {
        x3 = x2 + step;
        y3 = (x3 - x2) * slope + y2;
        x4 = x1 - step;
        y4 = (x4 - x1) * slope + y1;
    } else {
        x3 = x1 + step;
        y3 = (x3 - x1) * slope + y1;
        x4 = x2 - step;
        y4 = (x4 - x2) * slope + y2;
    }
    return {x1:x3,y1:y3,x2:x4,y2:y4}
}
console.log(getShortLine(1,1,2,5));

function drawCircle({ x, y }) {
    context.beginPath();
    context.arc(x, y, 3, 0, 2 * Math.PI, false);
    context.lineWidth = 1;
    context.strokeStyle = "red";
    context.fillStyle = "red"
    context.stroke();
    context.fill();
}

// /*https://gist.github.com/gordonwoodhull/50eb65d2f048789f9558?permalink_comment_id=3393373*/

var eps = 0.0000001;
function between(a, b, c) {
    return a - eps <= b && b <= c + eps;
}

function lineIntersect(x1, y1, x2, y2, x3, y3, x4, y4) {
    var x = ((x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4)) /
        ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4));
    var y = ((x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4)) /
        ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4));
    if (isNaN(x) || isNaN(y)) {
        return false;
    } else {
        if (x1 >= x2) {
            if (!between(x2, x, x1)) { return false; }
        } else {
            if (!between(x1, x, x2)) { return false; }
        }
        if (y1 >= y2) {
            if (!between(y2, y, y1)) { return false; }
        } else {
            if (!between(y1, y, y2)) { return false; }
        }
        if (x3 >= x4) {
            if (!between(x4, x, x3)) { return false; }
        } else {
            if (!between(x3, x, x4)) { return false; }
        }
        if (y3 >= y4) {
            if (!between(y4, y, y3)) { return false; }
        } else {
            if (!between(y3, y, y4)) { return false; }
        }
    }
    return { x: x, y: y };
}

