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
    let {nome} = req.body;
    let {cpf} = req.body;
    let {ta} = req.body;
    let {disciplina} = req.body;

    console.log(nome)
    console.log(cpf)
    console.log(ta)
    console.log(disciplina)



    if (nome === undefined) {
        nome = ''
        console.log(nome)
    }else{
        nome = `nome='${nome}',`
    }

    if (cpf === undefined) {
        cpf = ''
        console.log(cpf)
    }else{
        cpf = `cpf='${cpf}',`
    }

    if (ta === undefined) {
        ta = ''
        console.log(ta)
    }else{
        ta = `ta='${ta}',`
    }

    if (disciplina === undefined) {
        disciplina = ''
        console.log(disciplina)
    }else{
        disciplina = `disciplina='${disciplina}',`
    }



    let sql = `UPDATE professor SET ${nome} ${cpf} ${ta} ${disciplina} tipo='professor' WHERE cpf='${lcpf[0]}'`

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

















app.listen(8080, () => {
    console.log('Server running')
})