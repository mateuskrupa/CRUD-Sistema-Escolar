import React from "react";
import styles from './cadastrar.css'

export default function Cadastrar () {
    return(
        <div className="container-2">
            <a id="a" href="/cadastrar/professor">PROFESSOR</a>
            <a id="a" href="/cadastrar/aluno">ALUNO</a>
            <a id="a" href="/cadastrar/boletim">BOLETIM</a>
            <a id="a" href="/cadastrar/turma">TURMA</a>
        </div>
    );
}