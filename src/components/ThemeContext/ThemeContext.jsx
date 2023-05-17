import { useCallback, useEffect, useMemo, useState } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";



export const THEMES = {
    DARK: 'dark',
    LIGHT: 'light'
}

function ThemeProvider({children}) {

    const [theme, setTheme] = useState(THEMES.DARK);

    useEffect(() => {

        const query = window.matchMedia('(prefers-color-scheme: dark)');


        setTheme(query.matches ? THEMES.DARK : THEMES.LIGHT);


        const listener = (e) => {

            setTheme(query.matches ? THEMES.DARK : THEMES.LIGHT);
        }

        query.addEventListener('change', listener);

        return () => {

            query.removeEventListener('change', listener);
        }

    }, []);

    useEffect(() => {

        document.documentElement.setAttribute('data-bs-theme', theme);
        
    }, [theme]);


    const changeTheme = useCallback(() => {

        setTheme(theme => {

            return theme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK;
        });

    }, []);


    const isDark = useMemo(() => {

        return theme === THEMES.DARK;

    }, [theme]);


    const isLight = useMemo(() => {

        return theme === THEMES.LIGHT;
        
    }, [theme]);


    return (<StyledThemeProvider theme={{theme, changeTheme, isDark, isLight}}>
        {children}
    </StyledThemeProvider>);
}

export default ThemeProvider;