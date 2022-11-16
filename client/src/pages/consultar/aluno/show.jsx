import React from "react";

export default function ShowAluno (props) {
    return(
        <div id="show-container">
            <p>Nome: {props.nome}</p>
            <p>CPF: {props.cpf}</p>
            <p>Sala: {props.sala}</p>
            <p>Matricula: {props.matricula}</p>         
        </div>
    )
}