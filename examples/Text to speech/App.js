import { useEffect, useState } from "react";

function App(){

    const [voices, setVoices] = useState([]);

    const [currentVoice, setcurrentVoice] = useState(null);

    useEffect(() => {
        
        getVoices('es')
        .then(voices => {

            setVoices(voices);
            setcurrentVoice(voices[0]);
        });        

    }, []);

    const [text, setText] = useState('React es asombroso');

    useEffect(() => {
        
        let ID = setTimeout(() => {
        
            const utterance = new SpeechSynthesisUtterance(text);

            utterance.voice = currentVoice;

            speechSynthesis.speak(utterance);

        }, 1000);
        
        return () => {

            clearTimeout(ID);
        }
    
    }, [text, currentVoice]);
    
    return (<div>

        <select value={voices.indexOf(currentVoice)} onChange={(e) => setcurrentVoice(voices[+e.target.value])}>
            {
                voices.map((voice, i) => {

                    return <option value={i} key={voice.voiceURI}>{voice.name}</option>
                })
            }
        </select>

        <textarea rows="10" value={text} onChange={(e) => setText(e.currentTarget.value)} />

    </div>);
}