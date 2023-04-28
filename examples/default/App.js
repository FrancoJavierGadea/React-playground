import { useState } from "react";

function App(){

    const [count, setCount] = useState(0);

    const increment = () => setCount(old => ++old);

    const decrement = () => setCount(old => --old);
    
    return (<div>

        <h1 className="text-center">Hello React</h1>
        
        <h2 className="text-center">{count}</h2>

        <div className="d-flex justify-content-center">
            <button className="btn btn-primary mx-2" onClick={increment}></button>
            <button className="btn btn-primary mx-2" onClick={decrement}></button>
        </div>

    </div>);
}