
export function drawAxis(ctx, opt = {}){

    const {width = ctx.canvas.width, height = ctx.canvas.height, color, origin = {x: 0, y: 0}} = opt;

    const axisX = new Path2D();

    axisX.moveTo(origin.x - (width / 2), origin.y);
    axisX.lineTo(origin.x + (width / 2), origin.y);

    const axisY = new Path2D();

    axisY.moveTo(origin.x, origin.y - (height/ 2));
    axisY.lineTo(origin.x, origin.y + (height / 2));

    ctx.save();

    ctx.lineWidth = 2;
    ctx.setLineDash([5]);
    ctx.strokeStyle = color || '#fff';

    ctx.stroke(axisX);
    ctx.stroke(axisY);

    ctx.restore();
}


export function drawPoint(ctx, point, opt = {}){

    const {radius = 7, color, showCords} = opt;

    const path = new Path2D();

    path.arc(point.x, point.y, radius, 0, Math.PI * 2)

    ctx.save();

    ctx.fillStyle = color || '#9f1546';
    ctx.fill(path);

    if(showCords){

        drawText(ctx, `{${point.x}, ${point.y}}`, {

            origin: {
                x: point.x + 10,
                y: point.y
            }
        })
    }

    ctx.restore();
}


export function drawLine(ctx, pointA, pointB, color = '#66efa3'){

    const path = new Path2D();

    path.moveTo(pointA.x, pointA.y);

    path.lineTo(pointB.x, pointB.y);

    ctx.save();

    ctx.lineWidth = 2;
    ctx.strokeStyle = color;

    ctx.stroke(path);

    ctx.restore();
}



export function drawAngle(ctx, point, radius = 30, color = '#f91'){

    const angle = Math.atan2(point.y, point.x);

    const path = new Path2D();

    if(point.y > 0){

        path.arc(0, 0, radius, 0, angle);
    }
    else {

        path.arc(0, 0, radius, 0, angle, true);
    }

    ctx.save();

    ctx.lineWidth = 2;
    ctx.strokeStyle = color;

    ctx.stroke(path);

    ctx.restore();

    return angle;
}


export function drawText(ctx, text, opt = {}){

    const {color, fontSize, origin} = opt;

    ctx.fillStyle = color || '#fff';

    ctx.textBaseline = 'middle'
    ctx.font = `${fontSize || 18}px serif`;

    ctx.fillText(text, origin.x, origin.y);
}