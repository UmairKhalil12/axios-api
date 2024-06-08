import axios from 'axios';
import { userLogin } from '../store/userSlice';
import { userInfo } from '../store/userSlice';

const GET_METHOD = async (link, dispatch) => {
    try {
        const response = await axios.get(link);

        console.log('get method', response.data);
        if (Array.isArray(response.data) && response.data.length > 0) {
            dispatch(userLogin(true));
            dispatch(userInfo(response.data));
        }
        else {
            window.alert("enter correct credentials");
        }

        return response.data;
    } catch (error) {
        console.log('error logging in', error.message);
        console.log(error);
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
        }
    } else {
        window.alert('User is already signed in');
    }
};

const INSERT_DATA = async (link, dispatch) => {
    try {
        const response = await axios.get(link);
        console.log(response.data);

        if (Array.isArray(response.data) && response.data.length > 0) {
            // dispatch(businessInfo(response.data));
            console.log(response.data);
        }
        else {
            window.alert("enter correct information about business");
        }


        return response.data;
    }
    catch (error) {
        console.log('error adding data', error.message);
        console.log('error adding data', error);
    }
}

const UPDATE_DATA = async (link) => {
    try {
        const response = await axios.get(link);
        console.log(response.data);
        return response.data;

    }
    catch (error) {
        console.log('error updating data', error.message);
        console.log('error updating data', error);
    }
}

const GET_DATA_BY_USER = async (link) => {
    try {
        const response = await axios.get(link);

        if (Array.isArray(response.data) && response.data.length > 0) {
            // console.log('get data by user', response.data);
            return response.data;
        }
    }
    catch (error) {
        console.log('error getting data by user', error.message);
        console.log('error getting data by user', error)
    }
}

const GET_UPDATE_BY_USER = async (link) => {
    try {
        const response = await axios.get(link);

        if (Array.isArray(response.data) && response.data.length > 0) {
            console.log('get updated data by user', response.data);
            return response.data;
        }
    }
    catch (error) {
        console.log('Error updating data', error.message);
        console.log('Error updating data', error);
    }
}

const GET_BUSINESS_BY_ID = async (link) => {
    try {
        const response = await axios.get(link);
        if (Array.isArray(response.data) && response.data.length > 0) {
            console.log('get business by id', response.data);
            return response.data;
        }
    }
    catch (error) {
        console.log('Error getting business by id', error.message);
        console.log('Error getting business by id', error);
    }
}

const GET_DELETE_BY_ID = async (link) => {
    try {
        const response = await axios.delete(link);

        if (Array.isArray(response.data) && response.data.length > 0) {
            console.log('get updated data by user', response.data);
            return response.data;
        }
    }
    catch (error) {
        console.log('Error deleting data', error.message);
        console.log('Error deleting data', error);
    }
}

export {
    GET_METHOD,
    GET_POST_METHOD,
    INSERT_DATA,
    UPDATE_DATA,
    GET_DATA_BY_USER,
    GET_UPDATE_BY_USER,
    GET_DELETE_BY_ID,
    GET_BUSINESS_BY_ID
};
