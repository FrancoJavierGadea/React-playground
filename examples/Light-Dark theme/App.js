

function App(){

    const {changeTheme, isLight} = useTheme();
    
    return (<div>

        <div class="Theme-switch form-check form-switch">
            <label class="form-check-label" for="theme-sw">Theme Switch</label>
            <input class="form-check-input" type="checkbox" role="switch" id="theme-sw"
            
                checked={isLight} onClick={changeTheme} title={isLight ? 'Activar modo oscuro' : 'Activar modo claro'}
            />
        </div>

    </div>);
}