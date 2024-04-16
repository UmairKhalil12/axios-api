import axios from 'axios'


const GET_METHOD = async (link) => {
    try {
        const response = await axios.get(link);
        console.log('getmethod', response.data);
        let userAuthenticated = localStorage.getItem('user');
        if (!userAuthenticated) {
            userAuthenticated = true;
            localStorage.setItem('user', userAuthenticated);
        }
        return response.data;
    }
    catch (error) {
        console.log('error retrieving data , logging in', error.message);
    }
}

const GET_POST_METHOD = async (link) => {
    let userAuthenticated = localStorage.getItem('user');
    if (!userAuthenticated) {
        try {
            const response = await axios.get(link);
            console.log(response.data);
            return response.data;
        }
        catch (error) {
            console.log('error putting data , signing up', error.message);
        }
    }
    else{
        window.alert('user is already signedin'); 
    }

}


export { GET_METHOD, GET_POST_METHOD }