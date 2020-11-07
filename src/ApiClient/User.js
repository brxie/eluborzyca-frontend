import axios from 'axios';
import url from 'url'

const USER_API_URL = url.resolve(process.env.REACT_APP_API_URL, "user");


const User = {
    // User get
    async userGet() {        
        return await axios({
                method: 'GET',
                url: USER_API_URL,
                withCredentials: true
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

    // user update
    async userPut(user) {
        return await axios({
            method: 'PUT',
            url: USER_API_URL,
            withCredentials: true,
            data: {
                username: user.username,
                village: user.village,
                homeNumber: user.homeNumber,
                phone: user.phone,
            }
        });
    },
}


export default User
