//Carregando módulos
const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
require(path.join(__dirname+'/frontend/model/usuario.js'))
const Usuario = mongoose.model("usuarios")

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
    
    app.get('/tela_login.html', function(req, res){
        res.sendFile(path.join(__dirname+'/frontend/tela_login.html'))
    })

    app.get('/tela_entrar.html', function(req, res){
        res.sendFile(path.join(__dirname+'/frontend/tela_entrar.html'))
    })
    app.post('/usuarios/novo', function(req, res){
        const novoUsuario = {
            nome: req.body.nome,
            email: req.body.email,
            senha: req.body.senha
        }

        new Usuario(novoUsuario).save().then(() => {
            console.log('Usuario salvo com sucesso')
        }).catch((err) =>{
            console.log('Ocorreu um erro ao salvar o usuario'+ err)
        })
    })

    //Ele está criando um usúario novo por enquanto ao invés de atualizar o numero de johns daquele usuario
    app.post('/usuarios/salvarjohns', function(req, res){
        const novoUsuario = {
            num_johns: req.body.num_johns,
            num_autoclicker: req.body.num_autoclicker,
            num_farm: req.body.num_farm
        }

        new Usuario(novoUsuario).save().then(() => {
            console.log('Usuario salvo com sucesso')
        }).catch((err) =>{
            console.log('Ocorreu um erro ao salvar o usuario'+ err)
        })
    })

//MongoDB
    mongoose.Promise = global.Promise
    mongoose.connect("mongodb://localhost/JohnClickerDB", {
        useNewUrlParser: true
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
//- acessar no navegador localhost:3000

//Para usar o mongoDB 
//- mongod no console para se conectar ao servidor mongo
//- mongo no console para entrar na linha de comando mongo 
//- show dbs -> para mostrar os bancos 
//- use JohnClickerDB -> para entrar no banco do servidor
//- show colletions -> para mostrar as tabelas 
//- db.usuarios.find() -> para mostrar os usuarios registrados na tabela