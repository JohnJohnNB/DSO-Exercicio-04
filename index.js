const express = require('express')
const app = express()
const path = require('path')
const router = express.Router()

router.get('/', function(req, res){
    res.sendFile(path.join(__dirname+'/frontend/index.html'))
})

router.get('/index.html', function(req, res){
    res.sendFile(path.join(__dirname+'/frontend/index.html'))  
})

router.get('/tela_suporte.html', function(req, res){
    res.sendFile(path.join(__dirname+'/frontend/tela_suporte.html'))
})

router.get('/tela_entrar.html', function(req, res){
    res.sendFile(path.join(__dirname+'/frontend/tela_entrar.html'))
})

app.use('/', router)

app.listen(process.env.port || 3000)

//Para subir localmente:
//- Ir no diretório do projeto
//- No console: node index.js


