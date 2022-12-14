import React, {useState} from "react";
import Axios from 'axios'
import ShowAluno from './show'
import './consAluno.css'

export default function ConsAluno () {

    const [values, setValues] = useState()
    const [matricula, setMatricula] = useState()
    const [nome, setNome] = useState()
    const [cpf, setCpf] = useState()
    const [sala, setSala] = useState()
    const [aprov, setAprov] = useState('')

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
            sala: values.sala
        }).then((response) => {
            console.log(response)
            alert("Atualizado com sucesso!")  
            
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
            
        })
    }


    const clickButtonDel = () => {
        Axios.post("http://localhost:8080/deletar/aluno", {
            cpf: values.cpf
        }).then((response) => {
            console.log(response)
            setNome()
            setCpf()
            setSala()
            setMatricula()
            alert("Deletado com sucesso!")
        })
    }

    const verificarAprov = () => {
        enviarMatricula()
        setTimeout(() => {
            ConsultarAprovacao()
        }, 1000);
    }

    const ConsultarAprovacao = () => {
        Axios.get("http://localhost:8080/consultar/aprovacao").then((response) => {
            console.log(response.data.rows)
            setAprov(response.data.rows[0].aprovacao) 
            console.log(aprov)           
        })
    }

    const enviarMatricula = () => {
        Axios.post("http://localhost:8080/enviar/matricula", {
            matricula: matricula
        }).then((response) => {
            console.log(response)
        })
    }


    return(
        <div id="cons-prof-container">
                    <div id="cpf">
                        <input type="text" name="cpf" placeholder="Cpf" onChange={(handleChangeValues)} />
                        <button id="cons" onClick={() => Consultar()}>Consultar</button>
                        <button id="cons" onClick={() => verificarAprov()}>Consultar Aprova????o</button>
                    </div>

                    <ShowAluno nome={nome} cpf={cpf} sala={sala} matricula={matricula} />

                    <div id="form">
                        <input type="text" name="nome" placeholder="Nome" onChange={handleChangeValues} defaultValue={nome}/>
                        <input type="text" name="cpf" placeholder="CPF" onChange={handleChangeValues} defaultValue={cpf}/>
                        <input type="text" name="sala" placeholder="Sala" onChange={handleChangeValues} defaultValue={sala}/>

                        <div id="modulos">
                        <p id="m">Modulo 2: </p>
                        {aprov === '' && 
                        <p id="m">Consulte Aprova????o</p>
                        }
                        {aprov === "Reprovado" && 
                        <p id="m">Indisponivel</p>
                        }
                        {aprov === "Aprovado" && 
                        <p id="m">Disponivel</p>
                        }
                        </div>


                        <div id="acbut">
                            <button onClick={() => clickButton()}>ATUALIZAR</button>
                            <button onClick={() => clickButtonDel()}>DELETAR</button>
                        </div>   
                    </div>

                    
                
                
            
        </div>
    )
}