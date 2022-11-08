import React, {useState} from "react";
import Axios from 'axios'
import Show from './show'
import Form from './form'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

export default function ConsProf () {

    const [values, setValues] = useState()
    const [nome, setNome] = useState()
    const [cpf, setCpf] = useState()
    const [ta, setTa] = useState()
    const [disciplina, setDisciplina] = useState()

    const handleChangeValues = (value) => {
        setValues((prevValue) => ({
            ...prevValue,
            [value.target.name]: value.target.value,
        }))
    }

    const clickButton = () => {
        Axios.post("http://localhost:8080/atualizar/professor", {
            nome: values.nome,
            cpf: values.cpf,
            ta: values.ta,
            disciplina: values.disciplina,
        }).then((response) => {
            console.log(response)
        })
    }


    const Consultar = () => {
        enviarCpf()
        setTimeout(() => {
            pegarDados()
        }, 1000);
    } 


    const enviarCpf = () => {
        Axios.post("http://localhost:8080/consultar/professor", {
            cpf: values.cpf
        }).then((response) => {
            console.log(response)
        })
    }

    const pegarDados = () => {
        Axios.get("http://localhost:8080/consultar/professor").then((response) => {
            console.log(response.data.rows)
            setNome(response.data.rows[0].nome)
            setCpf(response.data.rows[0].cpf)
            setTa(response.data.rows[0].ta)
            setDisciplina(response.data.rows[0].disciplina)
            
        })
    }


    const clickButtonDel = () => {
        Axios.post("http://localhost:8080/deletar/professor", {
            cpf: values.cpf
        }).then((response) => {
            console.log(response)
        })
    }


    return(
        <div className="container">
                <input type="text" name="cpf" placeholder="Cpf" onChange={handleChangeValues} />
                <button onClick={() => Consultar()}>Consultar</button>

                <input type="text" name="nome" placeholder={nome} onChange={handleChangeValues} />
                <input type="text" name="cpf" placeholder={cpf} onChange={handleChangeValues} />
                <input type="text" name="ta" placeholder={ta} onChange={handleChangeValues}/>
                <input type="text" name="disciplina" placeholder={disciplina} onChange={handleChangeValues}/>

                <button onClick={() => clickButton()}>Atualizar dados</button>
                <button onClick={() => clickButtonDel()}>DELETAR</button>

                <Show nome={nome} cpf={cpf} ta={ta} disciplina={disciplina}/>

                
            
        </div>
    )
}