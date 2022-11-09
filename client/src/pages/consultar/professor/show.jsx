import React from "react";
import './show.css'

export default function Show (props) {
    return(
        <div id="show-container">
            <p>Nome: {props.nome}</p>
            <p>CPF: {props.cpf}</p>
            <p>Título Acadêmico: {props.ta}</p>
            <p>Disciplina: {props.disciplina}</p>
        </div>
    )
}