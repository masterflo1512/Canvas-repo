const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');


let isFirstPointSelected = false;
let currentLineStartPointPosition = [];
let lines = [];


class Point {
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }
    getCursorPosition(e) {
        const rect = canvas.getBoundingClientRect()
        x = e.clientX - rect.left;
        y = e.clientY - rect.top;
        return [x, y];
    }
}


class Line {
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }

    
    drawLine() {
        
        let [x, y] = getCursorPosition(e);
        let pointsIntersection = {};
        canvas.addEventListener('click', e =>{
            if (!isFirstPointSelected) {
                isFirstPointSelected = true;
                currentLineStartPointPosition = [x, y];
    
            } else {
            context.beginPath();
            context.moveTo(currentLineStartPointPosition[0], currentLineStartPointPosition[1]);
            context.lineTo(x, y);
            context.lineWidth = 1;
            context.stroke();
            isFirstPointSelected = false;
            
            for (let i = 0; i < lines.length; i++) {
                console.log(lines);
                pointsIntersection = lineIntersect(currentLineStartPointPosition[0], currentLineStartPointPosition[1], x, y, lines[i].x1, lines[i].y1, lines[i].x2, lines[i].y2); 
                drawCircle(pointsIntersection);
                context.strokeStyle = "black";
                context.lineWidth = 1;
            }  
            lines.push({ x1: currentLineStartPointPosition[0], y1: currentLineStartPointPosition[1], x2: x, y2: y });     
        }
    })
    };
}


function drawCircle({x,y}) {
    context.beginPath();
    context.arc(x, y, 5, 0, 2 * Math.PI,false);
    context.lineWidth = 5;
    context.strokeStyle = "red";
    context.stroke();
    context.fill();
}

window.oncontextmenu = function () {
    isFirstPointSelected = false;
}

/*https://gist.github.com/gordonwoodhull/50eb65d2f048789f9558?permalink_comment_id=3393373*/

var eps = 0.0000001;
function between(a, b, c) {
    return a-eps <= b && b <= c+eps;
}

function lineIntersect(x1, y1, x2, y2, x3, y3, x4, y4) {   
    var x=((x1*y2-y1*x2)*(x3-x4)-(x1-x2)*(x3*y4-y3*x4)) /
            ((x1-x2)*(y3-y4)-(y1-y2)*(x3-x4));
    var y=((x1*y2-y1*x2)*(y3-y4)-(y1-y2)*(x3*y4-y3*x4)) /
            ((x1-x2)*(y3-y4)-(y1-y2)*(x3-x4));
    if (isNaN(x)||isNaN(y)) {
        return false;
    } else {
        if (x1>=x2) {
            if (!between(x2, x, x1)) {return false;}
        } else {
            if (!between(x1, x, x2)) {return false;}
        }
        if (y1>=y2) {
            if (!between(y2, y, y1)) {return false;}
        } else {
            if (!between(y1, y, y2)) {return false;}
        }
        if (x3>=x4) {
            if (!between(x4, x, x3)) {return false;}
        } else {
            if (!between(x3, x, x4)) {return false;}
        }
        if (y3>=y4) {
            if (!between(y4, y, y3)) {return false;}
        } else {
            if (!between(y3, y, y4)) {return false;}
        }
    }
    return {x: x, y: y};
}

document.getElementById('collapse').addEventListener('click', () =>{
    context.clearRect(0, 0, canvas.width, canvas.height);
})
