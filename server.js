const express = require('express');
const path = require('path');

const port = 5000;
const app = express();

const Sentiment = require('sentiment');

app.use(express.static(path.join(__dirname,'public')));

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'));
});

app.get('/emotion',(req,res)=>{
    const sentiment = new Sentiment();
    const text = req.query.text;
    const score = sentiment.analyze(text);
    res.send(score);
});

app.listen(port,()=>{
    console.log(`Listening on port ${port}!`);
});