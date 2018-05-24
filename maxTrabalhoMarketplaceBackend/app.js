/*
  Autor: Gabriel Bolzi de Souza
  Configuração de servidor Node.Js + express
*/
const app = require('express')();
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const keys = require('./config/keys');

const PORT = keys.PORT;
const DB = keys.mongoDB;

mongoose.Promise = global.Promise;
mongoose.connect(DB)
  .then(
    () => {
      console.log('Banco de dados conectado');
    },
    (err) => {
      console.log('Conexão ao banco de dados encontrou um erro: ' + err);
    }
  )

var index = require('./routes/indexRouter');

app.use(bodyParser.json());
app.use(cors());

app.use('/', index);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
})
