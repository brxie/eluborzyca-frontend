import axios from 'axios';
import url from 'url'

const USER_API_URL = url.resolve(process.env.REACT_APP_API_URL, "user");


const User = {
    // User get
    async userGet(name) {        
        return await axios({
                method: 'GET',
                url: url.resolve(USER_API_URL, name)
            }
        );
    },

    // user create
    async userPost(user) {
        return await axios({
            method: 'POST',
            url: USER_API_URL,
            data: {
                "username": user.name,
                "password": user.pass,
                "email": user.email,
                "phone": user.phone
            }
        });
    },
}


export default User
