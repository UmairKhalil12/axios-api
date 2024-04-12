import axios from 'axios'

const GET_METHOD = async (link) => {
    try {
        const response = await axios.get('https://ilivesolutions.azurewebsites.net/api/IMUserRegistration/AdminLogin' + link)
        return response.data;
    }
    catch (error) {
        console.log('error retrieving data , logging up', error.message);
    }
}

const GET_POST_METHOD = async (link) => {
    try {

    }
    catch (error) {
        console.log('error putting data , signing up', error.message)
    }
}


export {GET_METHOD , GET_POST_METHOD }