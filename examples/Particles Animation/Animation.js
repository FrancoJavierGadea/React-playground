//Source: Franks laboratory https://www.youtube.com/watch?v=5dIbK0auaB8


const NUM_PARTICLES = 100;

function getColorWithOpacity(color = '', opacity = 1){

    if(opacity >= 1) return color;
  
    const hexOpacity = Math.floor(opacity * 255).toString(16);
    
    return `${color}${hexOpacity}`;
}

class Particle {

    constructor(origin, radius){

        this.radius = radius;

        this.x = origin.x;
        this.y = origin.y;
        this.origin = origin;

        this.vx = Math.random() * 4 - 2;
        this.vy = Math.random() * 4 - 2;
    }

    update(width, height){

        this.x += this.vx;
        this.y += this.vy;

        if(this.x > width - this.radius || this.x < this.radius){

            this.vx *= -1;
        }

        if(this.y > height - this.radius || this.y < this.radius){

            this.vy *= -1;
        }

    }

    drawOrigin(ctx, color = '#000'){

        ctx.fillStyle = color;

        ctx.fillRect(this.x, this.y, 1, 1);  
    }

    draw(ctx, color){

        ctx.fillStyle = color || `hsl(${this.x * 0.5}, 90%, 43%)`;
        ctx.strokeStyle = '#fff'

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.closePath();
        
        ctx.fill();
        ctx.stroke();
    }
}

function Amination(width, height){

    const particles = Array.from({length: NUM_PARTICLES});

    for (let i = 0; i < particles.length; i++) {
    
        const radius = Math.random() * 20 + 5;

        particles[i] = new Particle({

            x: radius + Math.random() * (width - radius * 2),

            y: radius + Math.random() * (height - radius * 2)

        }, radius); 
    }

    return {
        draw: (ctx, color) => {

            particles.forEach(particle => {

                particle.draw(ctx, color);

                //particle.drawOrigin(ctx);//<--

                particle.update(width, height);
            });
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