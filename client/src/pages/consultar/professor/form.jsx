import React from "react";

export default function Form (props) {
    return(
        <div className="container">
            <input type="text" name="nome" placeholder={props.nome}/>
            <input type="text" name="cpf" placeholder={props.cpf}/>
            <input type="text" name="ta" placeholder={props.ta}/>
            <input type="text" name="disciplina" placeholder={props.disciplina}/>
        </div>
    )
}