const express = require('express');
const app = express();
const crypto = require('crypto');
const Worker = require('webworker-threads').Worker;

app.get('/', (req, res) => {
  const worker = new Worker(function () {
    this.onmessage = function () {
      let counter = 0;
      while (counter < 1e9) { //1e9 equivalente á 10,000,000,00
        counter++;
      }

      postMessage(counter);
    }
  });

  worker.onmessage = function (myCounter) {
    //Para o WORKER devolver mensagem para nossa aplicação(EventLoop), 
    //vai ser chamada essa função
    console.log(myCounter)
    res.send(myCounter);
  }

  //Usamos esse método para enviar dados(do Event Loop) para dentro no new Worker(function()) 
  worker.postMessage();

});

app.get('/fast', (req, res) => {
  res.send('Super fast');
});

app.listen(3000, function () {
  console.log('Listening in 3000')
});


