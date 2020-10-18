import axios from 'axios';
import url from 'url'


const UNITS_API_URL = url.resolve(process.env.REACT_APP_API_URL, "units");


const Units = {
    async unitsGet() {        
        return await axios({
                method: 'GET',
                url: UNITS_API_URL
            }
        );
    }
}


export default Units
