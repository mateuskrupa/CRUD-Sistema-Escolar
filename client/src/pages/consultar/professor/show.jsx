import React from "react";

export default function Show (props) {
    return(
        <div className="container">
            <h1>{props.nome}</h1>
            <h1>{props.cpf}</h1>
            <h1>{props.ta}</h1>
            <h1>{props.disciplina}</h1>
        </div>
    )
}