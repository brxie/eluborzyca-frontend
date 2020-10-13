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


    async createUser(name, pass, email, phone, role, cb) {
        let user = {
            "name": name,
            "pass": pass,
            "email": email,
            "phone": phone,
            "role": role
        };

        try {
            let resp = await User.userPost(user)
            cb(resp.data, null)
        } catch (error) {
            cb(null, error.message)
        }
    }
}



export default Auth;
