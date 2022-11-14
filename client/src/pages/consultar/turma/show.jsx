import React from "react";


export default function Show (props) {
    return(
        <div id="show-container">
            <p>N° Turma: {props.id_turma}</p>
            <p>Professor: {props.professor}</p>
            <p>Disciplina: {props.disciplina}</p>
            <p>Sala: {props.sala}</p>          
        </div>
    )
}
