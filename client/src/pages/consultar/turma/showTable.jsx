import React from "react";
import './showTable.css'



export default function ShowTable (props) {

    return(
        <div id="showTable-container">
            <p id="p-table">{props.one}</p>
        </div>
    );
}