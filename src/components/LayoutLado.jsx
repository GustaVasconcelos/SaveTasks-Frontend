import styles from './Layout.module.css'

const LayoutLado = (props) =>{
    const estilo = {
        'backgroundColor':props.bg
    }
    return (
        <div className={styles.container_LayoutLado} style={estilo}>
            {props.children}
        </div>
    )
}

export default LayoutLado