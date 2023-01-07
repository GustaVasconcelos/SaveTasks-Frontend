import { useState } from "react"
import { Link } from "react-router-dom"

import Layout from "../../components/Layout"
import LayoutLado from "../../components/LayoutLado"
import ImgLogin from "../../assets/img/login-bg.png"
import styles from './Layout.module.css'
import Input from "../../components/Input"
import Message from "../../components/Message"


import { login, setIdUsuario, setNomeUsuario } from '../../services/auth'
import api from "../../services/api"




const Home = (e) => {

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [warning, setWarning] = useState()

    const handleSubmit = async () => {
        try {
            const data = {
                email: email,
                senha: senha
            }

            const response = await api.post('/api/login',data)

            if (response.status === 200) {

                if (response.data.status === 1) {
                    login(response.data.token)
                    setIdUsuario(response.data.id_client)
                    setNomeUsuario(response.data.username)

                    setWarning(response.data.message)

                    window.location.href = '/tarefas'
                } else if (response.data.status === 2) {
                    setWarning(response.data.message)
                }
            }

        } catch (err) {
            console.log(err)
        }

    }
    return (
        <Layout>
            <LayoutLado bg="#ffffff">
                <img src={ImgLogin} alt="login" />
            </LayoutLado>
            <LayoutLado bg="#008B8B">
                <div>
                    <h2>Seja bem vindo ao SaveTasks</h2>
                </div>
                <div className={styles.form} >
                    <Input tipo="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Digite seu e-mail" nome="E-mail"></Input>
                    <Input tipo="senha" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="Digite sua senha" nome="senha"></Input>
                    <Link to="/Cadastro" className={styles.link}>Não possui uma conta?</Link>
                    {warning && <Message type="error" msg={warning}></Message>}
                    <Input tipo="submit" nome="login" onClick={handleSubmit} ></Input>
                </div>
            </LayoutLado>
        </Layout>
    )
}

export default Home