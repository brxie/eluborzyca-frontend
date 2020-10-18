import axios from 'axios';
import url from 'url'


const VILLAGES_API_URL = url.resolve(process.env.REACT_APP_API_URL, "villages");


const Villages = {
    async villagesGet() {        
        return await axios({
                method: 'GET',
                url: VILLAGES_API_URL
            }
        );
    }
}


export default Villages
