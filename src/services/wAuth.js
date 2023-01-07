import React,{useEffect, useState} from "react";
import api from './api'
import {login,logout,getToken} from './auth'
import {Route, Navigate} from 'react-router-dom'
import { LinearProgress } from '@mui/material';

export default function WAuth({children, redirectTo}){
    const [redirect,setRedirect] = useState(false)
    const [loading,setLoading] = useState(true)

    useEffect(() =>{
        try{
            const verify = async () =>{
            
                const res = await api.get('/api/checktoken',{params:{token:getToken()}})
                 
                if(res.data.status===200){
                    setLoading(false)
                    setRedirect(false)
                }else{
                    logout()
                    setLoading(false)
                    setRedirect(true)
                }
            }
            verify()
        }catch(err){
            console.log(err)
        }

    },[])

    return loading?<LinearProgress></LinearProgress>:!redirect? children : <Navigate to={redirectTo}/>
};

