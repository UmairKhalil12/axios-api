import axios from 'axios';
import { userLogin } from '../store/userSlice';

const GET_METHOD = async (link, dispatch) => {
    try {
        const response = await axios.get(link);

        // --- FOR LOCAL STORAGE ---- // 
        // localStorage.setItem('user', true);
        // window.location.reload();

        // --- FOR REDUX STORE ---- //

        console.log('get method', response.data);
        if (Array.isArray(response.data) && response.data.length > 0) {
            // Dispatch only if response data is not empty
            dispatch(userLogin(true));
        }
        else {
            window.alert("enter correct credentials");
        }

        return response.data;
    } catch (error) {
        console.log('error retrieving data, logging in', error.message);
        console.log(error);
        // You might want to handle errors here or propagate them to the caller
    }
};

const GET_POST_METHOD = async (link) => {
    let userAuthenticated = localStorage.getItem('user');
    if (userAuthenticated === 'false') {
        try {
            const response = await axios.get(link);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.log('error putting data , signing up', error.message);
            // You might want to handle errors here or propagate them to the caller
        }
    } else {
        window.alert('User is already signed in');
        // You might want to handle this scenario differently, such as redirecting the user
    }
};

export { GET_METHOD, GET_POST_METHOD };
