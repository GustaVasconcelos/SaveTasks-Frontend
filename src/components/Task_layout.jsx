
import styles from './Layout.module.css'

const Tasks_layout = (props) =>{
    return (
        <div className={styles.Tasks_layout}>
            {props.children}
        </div>
    )
}

export default Tasks_layout