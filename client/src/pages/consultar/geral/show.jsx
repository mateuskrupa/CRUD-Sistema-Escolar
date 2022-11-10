import React from "react";
import './show.css'

export default function ShowTable (props) {
    return(
        <div className="container-show-geral">
            <p id="p">{props.one}</p>
            <p id="p">{props.two}</p>
            <p id="p">{props.three}</p>
            <p id="p">{props.four}</p>
            <p id="p">{props.five}</p>
        </div>
    );
}