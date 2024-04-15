import axios from 'axios'

const GET_METHOD = async (link) => {
    try {
        const response = await axios.get(link);
        console.log(response.data);
        return response.data;
    }
    catch (error) {
        console.log('error retrieving data , logging in', error.message);
    }
}

const GET_POST_METHOD = async (link) => {
    try {
        const response = await axios.get('https://ilivesolutions.azurewebsites.net/api/IMUserRegistration/Registeration?' + link);
        console.log(response.data);
        return response.data;
    }
    catch (error) {
        console.log('error putting data , signing up', error.message);
    }
}


export { GET_METHOD, GET_POST_METHOD }