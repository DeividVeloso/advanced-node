process.env.UV_THREADPOOL_SIZE = 2;

const crypto = require('crypto');

//Vai exectar a funcao de callback depois de fazer o hash.

const start = Date.now();
crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
  //Usado para logar quanto tempo demora para fazer o hash
  console.log('1: ', Date.now() - start);
});

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
  //Usado para logar quanto tempo demora para fazer o hash
  console.log('2: ', Date.now() - start);
});

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
  console.log('3: ', Date.now() - start);
});

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
  console.log('4: ', Date.now() - start);
});

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
  console.log('5: ', Date.now() - start);
});