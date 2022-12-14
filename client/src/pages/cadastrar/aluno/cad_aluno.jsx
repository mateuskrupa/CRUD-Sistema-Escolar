import React, {useState} from "react";
import Axios from 'axios'

export default function Aluno () {

    const [values, setValues] = useState()

    const handleChangeValues = (value) => {
        setValues((prevValue) => ({
            ...prevValue,
            [value.target.name]: value.target.value,
        }))
    }

    const clickButton = () => {
        Axios.post("http://localhost:8080/cadastrar/aluno", {
            nome: values.nome,
            cpf: values.cpf,
        }).then((response) => {
            console.log(response)
            alert("Cadastrado com sucesso!")
        })
    }


    return(
        <div id="cad-prof-container">
                <div id="cad-form">
                    <input type="text" name="nome" placeholder="Nome" onChange={handleChangeValues}/>
                    <input type="text" name="cpf" placeholder="Cpf" onChange={handleChangeValues}/>

                    <button onClick={() => clickButton()}>CADASTRAR</button>
                </div>
            
        </div>
    )
}