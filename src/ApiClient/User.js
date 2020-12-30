import fetch from 'node-fetch';
import url from 'url'

const USER_API_URL = url.resolve(process.env.REACT_APP_API_URL, "user");


const User = {
    // User get
    async userGet() {        
        return await fetch(USER_API_URL,
            {
                url: USER_API_URL,
                credentials: 'include'
            }
        );
    },

    // user create
    async userPost(user) {
        return await fetch(USER_API_URL,
        {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            },
        });
    },

    // user update
    async userPut(user) {
        return await fetch(USER_API_URL,
        {
            method: 'PUT',
            credentials: 'include',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            },
        });
    },

    
    // Verify
    async verify(token) {
        return await fetch(USER_API_URL + "/verify/" + token,
        {
            method: 'POST',
        }); 
    }
}


export default User
