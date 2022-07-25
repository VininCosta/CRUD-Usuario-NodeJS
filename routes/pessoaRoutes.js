const router = require('express').Router();

const Pessoa = require('../model/Pessoa')

router.post('/', async (req, res) => {
    const {name, salario, aprovacao} = req.body

if(!name){
    res.status(422).json({error: 'Nome obrigatório'})
    return
}

    const pessoa = {
        name,
        salario,
        aprovacao
    }

    try {
        await Pessoa.create(pessoa);
        res.status(201).json({message: 'Pessoa inserida no sistema com sucesso'})
    } catch (error) {
        res.status(500).json({error: error})
    }
})


router.get('/', async (req, res) => {

    try {
        const pessoas = await Pessoa.find()
        res.status(200).json(pessoas)
    } catch (error) {
        res.status(500).json({error: error })
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id

    try {
        const pessoa = await Pessoa.findOne({_id: id})
        if(!pessoa) {
            res.status(422).json({message: 'O usuário não foi encontrado'})
            return
        }
        res.status(200).json(pessoa)
    } catch (error) {
        res.status(500).json({error: error})
    }
})

router.patch('/:id', async(req, res) => {
    const id = req.params.id
    const {name, salario, aprovacao} = req.body
    const pessoa = {
        name,
        salario,
        aprovacao
    }

    try {
        const updatePessoa = await Pessoa.updateOne({_id: id}, pessoa) 
        res.status(200).json(pessoa) 
    } catch (error) {
        res.status(500).json({error: error})
    }

})

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    const pessoa = await Pessoa.findOne({_id: id})
        if(!pessoa) {
            res.status(422).json({message: 'O usuário não foi encontrado'})
            return
        }
        try {
            await pessoa.deleteOne({_id: id})
            res.status(200).json({message: 'Usuário removido com sucesso'})
        } catch (error) {
            res.status(500).json({error: error})
        }
})

module.exports = router