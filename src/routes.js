import React from "react";

import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'

import Tarefas from "./pages/client/Tarefas";
import Cadastro from "./pages/client/Cadastro";
import Home from "./pages/client/Home";

import PrivateRoute from './services/wAuth'

export const Rotas = () =>{

    
    return(
        <Router>
            <Routes>
                <Route path="/" exact element={<Home/>}/>
                <Route path="/Cadastro" exact element={<Cadastro/>}/>
                <Route path="/Tarefas" element={<PrivateRoute redirectTo='/Home'><Tarefas/></PrivateRoute>}/>
                <Route path="*" element={<Home></Home>}></Route>
            </Routes>
        </Router>
    )
}