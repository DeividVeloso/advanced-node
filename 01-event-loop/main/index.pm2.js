const express = require('express');
const app = express();
const crypto = require('crypto');

app.get('/fast', (req, res) => {
  res.send('Super fast');
});

app.get('/', (req, res) => {
  crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
    res.send('Hi there');
  });
});

app.listen(3000, function () {
  console.log('Listening in 3000')
});


