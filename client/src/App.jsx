import React from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import styles from './App.css'
import Cadastrar from './pages/cadastrar/cadastrar'
import Atualizar from './pages/atualizar/atualizar'
import Consultar from './pages/consultar/consultar'
import Logo from './logo.png'
import Prof from './pages/cadastrar/professor/cad_prof'
import Aluno from './pages/cadastrar/aluno/cad_aluno'
import Boletim from './pages/cadastrar/boletim/cad_boletim'
import ConsAluno from './pages/consultar/aluno/consAluno'
import ConsProf from './pages/consultar/professor/consProf'


function App() {



  return (
    <Router>
      <div id="container">
        <div id="topo">
        <img src={Logo} alt="" />
        <div id="dadose">
        <h1>Escola IMPERADOR</h1>
        <h4>CNPJ: 10.935.176/0001-99</h4>
        <h4>Endereço: Rua das Laranjeiras 587 São Paulo-SP</h4>
        </div>

        </div>
        
        <a id="a" href="/cadastrar">CADASTRAR</a>
        <a id="a" href="/consultar">CONSULTAR / ATUALIZAR</a>
      </div>

      <Switch>
        <Route exact path="/cadastrar">
          <Cadastrar />
        </Route>

        <Route exact path="/consultar">
          <Consultar />
        </Route>


        <Route exact path="/cadastrar/professor">
          <Prof />
        </Route>

        <Route exact path="/cadastrar/aluno">
          <Aluno />
        </Route>

        <Route exact path="/cadastrar/boletim">
          <Boletim />
        </Route>

        <Route exact path="/consultar/professor">
          <ConsProf />
        </Route>

        <Route exact path="/consultar/aluno">
          <ConsAluno />
        </Route>


      </Switch>

      

    </Router>
  );
}

export default App;
