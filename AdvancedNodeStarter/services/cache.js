const mongoose = require('mongoose');

const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.exec = function() {
  console.log('Im About to run a query');

  //Esse apply serve para executar nossa funcao original
  //a da linha 3, pois quando chamar o eec no código
  //vai executar meu console.log e depois a funcao original do mongoose
  return exec.apply(this, arguments);
}