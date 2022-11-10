import React from "react";

export default function Show (props) {
    return(
        <div id="show-container">
            <p>Id Aluno: {props.idAluno}</p>
            <p>Nome: {props.nome}</p>
            <p>Nota Final: {props.nf}</p>
            <p>Situação: {props.situacao}</p>          
        </div>
    )
}
