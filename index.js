
const express = require('express');
const app = express();
const router = express.Router(); // http://expressjs.com/en/guide/migrating-4.html
// https://stackoverflow.com/questions/28305120/differences-between-express-router-and-app-get
// 
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const path = require ('path');

//variavel config que requer ficheiro 
const config = require ('./configBd/database');
const authentication = require('./routes/authentication')(router);
const bodyParser = require('body-parser');

// premite cross origin
// pedido do front end para o back end

const cors = require ('cors');





// ligação À base de dados 
/**
 * utiliza variavel config com o ficheiro ('./configBd/database.js');
 * 
module.exports =
{
    uri: 'mongodb://localhost:27017/' + this.db,
    secret: crypto,
    db: 'blogBD'
}
 * 
 */

 // ligação à base de dados  port 27017 Uri
 // tem secret com crypto 

mongoose.connect(config.uri, (err) => {
    if (err) {
        console.log(' Não foi possivel ligar à base de dados o erro é o seguinte---->>>> ', err)
        // ligação ao localhost 

    } else {

        console.log('ligação à base de dados feita com sucesso ' + config.db);
        console.log (config.secret);
    }
});

// https://stackoverflow.com/questions/11321635/nodejs-express-what-is-app-use
// midleware
// static diretoria para frontend
// https://github.com/senchalabs/connect#readme

// Middleware

app.use(cors({
    // midleware para permitir ligaçao com o modo de desenvolvimento
    // para apagar quando entrar em produção e no site
    origin: 'http://localhost:4200'
}));



app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
// https://github.com/expressjs/body-parser
/*
app.use(function (req, res) {
  res.setHeader('Content-Type', 'text/plain')
  res.write('you posted:\n')
  res.end(JSON.stringify(req.body, null, 2))
})
*/


app.use(express.static(__dirname + '/client/dist/'));
// Each app.use(middleware) is called every time a request is sent to the server
// https://stackoverflow.com/questions/11321635/nodejs-express-what-is-app-use
// lida com o processo dos pedidos

app.use('/authentication',authentication); // ficheiro authentication
// server
// trata dos dados do ficheiro autenticação/registo

// APP GET recebe os ficheiros da aplicao e res envia os ficheiros

app.get('*', function(req, res){
  res.sendFile(path.join(__dirname + '/client/dist/index.html') ); //enviar o ficheiro de entrada da aplicacao Angular
  
});


app.listen(8080, () => {
    console.log (" Servidor ligado a escutar no port 8080");
});