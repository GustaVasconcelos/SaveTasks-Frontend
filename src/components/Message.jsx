import styles from './Message.module.css'
import { useState, useEffect } from 'react'

const Message = ({type, msg}) =>{
    const [visible, setVisible] = useState(false)

    useEffect(() =>{
        if(!msg){

            return setVisible(false)
        }
        setVisible(true)

        const timer = setTimeout(() =>{
            setVisible(false)
        },4000)

        return () => clearTimeout(timer)

    },[msg]
    )

    return(
        <>
            {visible &&(
                <div className={`${styles.message} ${styles[type]}`}>
                    <p>{msg}</p>
                </div>
            )}
        </>

        
    )
}

export default Message