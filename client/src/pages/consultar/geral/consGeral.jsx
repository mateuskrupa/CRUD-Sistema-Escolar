import React, {useState} from "react";
import './consGeral.css'
import ShowTable from "./show";
import Axios from 'axios'


export default function ConsGeral () {

    const [listProf, setListProf] = useState()
    const [listAluno, setListAluno] = useState()
    const [listBoletim, setListBoletim] = useState()
    const [listTurma, setListTurma] = useState()

    const clickProf = () => {
        Axios.get("http://localhost:8080/consultar/geral/professor").then((response) => {
            setListProf(response.data.rows)           
        })
    }

    const clickAluno = () => {
        Axios.get("http://localhost:8080/consultar/geral/aluno").then((response) => {
            setListAluno(response.data.rows)           
        })
    }

    const clickBoletim = () => {
        Axios.get("http://localhost:8080/consultar/geral/boletim").then((response) => {
            setListBoletim(response.data.rows)           
        })
    }

    const limpar = () => {
        setListProf()
        setListAluno()
        setListBoletim()
        setListTurma()
    }



    return(
       <div className="container-cons-geral">
        <div className="botoes">
        <button onClick={()=>{clickProf()}}>Professores</button>
        <button onClick={()=>{clickAluno()}}>Alunos</button>
        <button onClick={()=>{clickBoletim()}}>Boletins</button>
        <button>Turmas</button>
        <button onClick={()=>{limpar()}}>Limpar Dados</button>
        </div>

        {typeof listProf !== "undefined" && listProf.map((value) => {
            return <ShowTable one={value.nome} two={value.cpf} three={value.ta} four={value.disciplina}/>
        })}

        {typeof listAluno !== "undefined" && listAluno.map((value) => {
            return <ShowTable one={value.nome} two={value.cpf} three={value.sala} four={value.modulo}/>
        })}

        {typeof listBoletim !== "undefined" && listBoletim.map((value) => {
            return <ShowTable one={value.aluno} two={value.turma} three={value.nota_final} four={value.aprovacao}/>
        })}

        







        </div>


    );
}