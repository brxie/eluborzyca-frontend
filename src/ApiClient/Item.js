import axios from 'axios';
import url from 'url'


const ITEM_API_URL = url.resolve(process.env.REACT_APP_API_URL, "item");


const Item = {

    async itemGet(id) {        
        return await axios({
                method: 'GET',
                url: ITEM_API_URL + "/" + id
            }
        );
    },

    async itemPost(payload) {        
        return await axios({
                method: 'POST',
                url: ITEM_API_URL,
                data: payload,
                withCredentials: true
            }
        );
    },

    async itemPut(id, payload) {        
        return await axios({
                method: 'PUT',
                url: ITEM_API_URL + "/" + id,
                data: payload,
                withCredentials: true
            }
        );
    },

    async itemPatch(id, payload) {        
        return await axios({
                method: 'PATCH',
                url: ITEM_API_URL + "/" + id,
                data: payload,
                withCredentials: true
            }
        );
    },

    async itemDelete(id) {        
        return await axios({
                method: 'DELETE',
                url: ITEM_API_URL + "/" + id,
                withCredentials: true
            }
        );
    }
}


export default Item
