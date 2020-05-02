import e, { response } from "express";

document.addEventListener('DOMContentLoaded', speechToEmotion, false);

const recognition = new webkitSpeechRecognition();

recognition.lang = 'en-US';
recognition.continuous = true;

recognition.onresult = (event)=>{
    const results = event.results;
    const transcript = results[results.length-1][0].transcript;

    fetch(`/emotion?text=${transcript}`)
      .then((response)=>response.json())
      .then((result)=>{
        console.log('result ->', result);
      })
      .catch((e)=>{
        console.error('Request error -> ', e);
      });
};
recognition.onend = ()=> {
    console.log('disconnected');
};
recognition.start();

function speechToEmotion() {
  // Web Speech API section code will be added here
}