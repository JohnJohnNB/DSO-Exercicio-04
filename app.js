//Carregando módulos
const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express()
const path = require('path')
const mongoose = require('mongoose')

//Configurações
    //Body Parser
        app.use(bodyParser.urlencoded({extended: true}))
        app.use(bodyParser.json())
    //Handlebars
        app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}))
        app.set('view engine', 'handlebars')
    // Public
        app.use(express.static(path.join(__dirname + '/public')))

//Rotas
    app.get('/',(req,res) => {
        res.sendFile(path.join(__dirname+'/frontend/index.html'))
    })
    app.get('/index.html', function(req, res){
        res.sendFile(path.join(__dirname+'/frontend/index.html'))  
    })
    
    app.get('/tela_suporte.html', function(req, res){
        res.sendFile(path.join(__dirname+'/frontend/tela_suporte.html'))
    })
    
    app.get('/tela_entrar.html', function(req, res){
        res.sendFile(path.join(__dirname+'/frontend/tela_entrar.html'))
    })

//MongoDB
    mongoose.Promise = global.Promise
    mongoose.connect("mongodb://localhost/JohnClickerDB", {
        useMongoClient: true
    }).then(() => {
        console.log("MongoDB Conectado!")
    }).catch((err) => {
        console.log("Houve um erro ao se conectar ao mongoDB"+err)
    })


const PORT = 3000
app.listen(PORT, function(){
    console.log("Servidor rodando!")
})

//Para subir localmente:
//- Ir no diretório do projeto
//- No console: node app.js
// acessar no navegador localhost:3000

//Para usar o mongoDB 
//- mongod no console para se conectar ao servidor mongo
//- mongo no console para entrar na linha de comando mongo 
//- só usar os comandos como: show dbs, etc...