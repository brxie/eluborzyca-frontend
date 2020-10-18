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
    },

    async itemGet(id) {        
        return await axios({
                method: 'GET',
                url: ITEMS_API_URL + "/" + id
            }
        );
    },

    async itemPost(payload) {        
        return await axios({
                method: 'POST',
                url: ITEMS_API_URL,
                data: payload,
                withCredentials: true
            }
        );
    },

    async itemPut(id, payload) {        
        return await axios({
                method: 'PUT',
                url: ITEMS_API_URL + "/" + id,
                data: payload,
                withCredentials: true
            }
        );
    },

    async itemDelete(id) {        
        return await axios({
                method: 'DELETE',
                url: ITEMS_API_URL + "/" + id
            }
        );
    }
}


export default Items
