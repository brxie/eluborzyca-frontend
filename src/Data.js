import Items from './ApiClient/Items'
import Categories from './ApiClient/Categories'



// Our product database.
async function getItems() {
  try {
    let resp = await Items.itemsGet();

    return resp.data
  } catch (error) {
    console.log(error)
    return []
  }
}

async function getCategories() {
  try {
    let resp = await Categories.categoriesGet();
    return resp.data
  } catch (error) {
    return []
  }
}

async function getMenuData() {
  let categories = await getCategories();

  console.log("categories: " + categories)
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

export { getItems, getCategories, getMenuData };
