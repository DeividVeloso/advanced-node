const https = require('https');

const startDate = Date.now();
function doRequest() {
  https.request('https://www.google.com', resp => {

    resp.on('data', () => { });

    resp.on('end', () => {
      console.log(Date.now() - startDate);
    });
  }).end()
}

doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();