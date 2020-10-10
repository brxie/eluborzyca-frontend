import axios from 'axios';
import Cookies from 'universal-cookie';

// Simulate authentication service
const Auth = {

    async sessionGet(cb) {
        try {
            let resp = await axios({
                method: 'GET',
                url: 'http://localhost:3050/api/session',
                withCredentials: true
            });

            cb(resp.data, null)
        } catch (error) {
            cb(null, error)
        }
    },

    async sessionCreate(name, pass, cb) {
        let res = {
            userName: null,
            unauthorized: true
        };

        try {
            await axios({
                method: 'POST',
                url: 'http://localhost:3050/api/session',
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

    async sessionDestroy(cb) {
        try {
            await axios({
                method: 'DELETE',
                url: 'http://localhost:3050/api/session',
                withCredentials: true
            });
            
            cb(null)
        } catch (error) {
            cb(error)
        }
        new Cookies().remove('SESSION_ID', { path: '/api' });
    }
};

export default Auth;
