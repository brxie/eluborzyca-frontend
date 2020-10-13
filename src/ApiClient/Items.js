import axios from 'axios';
import url from 'url'


const ITEMS_API_URL = url.resolve(process.env.REACT_APP_API_URL, "items");


const Items = {
    async itemsGet() {        
        return await axios({
                method: 'GET',
                url: ITEMS_API_URL
            }
        );
    }
}


export default Items
