const cluster = require('cluster');

//Estou sendo executado a primeira vez em Master Mode?
if(cluster.isMaster) {
  //Cria um child mode e seta o isMaster para false 
  //e chama o index.js novamente.
  cluster.fork();
  cluster.fork();
  cluster.fork();
  cluster.fork();
} else {
  //cluster.isMaster é igual a false
  //Eu sou um child e vou agir como um server
  const express = require('express');
  const app = express();
  
  app.get('/fast', (req, res) => {
    res.send('Super fast');
  });
  
  app.get('/', (req, res) => {
    doWork(5000);
    res.send('Hi there');
  });

  function doWork(duration) {
    const start = Date.now();
    while(Date.now() - start < duration) {}
  }
  
  app.listen(3000);
}

