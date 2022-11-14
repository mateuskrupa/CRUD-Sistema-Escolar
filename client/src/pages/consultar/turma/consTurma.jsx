import React, {useState} from "react";
import Axios from 'axios'
import Show from './show'
import ShowTable from './showTable'
import './consTurma.css'


export default function ConsTurma () {

    const [values, setValues] = useState()
    const [id_turma, setId_turma] = useState()
    const [professor, setProfessor] = useState()
    const [disciplina, setDisciplina] = useState()
    const [sala, setSala] = useState()
    const [listAlunos, setListAlunos] = useState()

    const handleChangeValues = (value) => {
        setValues((prevValue) => ({
            ...prevValue,
            [value.target.name]: value.target.value,
        }))
    }


    const clickButton = () => {
        Axios.post("http://localhost:8080/atualizar/turma", {
            professor: values.professor,
            disciplina: values.disciplina,
            sala: values.sala,
        }).then((response) => {
            console.log(response)
            alert("Atualizado com sucesso!")
        })
    }



    
    const Consultar = () => {
        enviarId()
        setTimeout(() => {
            pegarDados()
        }, 1000);
    } 


    const enviarId = () => {
        Axios.post("http://localhost:8080/consultar/turma", {
            id_turma: values.id_turma
        }).then((response) => {
            console.log(response)
        })
    }

    const pegarDados = () => {
        Axios.get("http://localhost:8080/consultar/turma").then((response) => {
            console.log(response.data.rows)
            setId_turma(response.data.rows[0].id_turma)
            setProfessor(response.data.rows[0].professor)
            setDisciplina(response.data.rows[0].disciplina)
            setSala(response.data.rows[0].sala)

            
        })
    }


    const clickButtonDel = () => {
        Axios.post("http://localhost:8080/deletar/turma", {
            id_turma: values.id_turma
        }).then((response) => {
            console.log(response)
            setId_turma()
            setProfessor()
            setDisciplina()
            setSala()
            setListAlunos()
            alert("Deletado com sucesso!")
        })
    }

    const consultarAlunos = () => {
        Axios.get("http://localhost:8080/consultar/alunos").then((response) => {
            console.log(response.data.rows)
            setListAlunos(response.data.rows)
  
        })
    }


    return(
        <div id="cons-turma-container">
                    <div id="cpf">
                        <input type="text" name="id_turma" placeholder="N° Turma" onChange={(handleChangeValues)} />
                        <button id="cons" onClick={() => Consultar()}>Consultar</button>
                        <button onClick={() => clickButtonDel()}>DELETAR TURMA</button>
                    </div>

                    <Show id_turma={id_turma} professor={professor} disciplina={disciplina} sala={sala} />

                    <div id="form">
                        <input type="text" name="professor" placeholder="Professor" onChange={handleChangeValues} defaultValue={professor}/>
                        <input type="text" name="disciplina" placeholder="Disciplina" onChange={handleChangeValues} defaultValue={disciplina}/>
                        <input type="text" name="sala" placeholder="Sala" onChange={handleChangeValues} defaultValue={sala}/>


                        <div id="acbut">
                            <button onClick={() => clickButton()}>ATUALIZAR</button>
                            
                        </div>   
                    </div>


                    <div id="show-alunos">
                        <button onClick={() => consultarAlunos()}>CONSULTAR ALUNOS</button>
                        <h3>Alunos:</h3>

                        {typeof listAlunos !== "undefined" && listAlunos.map((value) => {
                        return <ShowTable one={value.aluno}/> })}

                    </div>

                    
                
                
            
        </div>
    )
}