import Items from '../ApiClient/Items'
import Categories from '../ApiClient/Categories'
import Villages from '../ApiClient/Villages'
import Units from '../ApiClient/Units'
import { allCategoriesCategory } from "../Constants";


async function newItem(item) {
  try {
    var resp = Items.itemPost(item)
  } catch (error) {
    console.log("Create item error: " + JSON.stringify(error))
    throw new Error('Create item failed: ' + resp.statusText)
  }
  
  var r = (await resp)
  if((r.status)!== 201) {
    throw new Error('Create item failed: ' + r.statusText + ", " +
                    JSON.stringify(r.data))
  }
  return r.data
}

async function updateItem(id, item) {
  try {
    var resp = Items.itemPut(id, item)
  } catch (error) {
    console.log("Update item error: " + JSON.stringify(error))
    throw new Error('Update item failed: ' + resp.statusText)
  }
  
  var r = (await resp)
  if((r.status)!== 200) {
    throw new Error('Update item failed: ' + r.statusText + ", " +
                    JSON.stringify(r.data))
  }
  return r.data
}

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
    let resp = await Items.itemGet(id);
    return resp.data
}

async function deleteItem(id) {
  try {
    let resp = await Items.itemDelete(id);
    return resp.data
  } catch (error) {
    console.log("Delete item error: " + JSON.stringify(error))
    return {}
  }
}

async function getCategories() {
  let resp = await Categories.categoriesGet();
  return resp.data
}

async function getVillages() {
    let resp = await Villages.villagesGet();
    return resp.data
}

async function getUnits() {
  let resp = await Units.unitsGet();
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

export { getItems, getCategories, getVillages, getUnits, getMenuData, getItem, deleteItem, newItem, updateItem };
