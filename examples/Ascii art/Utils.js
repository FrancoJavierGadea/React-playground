export function drawImage(ctx, image, options = {}){

    let { x = 0, y = 0, width = image.width, height = image.height, border, center } = options;


    const scaleX = width / image.width;

    const scaleY = height / image.height;

    const scale = Math.min(scaleX, scaleY);


    if(center){

        x = (ctx.canvas.width / 2) - (image.width * scale / 2);

        y = (ctx.canvas.height / 2) - (image.height * scale / 2);
    }


    ctx.save();

    ctx.drawImage(image, x, y, image.width * scale, image.height * scale);

    if(border){

        ctx.strokeStyle = border;

        ctx.strokeRect(x, y, width, height);
    }

    ctx.restore();
}

export function getColorWithOpacity(color = '', opacity = 1){

    if(opacity >= 1) return color;
  
    const hexOpacity = Math.floor(opacity * 255).toString(16);
    
    return `${color}${hexOpacity}`;
}