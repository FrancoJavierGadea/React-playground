// Read: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/atan2

export function Animation(canvas){

    const ctx = canvas.getContext('2d');

    const center = {
        x: canvas.width / 2,
        y: canvas.height / 2
    }

    const point = {x: 100, y: 100};

    const traslateOrigin = true;//<----------

    const changePosition = (e) => {

        if(e.buttons === 1){

            point.x = e.offsetX;
            point.y = e.offsetY;

            if(traslateOrigin){
                point.x -= center.x;
                point.y -= center.y;
            }
        }
    }

    canvas.addEventListener('mousedown', changePosition);
    canvas.addEventListener('mousemove', changePosition);


    return {

        draw(){

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ctx.save();

            if(traslateOrigin){

                ctx.translate(center.x, center.y);//<----------
            }

            drawAxis(ctx);

            const angle = drawAngle(ctx, point);

            drawLine(ctx, {x: 0, y: 0}, point);

            drawPoint(ctx, {x: 0, y: 0});
            drawPoint(ctx, point, {showCords: true});

            ctx.restore();

            drawText(ctx, `atan2: ${angle} rad`, {
                origin: {x: 5, y: canvas.height - 15}
            });

            drawText(ctx, `atan2: ${angle * 180 / Math.PI} deg`, {
                origin: {x: 5, y: canvas.height - 40}
            });
        }
    }
}