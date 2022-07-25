const mongoose = require('mongoose');

const Pessoa = mongoose.model('Pessoa', {
    name: String,
    salario: Number,
    aprovacao: Boolean
})

module.exports = Pessoa