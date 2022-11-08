const express = require('express')
const app = express()
const db = require('./banco')
const cors = require('cors')

var lcpf = []

app.use(cors())
app.use(express.json())

db.connect()


//CADASTRAR NOVO PROFESSOR
app.post("/cadastrar/professor", (req, res) => {
    const {nome} = req.body;
    const {cpf} = req.body;
    const {ta} = req.body;
    const {disciplina} = req.body;

    let sql = `INSERT INTO professor (nome, cpf, ta, disciplina) VALUES ('${nome}', '${cpf}', '${ta}', '${disciplina}')`


    db.query(sql, (err) => {
        if (err) return res.json(err);

        return res.status(200).json("criado com sucesso")
    })
})

//CONSULTAR PROFESSOR
app.post("/consultar/professor", (req, res) => {
    let {cpf} = req.body;
    console.log(cpf)

    if(lcpf.length >= 1) {
        lcpf.pop()
        lcpf.push(cpf)
        console.log(lcpf)
    }else{
        lcpf.push(cpf)
        console.log(lcpf)  
    }   

})

app.get("/consultar/professor", (req, res) => {

    const cpf = lcpf[0]

    let sql = `SELECT * FROM professor WHERE cpf='${cpf}'`

    console.log(sql)

    db.query(sql, (err, data) => {
        if (err) return res.json(err);
    
        return res.status(200).json(data);
      });

    
})


//ATUALIZAR PROFESSOR
app.post("/atualizar/professor", (req, res) => {
    const {nome} = req.body;
    const {cpf} = req.body;
    const {ta} = req.body;
    const {disciplina} = req.body;

    let sql = `UPDATE professor SET nome='${nome}', cpf='${cpf}', ta='${ta}', disciplina='${disciplina}' WHERE cpf='${cpf}'`

    console.log(sql)
    db.query(sql, (err) => {
        if (err) return res.json(err);

        return res.status(200).json("criado com sucesso")
    })
})


//DELETAR PROFESSOR
app.post("/deletar/professor", (req, res) => {
    const {cpf} = req.body;

    let sql = `DELETE FROM professor WHERE cpf='${cpf}'`

    console.log(sql)
    db.query(sql, (err) => {
        if (err) return res.json(err);

        return res.status(200).json("criado com sucesso")
    })
})





















/*db.connect()
db.query("select * from postgres").then(results => {
    const result = results
    console.table(result)
}).finally(() => {
    db.end()
})*/






























app.listen(8080, () => {
    console.log('Server running')
})