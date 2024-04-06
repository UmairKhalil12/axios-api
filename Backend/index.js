import axios from 'axios'

const GET_METHOD = async() =>{
    const response = axios.get('https://ilivesolutions.azurewebsites.net/api/IMUserRegistration/AdminLogin')
    return (await response).data
}