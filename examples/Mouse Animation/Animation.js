
const NUM_PARTICLES = 1500;

const RADIUS = 100;

function getColorWithOpacity(color = '', opacity = 1){

    if(opacity >= 1) return color;
  
    const hexOpacity = Math.floor(opacity * 255).toString(16);
    
    return `${color}${hexOpacity}`;
}

class Particle {

    constructor(color, origin){

        this.x = origin.x;
        this.y = origin.y;
        this.origin = origin;

        this.color = color;
        this.size = Math.random()* 3 + 1;

        this.density = Math.random() * 10 + 1;
    }

    update(mouse){

        //Calcular la Distancia entre el Mouse y las Particulas
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;

        const distance = Math.sqrt(dx * dx + dy * dy);

        if(distance < RADIUS){

            //Movimiento
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;

            const force = (RADIUS - distance) / RADIUS;

            const movementX = forceDirectionX * force * this.density;
            const movementY = forceDirectionY * force * this.density;

            if(mouse.press){

                this.x += movementX;
                this.y += movementY;
            }
            else {

                this.x -= movementX;
                this.y -= movementY;
            }
        }
        else {

            if(this.x !== this.origin.x){

                let dx = this.x - this.origin.x;

                this.x -= dx / 10;
            }

            if(this.y !== this.origin.y){

                let dy = this.y - this.origin.y;

                this.y -= dy / 10;
            }
        }
    }

    draw(ctx){

        ctx.fillStyle = this.color;
    
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        
        ctx.fill();
    }
}

function Amination(width, height, color = '#ff0000'){

    const particles = Array.from({length: NUM_PARTICLES});

    for (let i = 0; i < particles.length; i++) {
    
        particles[i] = new Particle(color, {

            x: Math.random() * width,

            y: Math.random() * height
        }); 
    }

    return {
        draw: (ctx, mouse) => {

            particles.forEach(particle => {

                particle.draw(ctx);

                particle.update(mouse);
            });
        },

        drawMouseArea: (ctx, mouse, color = '#6b6b6b', opacity = 1) => {

            ctx.fillStyle = getColorWithOpacity(color, opacity);

            const factor = 0.9;

            ctx.beginPath();
            ctx.ellipse(mouse.x, mouse.y, RADIUS * factor, RADIUS * factor, 0, 0, Math.PI * 2);
            ctx.fill();
        },

        connectParticles: (ctx, maxDistance = 21, color = '#ee7070', withOpacity = false) => {

            for (let i = 0; i < particles.length; i++) {

                for (let j = i; j < particles.length; j++) {
                    
                    const A = particles[i];     const B = particles[j];

                    //Calcular la Distancia entre 2 Particulas
                    const dx = A.x - B.x;
                    const dy = A.y - B.y;

                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if(distance < maxDistance){

                        let opacity = 0.3 + 1 - distance / maxDistance;

                        if(withOpacity){

                            ctx.strokeStyle = getColorWithOpacity(color, opacity);
                        }
                        else {

                            ctx.strokeStyle = color;
                        }

                        ctx.beginPath();
                        ctx.moveTo(A.x, A.y);
                        ctx.lineTo(B.x, B.y);
                        ctx.stroke();
                    }
                }
            }
        }
    }
}