import { useState, useEffect } from "react";
import { RoughNotation } from "react-rough-notation";

const TURNS = { X: 'X', O: 'O' };

function App(){

    const [board, setBoard] = useState(Array.from({length: 9}).fill(null));

    const [turn, setTurn] = useState(TURNS.X);

    const [gameover, setGameover] = useState(false);

    const [winner, setWinner] = useState(null);

    const [counter, setCounter] = useState({[TURNS.X]: 0, [TURNS.O]: 0});

    const reset = () => {

        setBoard(Array.from({length: 9}));
        setGameover(false);
        setWinner(null);
        setTurn(old => old === TURNS.X ? TURNS.O : TURNS.X);
    }

    useEffect(() => {
        
        if(board.some(value => !value)){

            const result = checkWin(board);

            if(result.win){

                setGameover(true);
                setWinner(result.winner);
            }

            setTurn(old => old === TURNS.X ? TURNS.O : TURNS.X);
        }
        else {

            setGameover(true);
        } 

    }, [board]);

    useEffect(() => {
        
        if(gameover){

            setTimeout(() => reset(), 2500);
        }

    }, [gameover]);

    useEffect(() => {
        
        if(winner){

            setCounter(old => {

                const aux = {...old};

                aux[winner]++;

                return aux;
            })
        }
    }, [winner]);


    const play = (i) => {

        setBoard(old => {

            const aux = [...old];
            
            aux[i] = turn;

            return aux;
        });
    }
    
    return (<div className="flow-root h-screen bg-gray-800">

        <div className="w-[350px] h-[40px] mt-5 mx-auto bg-blue-600 flex justify-between">

            <h2 className="flex items-center border-r-2 border-r-gray-800 px-2 text-xl">{counter[TURNS.X]}</h2>

            <div className={`flex items-center grow border-r border-r-gray-800 ${turn === TURNS.X ? 'bg-gray-100' : 'bg-gray-600'}`}>
                <RoughNotation type="crossed-off" color="#f41c1c" strokeWidth={2} show className="block h-[15px] w-[15px] mx-auto"/>
            </div>
            
            <div className={`flex items-center grow border-l border-l-gray-800 ${turn === TURNS.O ? 'bg-gray-100' : 'bg-gray-600'}`}>
                <RoughNotation type="circle" color="#0bd512" strokeWidth={2} show className="block h-[15px] w-[15px] mx-auto"/>
            </div>

            <h2 className="flex items-center border-l-2 border-l-gray-800 px-2 text-xl">{counter[TURNS.O]}</h2>    
        </div>

        <div className="w-[350px] mt-5 mx-auto grid gap-1 grid-cols-3 grid-rows-3">
            {
                board.map((value, i) => {

                    return <div className="p-1 w-full h-[100px] bg-slate-500 flex justify-center items-center" onClick={() => play(i)} key={`cell-${i}`}>

                        { value === TURNS.X && <RoughNotation type="crossed-off" color="#f41c1c" strokeWidth={2} show className="block h-[50px] w-[50px]"/> }

                        { value === TURNS.O && <RoughNotation type="circle" color="#0bd512" strokeWidth={2} show className="block h-[50px] w-[50px]"/> }
                    
                    </div>
                })
            }
        </div>     

    </div>);
}