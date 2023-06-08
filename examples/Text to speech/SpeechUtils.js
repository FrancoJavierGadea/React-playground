

export function getVoices(lang = ''){

    return new Promise((resolve, reject) => {
    
        const ID = setInterval(() => {
        
            const voices = speechSynthesis.getVoices();

            if(voices.length > 0){

                clearInterval(ID);
                resolve(voices.filter(voice => voice.lang.includes(lang)));
            }
            
        }, 10);
    });
}