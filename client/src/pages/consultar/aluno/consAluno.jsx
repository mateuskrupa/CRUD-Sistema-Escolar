import React, {useState} from "react";
import Axios from 'axios'
import ShowAluno from './show'

export default function ConsAluno () {

    const [values, setValues] = useState()
    const [matricula, setMatricula] = useState()
    const [nome, setNome] = useState()
    const [cpf, setCpf] = useState()
    const [sala, setSala] = useState()
    const [modulo, setModulo] = useState()

    const handleChangeValues = (value) => {
        setValues((prevValue) => ({
            ...prevValue,
            [value.target.name]: value.target.value,
        }))
    }


    const clickButton = () => {
        Axios.post("http://localhost:8080/atualizar/aluno", {
            nome: values.nome,
            cpf: values.cpf,
            sala: values.sala,
            modulo: values.modulo,
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
        Axios.post("http://localhost:8080/consultar/aluno", {
            cpf: values.cpf
        }).then((response) => {
            console.log(response)
        })
    }

    const pegarDados = () => {
        Axios.get("http://localhost:8080/consultar/aluno").then((response) => {
            console.log(response.data.rows)
            setMatricula(response.data.rows[0].numero_matricula)
            setNome(response.data.rows[0].nome)
            setCpf(response.data.rows[0].cpf)
            setSala(response.data.rows[0].sala)
            setModulo(response.data.rows[0].modulo)
            
        })
    }


    const clickButtonDel = () => {
        Axios.post("http://localhost:8080/deletar/aluno", {
            cpf: values.cpf
        }).then((response) => {
            console.log(response)
        })
    }


    return(
        <div id="cons-prof-container">
                    <div id="cpf">
                        <input type="text" name="cpf" placeholder="Cpf" onChange={(handleChangeValues)} />
                        <button id="cons" onClick={() => Consultar()}>Consultar</button>
                    </div>

                    <ShowAluno nome={nome} cpf={cpf} sala={sala} modulo={modulo} matricula={matricula} />

                    <div id="form">
                        <input type="text" name="nome" placeholder="Nome" onChange={handleChangeValues} defaultValue={nome}/>
                        <input type="text" name="cpf" placeholder="CPF" onChange={handleChangeValues} defaultValue={cpf}/>
                        <input type="text" name="sala" placeholder="Sala" onChange={handleChangeValues} defaultValue={sala}/>
                        <input type="text" name="modulo" placeholder="Modulo" onChange={handleChangeValues} defaultValue={modulo}/>

                        <select name="modulo" id="modulo">
                            <option value="1">Modulo 1</option>
                            <option value="2">Modulo 2</option>
                            <option value="3">Modulo 3</option>
                        </select>

                        <div id="acbut">
                            <button onClick={() => clickButton()}>ATUALIZAR</button>
                            <button onClick={() => clickButtonDel()}>DELETAR</button>
                        </div>   
                    </div>

                    
                
                
            
        </div>
    )
}