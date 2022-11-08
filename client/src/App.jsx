import React from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import styles from './App.css'
import Cadastrar from './pages/cadastrar/cadastrar'
import Atualizar from './pages/atualizar/atualizar'
import Consultar from './pages/consultar/consultar'
import Prof from './pages/cadastrar/professor/cad_prof'
import ConsProf from './pages/consultar/professor/consProf'

function App() {



  return (
    <Router>
      <div className="container">
        <h1>Escola zika</h1>
        
        <a href="/cadastrar">CADASTRAR</a>
        <a href="/consultar">CONSULTAR / ATUALIZAR</a>
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

        <Route exact path="/consultar/professor">
          <ConsProf />
        </Route>


      </Switch>

      

    </Router>
  );
}

export default App;
