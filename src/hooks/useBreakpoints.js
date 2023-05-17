import { useEffect, useState } from "react";


export const MIN_WIDTH = {
    'sm': '(min-width: 576px)',
    'md': '(min-width: 768px)',
    'lg': '(min-width: 992px)',
    'xl': '(min-width: 1200px)',
    'xxl': '(min-width: 1400px)'
}

export const MAX_WIDTH = {
    'sm': '(max-width: 576px)',
    'md': '(max-width: 768px)',
    'lg': '(max-width: 992px)',
    'xl': '(max-width: 1200px)',
    'xxl': '(max-width: 1400px)'
}

function useBreakPoints(breakPoint) {

    const [value, setValue] = useState(false);

    useEffect(() => {

        const query = window.matchMedia(breakPoint);

        setValue(query.matches);
        
        const listener = (e) => {
            
            setValue(e.matches);
        }

        query.addEventListener('change', listener);
        
        return () => {

            query.removeEventListener('change', listener);
        }

    }, []);

 
    return [value];
}

export default useBreakPoints;