// import e from "express";
// import  response from 'express';

document.addEventListener('DOMContentLoaded', speechToEmotion, false);
function speechToEmotion() {
    const recognition = new webkitSpeechRecognition();

    recognition.lang = 'en-US';
    recognition.continuous = true;

    const setEmoji = (type) =>  {
        const emojiElem = document.querySelector('.emoji img');
        emojiElem.classList = type;
    };

    recognition.onresult = (event)=>{
        const results = event.results;
        const transcript = results[results.length-1][0].transcript;

        fetch(`/emotion?text=${transcript}`)
        .then((response)=>response.json())
        .then((result) => {
            if (result.score > 0) {
            setEmoji('positive');
            } else if (result.score < 0) {
            setEmoji('negative');
            } else {
            setEmoji('listening');
            }
        })
        .catch((e)=>{
            console.error('Request error -> ', e);
            recognition.abort();
        });
    };
    recognition.onend = ()=> {
        console.log('disconnected');
    };
    recognition.onerror = (event) => {
        console.error('Recognition error -> ', event.error);
        setEmoji('error')
    };

    recognition.onaudiostart = ()=> {
        setEmoji('listening');
    };

    recognition.onend = ()=> {
        setEmoji('idle');
    };

    recognition.start();
}