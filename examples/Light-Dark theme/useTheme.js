import { useState, useEffect, useMemo } from "react";

export const THEMES = {
    DARK: 'dark',
    LIGHT: 'light'
}

export function useTheme(){

    const [theme, setTheme] = useState(THEMES.DARK);

    useEffect(() => {

        const query = window.matchMedia('(prefers-color-scheme: dark)');

        const listener = (e) => {

            setTheme(query.matches ? THEMES.DARK : THEMES.LIGHT);
        }

        listener();

        query.addEventListener('change', listener);

        return () => {

            query.removeEventListener('change', listener);
        }

    }, []);

    useEffect(() => {

        document.documentElement.setAttribute('data-bs-theme', theme);
        
    }, [theme]);


    const changeTheme = () => {

        setTheme(theme => {

            return theme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK;
        });
    }

    const isDark = useMemo(() => {

        return theme === THEMES.DARK;

    }, [theme]);


    const isLight = useMemo(() => {

        return theme === THEMES.LIGHT;
        
    }, [theme]);  

    return {theme, changeTheme, isDark, isLight} 
}