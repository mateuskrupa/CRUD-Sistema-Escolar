const express = require('express')
const app = express()
const db = require('./banco')
const cors = require('cors')

var lcpf = []
var laluno = []
var lturma = []
var lmatricula = []

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

//CADASTRAR NOVO ALUNO
app.post("/cadastrar/aluno", (req, res) => {
    const {nome} = req.body;
    const {cpf} = req.body;

    let sql = `INSERT INTO aluno (nome, cpf, sala) VALUES ('${nome}', '${cpf}', 'Modulo 1')`


    db.query(sql, (err) => {
        if (err) return res.json(err);

        return res.status(200).json("criado com sucesso")
    })
})


//CADASTRAR NOVO BOLETIM
let aprov = ''
app.post("/cadastrar/boletim", (req, res) => {
    const {turma} = req.body;
    const {nota_final} = req.body;
    const {aluno} = req.body;

    const nota = parseInt(nota_final)

    if (nota >= 6) {
        aprov = 'Aprovado'
    }else{
        aprov = 'Reprovado'
    }

    let sql = `INSERT INTO boletim (aluno, turma, nota_final, aprovacao) VALUES ('${aluno}', '${turma}', '${nota_final}', '${aprov}')`

    db.query(sql, (err) => {
        if (err) return res.json(err);

        return res.status(200).json("criado com sucesso")
    })
})

//CADASTRAR NOVA TURMA
app.post("/cadastrar/turma", (req, res) => {
    const {id_turma} = req.body; 
    const {professor} = req.body;
    const {disciplina} = req.body;
    const {sala} = req.body;
    const {aluno} = req.body;

    let sql = `INSERT INTO turma (id_turma, professor, disciplina, sala, conjunto_alunos, aluno) VALUES ('${id_turma}', '${professor}', '${disciplina}', '${sala}', '${id_turma}', '${aluno}')`

    console.log(sql)
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

//CONSULTAR ALUNO
app.post("/consultar/aluno", (req, res) => {
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

app.get("/consultar/aluno", (req, res) => {

    const cpf = lcpf[0]

    let sql = `SELECT * FROM aluno WHERE cpf='${cpf}'`

    console.log(sql)

    db.query(sql, (err, data) => {
        if (err) return res.json(err);
    
        return res.status(200).json(data);
      });

    
})

//CONSULTAR BOLETIM
app.post("/consultar/boletim", (req, res) => {
    let {aluno} = req.body;

    if(laluno.length >= 1) {
        laluno.pop()
        laluno.push(aluno)
        console.log(laluno[0])
    }else{
        laluno.push(aluno) 
        console.log(laluno[0])
    }   

})

app.get("/consultar/boletim", (req, res) => {

    const idaluno = laluno[0]

    let sql = `SELECT * FROM boletim WHERE aluno='${idaluno}'`

    console.log(sql)

    db.query(sql, (err, data) => {
        if (err) return res.json(err);
    
        return res.status(200).json(data);
      });

    
})

//CONSULTAR TURMA
app.post("/consultar/turma", (req, res) => {
    let {id_turma} = req.body;
    console.log(id_turma)

    if(lturma.length >= 1) {
        lturma.pop()
        lturma.push(id_turma)
        console.log(lturma)
    }else{
        lturma.push(id_turma)
        console.log(lturma)  
    }   

})

app.get("/consultar/turma", (req, res) => {

    const id_turma = lturma[0]

    let sql = `SELECT * FROM turma WHERE id_turma='${id_turma}'`



    db.query(sql, (err, data) => {
        if (err) return res.json(err);
    
        return res.status(200).json(data);
      });

    
})

app.get("/consultar/alunos", (req, res) => {

    const id_turma = lturma[0]

    let sql = `SELECT aluno FROM turma WHERE id_turma='${id_turma}'`



    db.query(sql, (err, data) => {
        if (err) return res.json(err);
    
        return res.status(200).json(data);
      });

    
})

//CONSULTAR APROVA????O
app.post("/enviar/matricula", (req, res) => {
    let {matricula} = req.body;
    console.log(matricula)

    if(lmatricula.length >= 1) {
        lmatricula.pop()
        lmatricula.push(matricula)
        console.log(lmatricula)
    }else{
        lmatricula.push(matricula)
        console.log(lmatricula)  
    }
})

app.get("/consultar/aprovacao", (req, res) => {

    const id_matricula = lmatricula[0]

    let sql = `select boletim.aprovacao from aluno inner join boletim on boletim.aluno = aluno.numero_matricula where aluno.numero_matricula=${id_matricula}`

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

//ATUALIZAR ALUNO
app.post("/atualizar/aluno", (req, res) => {
    let {nome} = req.body;
    let {cpf} = req.body;
    let {sala} = req.body;
    console.log(sala)

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
        cpf = `cpf='${cpf}'`
    }

    if (sala === undefined) {
        sala = ''

    }else{
        sala = `sala='${sala}',`
    }

    let sql = `UPDATE aluno SET ${nome} ${sala} ${cpf} WHERE cpf='${lcpf[0]}'`

    console.log(sql)
    db.query(sql, (err) => {
        if (err) return res.json(err);

        return res.status(200).json("criado com sucesso")
    })
})

let aprovb = 0
//ATUALIZAR BOLETIM
app.post("/atualizar/boletim", (req, res) => {
    let {turma} = req.body;
    let {nota_final} = req.body;
    const nota = parseInt(nota_final)

    if (turma === undefined) {
        turma = ''
        console.log(turma)
    }else{
        turma = `turma='${turma}',`
    }

    if (nota_final === undefined) {
        nota_final = ''
        console.log(nota_final)
    }else{
        nota_final = `nota_final='${nota_final}',`
    }

    if (nota >= 6) {
        aprovb = 'Aprovado'
    }else{
        aprovb = 'Reprovado'
    }

    console.log(aprovb)
    console.log(typeof(nota))
    let sql = `UPDATE boletim SET ${turma} ${nota_final} aprovacao='${aprovb}' WHERE aluno='${laluno[0]}'`

    console.log(sql)
    db.query(sql, (err) => {
        if (err) return res.json(err);

        return res.status(200).json("criado com sucesso")
    })
})

//ATUALIZAR TURMA
app.post("/atualizar/turma", (req, res) => {
    let {professor} = req.body;
    let {disciplina} = req.body;
    let {sala} = req.body;

    if (professor === undefined) {
        professor = ''
        console.log(professor)
    }else{
        professor = `professor='${professor}',`
    }

    if (disciplina === undefined) {
        disciplina = ''
        console.log(disciplina)
    }else{
        disciplina = `disciplina='${disciplina}',`
    }

    if (sala === undefined) {
        sala = ''

    }else{
        sala = `sala='${sala}',`
    }


    let sql = `UPDATE turma SET ${professor} ${disciplina} ${sala} id_turma=${lturma[0]} WHERE id_turma='${lturma[0]}'`

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

//DELETAR ALUNO
app.post("/deletar/aluno", (req, res) => {
    const {cpf} = req.body;

    let sql = `DELETE FROM aluno WHERE cpf='${cpf}'`

    console.log(sql)
    db.query(sql, (err) => {
        if (err) return res.json(err);

        return res.status(200).json("criado com sucesso")
    })
})

//DELETAR BOLETIM
app.post("/deletar/boletim", (req, res) => {
    const {aluno} = req.body;

    let sql = `DELETE FROM boletim WHERE aluno='${aluno}'`

    console.log(sql)
    db.query(sql, (err) => {
        if (err) return res.json(err);

        return res.status(200).json("criado com sucesso")
    })
})

//DELETAR TURMA
app.post("/deletar/turma", (req, res) => {
    const {id_turma} = req.body;

    let sql = `DELETE FROM turma WHERE id_turma='${id_turma}'`

    console.log(sql)
    db.query(sql, (err) => {
        if (err) return res.json(err);

        return res.status(200).json("criado com sucesso")
    })
})

//CONSULTAR PROFESSOR GERAL
app.get("/consultar/geral/professor", (req, res) => {

    const sql = `SELECT * FROM professor`

    db.query(sql, (err, data) => {
        if (err) return res.json(err);
    
        return res.status(200).json(data);
      });
   
})

//CONSULTAR ALUNO GERAL
app.get("/consultar/geral/aluno", (req, res) => {

    const sql = `SELECT * FROM aluno`

    db.query(sql, (err, data) => {
        if (err) return res.json(err);
    
        return res.status(200).json(data);
      });
   
})

//CONSULTAR BOLETIM GERAL
app.get("/consultar/geral/boletim", (req, res) => {

    const sql = `SELECT * FROM boletim`

    db.query(sql, (err, data) => {
        if (err) return res.json(err);
    
        return res.status(200).json(data);
      });
   
})

//CONSULTAR TURMA GERAL
app.get("/consultar/geral/turma", (req, res) => {

    const sql = `SELECT * FROM turma`

    db.query(sql, (err, data) => {
        if (err) return res.json(err);
    
        return res.status(200).json(data);
      });
   
})


















app.listen(8080, () => {
    console.log('Server running')
})