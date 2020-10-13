import axios from 'axios';
import url from 'url'


const CATEGORIES_API_URL = url.resolve(process.env.REACT_APP_API_URL, "categories");


const Categories = {
    async categoriesGet() {        
        return await axios({
                method: 'GET',
                url: CATEGORIES_API_URL
            }
        );
    }
}


export default Categories
