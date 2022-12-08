//Carregando módulos
const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
require(path.join(__dirname+'/frontend/model/usuario.js'))
const Usuario = mongoose.model("usuarios")
const session = require('express-session')
const flash = require('connect-flash')

//Configurações
    //Sessão
        app.use(session({
            secret: "johnclicker",
            resave: true,
            saveUninitialized: true
        }))
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
        res.sendFile(path.join(__dirname+'/frontend/view/index.html'))
    })
    app.get('/index.html', function(req, res){
        res.sendFile(path.join(__dirname+'/frontend/view/index.html'))  
    })
    
    app.get('/tela_suporte.html', function(req, res){
        res.sendFile(path.join(__dirname+'/frontend/view/tela_suporte.html'))
    })
    
    app.get('/tela_login.html', function(req, res){
        res.sendFile(path.join(__dirname+'/frontend/view/tela_login.html'))
    })

    app.get('/tela_entrar.html', function(req, res){
        res.sendFile(path.join(__dirname+'/frontend/view/tela_entrar.html'))
    })

    app.post('/usuarios/cadastrar', function(req, res){
        var erros = []

        if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
            erros.push({texto: "Nome inválido"})
        }

        if(!req.body.email || typeof req.body.email == undefined || req.body.email == null){
            erros.push({texto: "Email inválido"})
        }

        if(!req.body.senha || typeof req.body.senha == undefined || req.body.senha == null){
            erros.push({texto: "Senha inválida"})
        }

        if(req.body.senha.length < 4){
            erros.push({texto: "Senha muito curta"})
        }

        if(erros.length > 0){
            res.render("usuarios/cadastar", {erros: erros})
            //precisamos fazer com que a tela entrar aponte esses erros ao usuario
        } else {
            Usuario.findOne({email: req.body.email}).then((usuario) => {
                if(usuario){
                    res.redirect("/tela_entrar.html")
                    //precisamos tratar aqui pra que retorne uma mensagem para o usuario dizendo que já existe uma conta com esse email
                } else {
                    const novoUsuario = new Usuario({
                        nome: req.body.nome,
                        email: req.body.email,
                        senha: req.body.senha 
                    }).save().then(() => {
                        console.log("Usúario salvo com sucesso")
                    }).catch((err) => {
                        console.log("Ocorreu um erro ao salvar o usúario"+err)
                    })
                    res.redirect("/index.html")
                }
            }).catch((err) => {
                res.redirect("/")
                //mensagem aqui com erro  
            })
        }
    })

    app.post('/usuarios/salvarjohns', function(req, res){
        const query = {
            //aqi vai o identificador do usuario, pra buscar na query
        }
        const newEntry = {
            num_johns: req.body.num_johns,
            num_autoclicker: req.body.num_autoclicker,
            num_farm: req.body.num_farm
        }
        Usuario.update(query, newEntry).save().then(() => {
            console.log('Usuario atualizado com  sucesso')
        }).catch((err) => {
            console.log('Ocorreu um erro ao atualizar'+err)
        })
    })

    //Ele está criando um usúario novo por enquanto ao invés de autenticar o usúario
    app.post('/usuarios/logar', function(req, res){
        const novoUsuario = {
            email: req.body.email,
            senha: req.body.senha,
        }

        new Usuario(novoUsuario).save().then(() => {
            console.log('Usuario salvo com sucesso')
        }).catch((err) =>{
            console.log('Ocorreu um erro ao salvar o usuario'+ err)
        })
    })

//MongoDB
    mongoose.Promise = global.Promise
    mongoose.connect("mongodb://127.0.0.1/JohnClickerDB", {
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