const pg = require('pg')

const client = new pg.Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'admin',
    port: 5432
})

module.exports = client

//CRIAR TABELA ALUNO
/*CREATE TABLE aluno (
    numero_matricula serial,
        nome varchar(30),
        cpf varchar(20),
        sala varchar (10)
    )*/

//CRIAR TABELA BOLETIM
/*CREATE TABLE boletim (
    id_boletim serial,
        turma varchar(30),
        nota_final int,
        aprovacao varchar (20),
        aluno int
    )*/

//CRIAR TABELA PROFESSOR
/*CREATE TABLE professor2 (
id_professor serial,
	nome varchar(30),
	cpf varchar(20),
	ta varchar (30),
	disciplina varchar(30),
	tipo varchar(30)
)*/

//CRIAR TABELA TURMA
/*CREATE TABLE turma2 (
id_turma serial,
	professor varchar(30),
	disciplina varchar(30),
	sala varchar (20),
	conjunto_alunos varchar(20),
	aluno varchar(30)
)*/
