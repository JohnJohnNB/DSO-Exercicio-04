//Carregando o mongodb
const mongoose = require("mongoose")
const Schema = mongoose.Schema;

//Definindo o model, no caso usuario e seus atributos
const UsuarioSchema = new Schema({
    nome: {type: String},
    email: {type: String},
    senha: {type: String},
    num_johns: {type: Number},
    num_autoclicker: {type: Number},
    num_farm: {type: Number}
})

//Collection (como se fosse uma tabela)
mongoose.model('usuarios', UsuarioSchema)

