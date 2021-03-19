const { TodoItems } = require('../database/sequelize')
const fetch = require('node-fetch')
module.exports = app => {
    return {

        getAll: (req, res) => {
            try {
                TodoItems.findAll().then(r => res.status(200).json(r))
            } catch (error) {
                res.status(500).json(error)
            }
        },
        create: (req, res) => {
            try {
                let obj = req.body
                if(!obj.Descricao || !obj.Email || !obj.NomeResp){
                    res.status(500).json({message:'Exstem campos a preencher'})
                }
                obj.Status = 0
                obj.RetornoCount = 0
                TodoItems.create(obj).then(r => res.status(200).json(r))
            } catch (error) {
                res.status(500).json(error)
            }
        },
        getOne: (req, res) => {
            try {
                TodoItems.findOne({ where: { Id: req.params.id } }).then(TodoItems => res.status(200).json(TodoItems))
            } catch (error) {
                res.status(500).json(error)
            }
        },
        update: (req, res) => {
            try {
                TodoItems.update(req.body, { where: { Id: req.params.id } }).then(TodoItems => res.status(200).json(TodoItems))
            } catch (error) {
                res.status(500).json(error)
            }
        },
        concluir: (req, res) => {
            try {
                TodoItems.findOne({ where: { Id: req.params.id } }).then(obj => {
                    let itemConcluido = {
                        Descricao: obj.Descricao,
                        Status: 1,
                        Email: obj.Email,
                        RetornoCount: obj.RetornoCount,
                        IdList: obj.IdList,
                        NomeResp: obj.NomeResp,
                    }
                    TodoItems.update(itemConcluido, { where: { Id: req.params.id } })
                        .then(TodoItems => res.status(200).json(TodoItems))
                })
            } catch (error) {
                res.status(500).json(error)
            }
        },
        reabrir: (req, res) => {
            try {
                TodoItems.findOne({ where: { Id: req.params.id } }).then(obj => {
                    let itemConcluido = {
                        Descricao: obj.Descricao,
                        Status: 0,
                        Email: obj.Email,
                        RetornoCount: obj.RetornoCount + 1,
                        IdList: obj.IdList,
                        NomeResp: obj.NomeResp,
                    }
                    if (itemConcluido.RetornoCount > 2) {
                        res.status(500).json({ message: 'Limite de reaberturas excedido' })
                    } else {
                        TodoItems.update(itemConcluido, { where: { Id: req.params.id } })
                            .then(TodoItems => res.status(200).json(TodoItems))
                    }
                })
            } catch (error) {
                res.status(500).json(error)
            }
        },
        deleteOne: (req, res) => {
            try {
                TodoItems.destroy({ where: { Id: req.params.id } }).then(TodoItems => res.status(200).json(TodoItems))
            } catch (error) {
                res.status(500).json(error)
            }
        },
        validaSenhaSupervisor: (req, res, next) => {
            if (req.get('Authorization') == process.env.SENHA_SUPERVISOR) {
                next()
            } else {
                res.status(500)
                    .json({ message: 'Reabertura de item não autorizada.' })
            }
        },
        validate: (req, res, next) => {
            fetch(`http://apilayer.net/api/check?access_key=${process.env.MAILBOX_APIKEY}&email=${req.body.Email}&smtp=0&format=1`)
                .then(r => {
                    r.json().then(data => {
                        if (data.format_valid) {
                            next()
                        } else {
                            res.status(500).json({
                                email: data.Email,
                                campo:'email',
                                message: 'Formato inválido',
                                sugerido: data.did_you_mean
                            })
                        }
                    })
                })
        },
        randomInsert: (req, res) => {
            fetch('https://cat-fact.herokuapp.com/facts/')
                .then(r => {
                    r.json().then(facts => {
                        try {
                            const randomTasks =
                                facts.map(function (a) {
                                    return {
                                        Descricao: a.text,
                                        Status: 0,
                                        Email: 'eu@me.com',
                                        RetornoCount: 0,
                                        NomeResp: 'anonimo'
                                    }
                                })
                            randomTasks.forEach(obj => TodoItems.create(obj))
                            res.status(200).json(randomTasks)
                        } catch (error) {
                            res.status(500).json(error)
                        }
                    })
                })
        }
    }
}