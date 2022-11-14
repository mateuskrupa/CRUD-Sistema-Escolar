import React, {useState} from "react";
import Axios from 'axios'

export default function Turma () {

    const [values, setValues] = useState()

    const handleChangeValues = (value) => {
        setValues((prevValue) => ({
            ...prevValue,
            [value.target.name]: value.target.value,
        }))
    }

    const clickButton = () => {
        Axios.post("http://localhost:8080/cadastrar/turma", {
            id_turma: values.id_turma,
            professor: values.professor,
            disciplina: values.disciplina,
            sala: values.sala,
            aluno: values.aluno,
        }).then((response) => {
            console.log(response)
            alert("Cadastrado com sucesso!")
        })
    }


    return(
        <div id="cad-prof-container">
                <div id="cad-form">
                    <input type="text" name="id_turma" placeholder="N° Turma" onChange={handleChangeValues}/>
                    <input type="text" name="professor" placeholder="Professor" onChange={handleChangeValues}/>
                    <input type="text" name="disciplina" placeholder="Disciplina" onChange={handleChangeValues}/>
                    <input type="text" name="sala" placeholder="Sala" onChange={handleChangeValues}/>
                    <input type="text" name="aluno" placeholder="Nome Aluno" onChange={handleChangeValues}/>

                    <button onClick={() => clickButton()}>Submit</button>
                </div>
            
        </div>
    )
}