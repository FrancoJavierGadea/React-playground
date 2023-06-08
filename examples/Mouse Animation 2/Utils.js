
//Distance between 2 points
export function calculateDistance(pointA, pointB){

    const dx = Math.abs(pointA.x - pointB.x);

    const dy = Math.abs(pointA.y - pointB.y);

    const distance = Math.hypot(dx, dy)

    return {
        distance, 
        dx, 
        dy
    };
}


export function getColorWithOpacity(color = '', opacity = 1){

    if(opacity >= 1) return color;
  
    const hexOpacity = Math.floor(opacity * 255).toString(16);
    
    return `${color}${hexOpacity}`;
}