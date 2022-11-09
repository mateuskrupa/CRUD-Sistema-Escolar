import React, {useState} from "react";
import Axios from 'axios'

export default function Boletim () {

    const [values, setValues] = useState()

    const handleChangeValues = (value) => {
        setValues((prevValue) => ({
            ...prevValue,
            [value.target.name]: value.target.value,
        }))
    }

    const clickButton = () => {
        Axios.post("http://localhost:8080/cadastrar/boletim", {
            aluno: values.aluno,
            turma: values.turma,
            nota_final: values.nota_final,
        }).then((response) => {
            console.log(response)
        })
    }


    return(
        <div id="cad-prof-container">
                <div id="cad-form">
                    <input type="text" name="aluno" placeholder="Aluno" onChange={handleChangeValues}/>
                    <input type="text" name="turma" placeholder="Turma" onChange={handleChangeValues}/>
                    <input type="text" name="nota_final" placeholder="Nota Final" onChange={handleChangeValues}/>

                    <button onClick={() => clickButton()}>Submit</button>
                </div>
            
        </div>
    )
}