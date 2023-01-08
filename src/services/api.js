import axios from 'axios'


const api = axios.create({
    baseURL:"https://savetasks.vercel.app/"
})



export default api
