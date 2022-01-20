const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const api = require('./api');

const app = express();
app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(morgan('combined'));

app.use('/', express.static(`${__dirname}/../public/pages`));
app.use('/assets', express.static(`${__dirname}/../public/assets`));
app.use('/lib/pixi', express.static(`${__dirname}/../node_modules/@pixi/app/dist/browser`));
app.use('/api', api);

app.listen(3001, () => {
  console.log('listening on port 3001');
});