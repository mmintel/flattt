const express = require('express');
const app = express();
const Flattt = require('@flattt/server').default;
const path = require('path');

(async () => {
  const flattt = new Flattt({
    blueprintsPath: path.resolve(__dirname, './data/blueprints')
  });

  await flattt.init();

  flattt.mount(app, '/admin');

  app.get('/', function (req, res) {
    res.send('Hello World!');
  });

  app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
  });
})()