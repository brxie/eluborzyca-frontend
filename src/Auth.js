import axios from 'axios';
import Cookies from 'universal-cookie';
import url from 'url'


const SESSION_COOKIE_KEY = "SESSION_ID"
const SESSION_API_URL = url.resolve(process.env.REACT_APP_API_URL, "session");

const Auth = {

    async sessionGet(cb) {        
        try {
            let resp = await axios({
                method: 'GET',
                url: SESSION_API_URL,
                withCredentials: true
            });

            cb(resp.data, null)
        } catch (error) {
            cb(null, error)
        }
    },

    // Log In
    async sessionCreate(name, pass, cb) {
        let res = {
            userName: null,
            unauthorized: true
        };

        try {
            await axios({
                method: 'POST',
                url: SESSION_API_URL,
                data: {
                    "username": name,
                    "password": pass
                },
                withCredentials: true
            });


            res.userName = name;
            res.unauthorized = false;
            cb(res, null)

        } catch (error) {
            if (error.response && error.response.status === 401) {
                cb(res, null)
            }
            cb(null, error.message)
        }
    },

    // Logout
    async sessionDestroy(cb) {
        try {
            await axios({
                method: 'DELETE',
                url: SESSION_API_URL,
                withCredentials: true
            });
            
            cb(null)
        } catch (error) {
            cb(error)
        }
        new Cookies().remove(SESSION_COOKIE_KEY, { path: '/api' });
    }
};

export default Auth;
