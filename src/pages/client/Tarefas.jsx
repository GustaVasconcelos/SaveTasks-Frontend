import { useState, useEffect } from "react"

import Layout from "../../components/Layout"
import LayoutLado from "../../components/LayoutLado"
import Input from "../../components/Input"
import api from "../../services/api"
import { getToken, logout, getIdUsuario } from "../../services/auth"
import styles from './Tarefas.module.css'
import Tasks_layout from "../../components/Task_layout"
import Message from "../../components/Message"
import { LinearProgress } from '@mui/material';


const Tarefas = () => {

    const [usuario, setUsuario] = useState()
    const [isLoading, setLoading] = useState(false)
    const [tarefa, setTarefa] = useState()
    const [warning, setWarning] = useState()


    const endSession = async () => {
        try {
            const response = await api.get('/api/destroytoken', { headers: { token: getToken() } })
            console.log(response)

            if (response.status === 200) {
                logout()

                window.location.href = '/Home'
            } else {
                alert("Não foi possivel encerrar a sessão")
            }
        } catch (err) {
            console.log(err)
        }


    }
    const addTask = async () => {

        try {

            if (tarefa === '' || tarefa === undefined) {
                setWarning("Campo vázio")
            } else {
                const data = {
                    _id: getIdUsuario(),
                    tarefa: tarefa
                }

                const response = await api.patch('/api/addtarefa', data)


                if (response.status === 200) {
                    setWarning(response.data.message)

                }
            }

        } catch (err) {
            console.log(err)
        }

    }

    const delTask = async (id) => {

        try {

            const data = {
                _id: getIdUsuario(),
                id: id
            }


            const response = await api.patch('/api/deltarefa', data)


            if (response.status === 200) {
                setWarning(response.data.message)

            }
        } catch (err) {
            console.log(err)
        }
    }
    const loadUser = async () => {
        try {
            const data = {
                headers: { id: getIdUsuario() }
            }
            const response = await api.get('/api/usuario', data)
            setUsuario(response.data)
            setLoading(true)
        } catch (err) {
            console.log(err)
        }

    }
    useEffect(() => {
        loadUser()
    })


    return (
        <Layout>
            {isLoading === true ? (
                <>
                    <LayoutLado bg="#008B8B">
                        <>
                            <h2>Olá {usuario.usuario}, seja bem vindo ao SaveTasks</h2>
                            <h3>Adicione sua tarefa</h3>
                            <Input tipo="text" value={tarefa} onChange={(e) => setTarefa(e.target.value)} placeholder="Digite sua tarefa" nome="Task"></Input>

                            <div className={styles.container_botoes}>
                                <Input tipo="submit" onClick={addTask} nome="Adicionar"></Input>
                                <Input tipo="submit" nome="Logout" onClick={endSession}></Input>
                            </div>

                        </>



                        {warning === "Campo vázio" ? (<Message type="error" msg={warning}></Message>) : (
                            <Message type="sucess" msg={warning}></Message>
                        )}

                    </LayoutLado>
                    <LayoutLado bg="#008B8B">
                        <Tasks_layout>
                            <>
                                <div className={styles.task_header}>
                                    <h2>Suas tarefas</h2>
                                </div>
                                <div className={styles.task_body}>
                                    {usuario.tasks.length > 0 ?
                                        (
                                            usuario.tasks.map((el) => (
                                                <div className={styles.task_children}>
                                                    <div className={styles.task_name}>
                                                        <h4 key={el.id}>{el.tarefa}</h4>
                                                    </div>
                                                    <div className={styles.task_del}>
                                                        <button type="submit" onClick={() => delTask(el.id)} className={styles.task_button_remove}>x</button>
                                                    </div>

                                                </div>
                                            ))
                                        ) : (
                                            <h5>Nenhuma tarefa adicionada</h5>
                                        )}
                                </div>
                            </>


                        </Tasks_layout>

                    </LayoutLado>
                </>
            ) : (
                <LinearProgress></LinearProgress>
            )}

        </Layout>




    )
}

export default Tarefas