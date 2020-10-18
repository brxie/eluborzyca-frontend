import Items from './ApiClient/Items'
import Categories from './ApiClient/Categories'


async function getItems(includeInactive) {
  try {
    let resp = await Items.itemsGet();

    if (includeInactive) {
      return resp.data
    }
    return resp.data.filter(x => x.active)
  } catch (error) {
    return []
  }
}

async function getItem(id) {
  try {
    let resp = await Items.itemGet(id);
    return resp.data
  } catch (error) {
    return []
  }
}

async function deleteItem(id) {
  try {
    let resp = await Items.itemDelete(id);
    return resp.data
  } catch (error) {
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

export { getItems, getCategories, getMenuData, getItem, deleteItem };
