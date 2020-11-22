import Categories from '../ApiClient/Categories'
import { allCategoriesCategory } from "../Constants";
import * as Lang from '../LangPL';


async function getCategories() {
    let resp = await Categories.categoriesGet();
    return resp.data
}
  

async function getMenuData() {
    let categories = await getCategories();
    categories.unshift(allCategoriesCategory)

    return [
        { name: Lang.HOME_PAGE, url: "/", icon: "home", id: 0 },
        {
        name: Lang.PRODUCT_CATEGORIES,
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