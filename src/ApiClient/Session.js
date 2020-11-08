import fetch from 'node-fetch';
import url from 'url'

const SESSION_API_URL = url.resolve(process.env.REACT_APP_API_URL, "session");


const Session = {
    // Cookie check
    async sessionGet() {        
        return await fetch(SESSION_API_URL, 
            {
                method: 'GET',
                credentials: 'include'
            }
        );
    },

    // Log In
    async sessionPost(email, pass) {
        return await fetch(SESSION_API_URL,
            {
            method: 'POST',
            body: JSON.stringify({
                "email": email,
                "password": pass
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });
    },

    // Logout
    async sessionDelete() {
        await fetch(SESSION_API_URL,
            {
            method: 'DELETE',
            credentials: 'include'
        }); 
    }
}


export default Session
