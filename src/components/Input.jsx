import styles from './Input.module.css'
const Input = (props) =>{

    if(props.tipo === "submit"){
        return(
                <div className={styles.container_botoes}>
                    <input type="submit" onClick={props.onClick}value={props.nome}/>
                </div>
        )
    }else if(props.tipo === "senha"){
        return(

            <div className={styles.inputBox}>
                <input value={props.value} onChange={props.onChange} type="password" placeholder={props.placeholder}/>
                <span>{props.nome}</span>
            </div>

        )
    }else if(props.tipo === "text"){
        return(
            <div className={styles.inputBox}>
                <input value={props.value} onChange={props.onChange}type="text" placeholder={props.placeholder}/>
                <span>{props.nome}</span>
            </div>
        )
    }
}

export default Input