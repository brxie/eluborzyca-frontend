import axios from 'axios';
import url from 'url'


const ITEMS_API_URL = url.resolve(process.env.REACT_APP_API_URL, "items");
const CATEGORIES_API_URL = url.resolve(process.env.REACT_APP_API_URL, "categories");


// Our product database.
async function getItems() {
  try {
    let resp = await axios({
        method: 'GET',
        url: ITEMS_API_URL
    });

    return resp.data
  } catch (error) {
    return []
  }
}

async function getCategories() {
  try {
    let resp = await axios({
        method: 'GET',
        url: CATEGORIES_API_URL
    });

    return resp.data
  } catch (error) {
    return []
  }
}

async function getMenuData() {
  let cat = await getCategories();
  
  return [
    { name: "Home page", url: "/", icon: "home", id: 0 },
    {
      name: "Product categories",
      id: 1,
      children: cat.map((x, i) => {
        return {
          name: x.name,
          id: i,
          url: "/?category=" + x.name,
          icon: x.icon
        };
      })
    }
  ];  
}

export { getItems, getCategories, getMenuData };
