import axios from 'axios';
import url from 'url'

const IMAGES_API_URL = url.resolve(process.env.REACT_APP_API_URL, "images");


const Images = {
    // Image get
    async imageGet(filename) {
        return await axios({
                method: 'GET',
                url: IMAGES_API_URL + "/" + filename
            }
        );
    },

    // image upload
    async imagePost(image) {
        var formData = new FormData();
        formData.append("file", image);

        return await axios({
            method: 'POST',
            url: IMAGES_API_URL,
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
}


export default Images
