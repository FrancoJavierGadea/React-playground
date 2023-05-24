//Fuente: Franks laboratory https://www.youtube.com/watch?v=HeT-5RZgEQY


function getSymbol(value){

    switch(true){
        case value > 250: return '@';
        case value > 240: return 'a';
        case value > 220: return '+';
        case value > 200: return 'b';
        case value > 180: return '#';
        case value > 160: return 'c';
        case value > 140: return '%';
        case value > 120: return 'X';
        case value > 100: return '&';
        case value > 80: return 'e';
        case value > 60: return '*';
        case value > 40: return '/';
        default: return '';
    }
}


export function Animation(width, height, image, options, resolution = 5){

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');

    drawImage(ctx, image, options);


    const ImageData = ctx.getImageData(0, 0, width, height);

    const map = [];

    for(let y = 0; y < ImageData.height; y += resolution){


        for(let x = 0; x < ImageData.width; x += resolution){

            let R = ImageData.data[(y * 4 * ImageData.width) + (x * 4)];
            let G = ImageData.data[(y * 4 * ImageData.width) + (x * 4 + 1)];
            let B = ImageData.data[(y * 4 * ImageData.width) + (x * 4 + 2)];
            let A = ImageData.data[(y * 4 * ImageData.width) + (x * 4 + 3)];

            if(A > 128){

                const total = R + G + B;
                const averageColorValue = total / 3; 

                map.push({ 
                    x, 
                    y,
                    color: `rgb(${R}, ${G}, ${B})`,
                    averageColorValue,
                    text: getSymbol(averageColorValue) 
                });
            }
        }
    }


    return {

        draw: (ctx, opt = {}) => {

            const {showImage, drawAscii = true, drawParticles} = opt;

            if(showImage){

                drawImage(ctx, image, options);
            }

            map.forEach((cell, i) => {
            
                const {x, y, text, color} = cell;

                if(drawParticles){

                    ctx.fillStyle = color;

                    let factor = 0.9;//<---

                    ctx.fillRect(x, y, resolution * factor, resolution * factor);
                }

                if(drawAscii){

                    ctx.font = `${resolution * 1.2}px Verdana`

                    ctx.fillStyle = getColorWithOpacity('#ffffff', .9);    
                    ctx.fillText(text, x + 1, y + 1);

                    ctx.fillStyle = color;    
                    ctx.fillText(text, x, y);
                }

            });
        }
    }
}