//Source: Franks laboratory https://www.youtube.com/watch?v=gxagf0WKfBo

const NUM_PARTICLES = 750;

const RADIUS = 200;


class Particle {

    constructor(origin){

        this.x = origin.x;
        this.y = origin.y;
        this.origin = origin;

        this.radius = Math.random()* 7 + 1;


        this.vx = Math.random() * 1 - 0.5;
        this.vy = Math.random() * 1 - 0.5;

        this.pushX = 0;
        this.pushY = 0;
        this.friction = 0.9;
    }

    update(mouse, width, height){

        if(mouse.press){

            //Calcular la Distancia entre el Mouse y las Particulas
            const dx = this.x - mouse.x;
            const dy = this.y - mouse.y;

            const distance = Math.hypot(dx, dy);

            if(distance < RADIUS){

                const force = RADIUS / distance;

                const angle = Math.atan2(dy, dx);

                this.pushX += Math.cos(angle) * force;
                this.pushY += Math.sin(angle) * force;
            }
        }

        this.pushX *= this.friction;
        this.pushY *= this.friction;

        this.x += this.vx + this.pushX;
        this.y += this.vy + this.pushY;
  
        this.dontOutOfCanvas(width, height);
    }

    dontOutOfCanvas(width, height){

        //X axis
        if(this.x < this.radius){

            this.x = this.radius;
            this.vx *= -1;
        }

        if(this.x > width - this.radius){

            this.x = width - this.radius;
            this.vx *= -1;
        }
        //Y axis
        if(this.y < this.radius){

            this.y = this.radius;
            this.vy *= -1
        }

        if(this.y > height - this.radius){

            this.y = height - this.radius;
            this.vy *= -1
        }
    }

    

    draw(ctx, color = '#f61'){

        ctx.fillStyle = color;
    
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.closePath();
        
        ctx.fill();
    }
}

function Amination(width, height){

    const particles = Array.from({length: NUM_PARTICLES});

    for (let i = 0; i < particles.length; i++) {
    
        particles[i] = new Particle({

            x: Math.random() * width,

            y: Math.random() * height
        }); 
    }

    return {
        draw: (ctx, mouse, color) => {

            particles.forEach(particle => {

                particle.draw(ctx, color);

                particle.update(mouse, width, height);
            });
        },

        drawMouseArea: (ctx, mouse, color = '#6b6b6b', opacity = 1) => {

            ctx.fillStyle = getColorWithOpacity(color, opacity);

            ctx.beginPath();
            ctx.ellipse(mouse.x, mouse.y, RADIUS - 15, RADIUS - 15, 0, 0, Math.PI * 2);
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