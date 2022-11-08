import React, {useState} from "react";
import Axios from 'axios'

export default function AtuProf () {

    const [values, setValues] = useState()

    const handleChangeValues = (value) => {
        setValues((prevValue) => ({
            ...prevValue,
            [value.target.name]: value.target.value,
        }))
    }



    const clickButton = () => {
        Axios.post("http://localhost:8080/cadastrar/professor", {
            nome: values.nome,
            cpf: values.cpf,
            ta: values.ta,
            disciplina: values.disciplina,
        }).then((response) => {
            console.log(response)
        })
    }






    return(
        <div className="container">
            
                <input type="text" name="nome" placeholder="Nome" onChange={handleChangeValues}/>
                <input type="text" name="cpf" placeholder="Cpf" onChange={handleChangeValues}/>
                <input type="text" name="ta" placeholder="Titulo Academico" onChange={handleChangeValues}/>
                <input type="text" name="disciplina" placeholder="Disciplina" onChange={handleChangeValues}/>

                <button>Pesquisar</button>
                <button onClick={() => clickButton()}>Atualizar</button>
            
        </div>
    )
}