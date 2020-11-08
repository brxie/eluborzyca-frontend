import Categories from '../ApiClient/Categories'
import { allCategoriesCategory } from "../Constants";


async function getCategories() {
    let resp = await Categories.categoriesGet();
    return resp.data
}
  

async function getMenuData() {
    let categories = await getCategories();
    categories.unshift(allCategoriesCategory)

    return [
        { name: "Home page", url: "/", icon: "home", id: 0 },
        {
        name: "Product categories",
        id: 1,
        children: categories.map((x, i) => {
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

export { getCategories, getMenuData };