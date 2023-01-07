import { useState } from "react"
import { Link } from "react-router-dom"
import api from "../../services/api"

import styles from './Layout.module.css'
import Input from "../../components/Input"
import Message from "../../components/Message"
import Layout from "../../components/Layout"
import LayoutLado from "../../components/LayoutLado"
import ImgLogin from "../../assets/img/login-bg.png"




const Cadastro = () => {
    const [usuario, setUsuario] = useState("")
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [senhaConfirm, setSenhaConfirm] = useState("")

    const [warning, setWarning] = useState()

    const handleSubmit = async (e) => {

        e.preventDefault()
        if (email !== '' && senha !== '' && senhaConfirm !== '') {


            const data = {
                usuario: usuario,
                email: email,
                senha: senha,
                senhaConfirm: senhaConfirm
            }

            const response = await api.post('/api/cadastro', data)

            if (response.status === 201) {
                window.location.href = '/home'
            }
            else {
                setWarning(response.data.message)
            }

        } else {
            setWarning("Há campos vázios!")
        }

    }
    return (
        <Layout>
            <LayoutLado bg="#ffffff">
                <img src={ImgLogin} alt="login" />
            </LayoutLado>
            <LayoutLado bg="#008B8B">
                <div>
                    <h2>Cadastre uma conta no SaveTasks</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <Input value={usuario} onChange={(e) => setUsuario(e.target.value)} tipo="text" placeholder="Digite seu usuário" nome="Usuário"></Input>
                    <Input value={email} onChange={(e) => setEmail(e.target.value)} tipo="text" placeholder="Digite seu e-mail" nome="E-mail"></Input>
                    <Input value={senha} onChange={(e) => setSenha(e.target.value)} tipo="senha" placeholder="Digite sua senha" nome="Senha"></Input>
                    <Input value={senhaConfirm} onChange={(e) => setSenhaConfirm(e.target.value)} tipo="senha" placeholder="Digite sua senha novamente" nome="Confirm sua senha"></Input>
                    <Link to="/" className={styles.link}>Já possui uma conta?</Link>
                    {warning && <Message type="error" msg={warning}></Message>}
                    <Input tipo="submit" nome="Cadastro"></Input>
                </form>
            </LayoutLado>
        </Layout>
    )
}

export default Cadastro