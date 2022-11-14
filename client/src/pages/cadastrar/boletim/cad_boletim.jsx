import React, {useState} from "react";
import Axios from 'axios'
import './cad_boletim.css'
import Show from './show'

export default function Boletim () {

    const [values, setValues] = useState()
    const [nome, setNome] = useState()
    const [cpf, setCpf] = useState()
    const [matricula, setMatricula] = useState()

    const handleChangeValues = (value) => {
        setValues((prevValue) => ({
            ...prevValue,
            [value.target.name]: value.target.value,
        }))
    }

    //envia os dados e cadastra
    const clickButton = () => {
        Axios.post("http://localhost:8080/cadastrar/boletim", {
            aluno: matricula,
            turma: values.turma,
            nota_final: values.nota_final,
        }).then((response) => {
            console.log(response)
            alert("Cadastrado com sucesso!")
        })
    }

    const Consultar = () => {
        enviarCpf()
        setTimeout(() => {
            pegarDados()
        }, 1000);
    } 


    const enviarCpf = () => {
        Axios.post("http://localhost:8080/consultar/aluno", {
            cpf: values.cpf
        }).then((response) => {
            console.log(response)
        })
    }

    const pegarDados = () => {
        Axios.get("http://localhost:8080/consultar/aluno").then((response) => {
            console.log(response.data.rows)
            setNome(response.data.rows[0].nome)
            setCpf(response.data.rows[0].cpf)
            setMatricula(response.data.rows[0].numero_matricula)
            
        })
    }

    return(
        <div id="cad-boletim-container">
                    <div id="cpf">
                        <input type="text" name="cpf" placeholder="Cpf Aluno" onChange={(handleChangeValues)} />
                        <button id="cons" onClick={() => Consultar()}>Consultar</button>                
                    </div>

                    <Show nome={nome} id={matricula}></Show>

                <div id="cad-form">
                    <input type="text" name="turma" placeholder="Turma" onChange={handleChangeValues}/>
                    <input type="text" name="nota_final" placeholder="Nota Final" onChange={handleChangeValues}/>

                    <button onClick={() => clickButton()}>Submit</button>
                </div>
            
        </div>
    )
}