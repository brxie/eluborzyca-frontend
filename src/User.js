import User from './ApiClient/User'



const Auth = {
    async getUser() {
        try {
            let resp = await User.userGet();
            return resp.data
        } catch (error) {
            return null
        }
    },


    async createUser(name, pass, email, phone, cb) {
        let user = {
            "name": name,
            "pass": pass,
            "email": email,
            "phone": phone
        };

        try {
            let resp = await User.userPost(user)
            if (resp.status !== 200) {
                cb(null, Error('error: ' + resp.statusText))
            }
            cb(resp.data, null)
        } catch (error) {
            cb(null, error)
        }
    }
}



export default Auth;
