import React from "react";

export default function Show (props) {
    return(
        <div id="show-container">
            <p>Nome: {props.nome}</p>
            <p>ID: {props.id}</p>
        
        </div>
    )
}