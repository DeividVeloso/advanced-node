const crypto = require('crypto');
const https = require('https');
const fs = require('fs');

const startDate = Date.now();

function doRequest() {
  https.request('https://www.google.com', resp => {

    resp.on('data', () => { });

    resp.on('end', () => {
      console.log("REQUEST: ", Date.now() - startDate);
    });
  }).end()
}

function doHash() {
  crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
    console.log('HASH: ', Date.now() - startDate);
  });
}

doRequest();

fs.readFile('multitask.js', 'utf-8', () => {
  console.log('FS: ', Date.now() - startDate);
})

doHash();
doHash();
doHash();
doHash();