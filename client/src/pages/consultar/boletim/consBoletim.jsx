import React, {useState} from "react";
import Axios from 'axios'
import Show from './show'


export default function ConsBoletim () {

    const [values, setValues] = useState()
    const [nomeAluno, setNomeAluno] = useState()
    const [id_aluno, setId_Aluno] = useState()
    const [turma, setTurma] = useState()
    const [nota_final, setNota_final] = useState()
    const [situacao, setSituacao] = useState()

    const handleChangeValues = (value) => {
        setValues((prevValue) => ({
            ...prevValue,
            [value.target.name]: value.target.value,
        }))
    }

    //envia os dados atualizados
    const clickButton = () => {
        Axios.post("http://localhost:8080/atualizar/boletim", {
            turma: values.turma,
            nota_final: values.nota_final,
        }).then((response) => {
            console.log(response)
            alert("Atualizado com sucesso!")
        })
    }



    
    const Consultar = () => {
        enviarCpf()
        setTimeout(() => {
            pegarDados()
        }, 1000)
    } 

    const ConsultarB = () => {
        enviarId();
        setTimeout(() => {
            pegarDadosB()
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
            setNomeAluno(response.data.rows[0].nome) 
            setId_Aluno(response.data.rows[0].numero_matricula)        
        })
    }

    const enviarId = () => {
        Axios.post("http://localhost:8080/consultar/boletim", {
            aluno: id_aluno
        }).then((response) => {
            console.log(response)
        })
    }

    const pegarDadosB = () => {
        Axios.get("http://localhost:8080/consultar/boletim").then((response) => {
            console.log(response.data.rows)
            setTurma(response.data.rows[0].turma) 
            setNota_final(response.data.rows[0].nota_final)
            setSituacao(response.data.rows[0].aprovacao)           
        })
    }


    const clickButtonDel = () => {
        Axios.post("http://localhost:8080/deletar/boletim", {
            aluno: id_aluno
        }).then((response) => {
            console.log(response)
            setId_Aluno()
            setNomeAluno()
            setNota_final()
            setSituacao()
            setTurma()
            setNota_final()
            alert("Deletado com sucesso!")
        })
    }


    return(
        <div id="cons-prof-container">
                    <div id="cpf">
                        <input type="text" name="cpf" placeholder="Cpf" onChange={(handleChangeValues)} />
                        <button id="cons" onClick={() => Consultar()}>Consultar</button>
                        <button id="cons" onClick={() => ConsultarB()}>Trazer Boletim</button>
                    </div>

                    <Show idAluno={id_aluno} nome={nomeAluno} turma={turma} nf={nota_final} situacao={situacao}/>

                    <div id="form">
                        <input type="text" name="turma" placeholder="Turma" onChange={handleChangeValues} defaultValue={turma}/>
                        <input type="text" name="nota_final" placeholder="Nota Final" onChange={handleChangeValues} defaultValue={nota_final}/>

                        <div id="acbut">
                            <button onClick={() => clickButton()}>ATUALIZAR</button>
                            <button onClick={() => clickButtonDel()}>DELETAR</button>
                        </div>   
                    </div>

                    
                
                
            
        </div>
    )
}