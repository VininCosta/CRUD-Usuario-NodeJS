const express = require('express')
const mongoose = require('mongoose')
const app = express()


app.use(
    express.urlencoded({
        extended: true,
    })
)

app.use(express.json())

const pessoaRoutes = require('./routes/pessoaRoutes')

app.use('/pessoa', pessoaRoutes)

app.get('/', (req, res) => {
    res.json({message: 'Teste Express'})
})

mongoose.connect('mongodb+srv://vinin90:12345*@apicluster.ee7md.mongodb.net/api-node')
.then(() => {
    console.log('Conectado ao Banco de Dados')
    app.listen(3000)
})
.catch((err) => {
    console.log(err)
})

