
import Cookies from 'universal-cookie';
import Session from './ApiClient/Session'


const SESSION_COOKIE_KEY = "SESSION_ID"

const Auth = {

    async sessionGet(cb) {        
        try {
            let resp = await Session.sessionGet()
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
            await Session.sessionPost(name, pass)
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
            await Session.sessionDelete()
            cb(null)
        } catch (error) {
            cb(error)
        }
        new Cookies().remove(SESSION_COOKIE_KEY, { path: '/api' });
    }
};

export default Auth;
