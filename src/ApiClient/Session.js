import axios from 'axios';
import url from 'url'

const SESSION_API_URL = url.resolve(process.env.REACT_APP_API_URL, "session");


const Session = {
    // Cookie check
    async sessionGet() {        
        return await axios({
                method: 'GET',
                url: SESSION_API_URL,
                withCredentials: true
            }
        );
    },

    // Log In
    async sessionPost(name, pass) {
        return await axios({
            method: 'POST',
            url: SESSION_API_URL,
            data: {
                "username": name,
                "password": pass
            },
            withCredentials: true
        });
    },

    // Logout
    async sessionDelete() {
        await axios({
            method: 'DELETE',
            url: SESSION_API_URL,
            withCredentials: true
        }); 
    }
}


export default Session
