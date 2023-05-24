const numbers = '0123456789';

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';

const ALPHABET = numbers + letters + katakana;

const getRamdomCharacter = () => ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));


class Letter {

    #updateChar = true;

    constructor(fontSize, origin){

        this.fontSize = fontSize;

        this.x = origin.x;
        this.y = origin.y;
        this.origin = origin

        this.speed = Math.random() + 0.5;

        this.char = getRamdomCharacter();
    }

    update(height){

        if(this.y * this.fontSize > height && Math.random() > 0.975 ){

            this.y = this.origin.y;
        }
        else {

            this.y += this.speed;
        }

        this.updateCharacter();
    }

    updateCharacter(){

        if(this.#updateChar){

            this.#updateChar = false;

            setTimeout(() => {

                this.char = getRamdomCharacter();
                this.#updateChar = true;

            }, 1000/30);
        }      
    }

    draw(ctx, color){

        ctx.fillStyle = color;
        
        ctx.font = `${this.fontSize}px monospace`;

        ctx.fillText(this.char, this.x * this.fontSize, this.y * this.fontSize);
    }
}


export function MatrixAnimation(width, fontSize = 18){

    const columns = Math.round(width / fontSize);

    const particles = Array.from({length: columns});

    for (let i = 0; i < particles.length; i++) {
    
        particles[i] = new Letter(fontSize, { x: i, y: 0 }); 
    }

    return {
        draw: (canvas, color = '#fff') => {

            const ctx = canvas.getContext('2d');

            ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            particles.forEach(particle => {

                particle.draw(ctx, color);

                particle.update(canvas.height);
            });
        }
    }
}

