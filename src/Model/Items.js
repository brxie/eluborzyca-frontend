import Items from '../ApiClient/Items'
import Item from '../ApiClient/Item'
import * as Lang from '../LangPL';



async function newItem(item) {
    try {
        var resp = Item.itemPost(item)
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
          var resp = Item.itemPut(id, item)
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

    async function activateItem(id, item) {
      try {
          var resp = Item.itemPatch(id, item)
      } catch (error) {
          console.log("Activate/deactivate item error: " + JSON.stringify(error))
          throw new Error('Activate/deactivate item failed: ' + resp.statusText)
      }

      var r = (await resp)
      if((r.status)!== 200) {
          throw new Error('Activate/deactivate item failed: ' + r.statusText + ", " +
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
    let resp = await Item.itemGet(id);
    return resp.data
}

async function deleteItem(id) {
    try {
        let resp = await Item.itemDelete(id);
        return resp.data
    } catch (error) {
        console.log("Delete item error: " + JSON.stringify(error))
        return {}
    }
}

function sortByPrice(data, sortval) {
    if (sortval !== "lh" && sortval !== "hl") return data;

    let items = [...data];

    if (sortval === "lh") {
      items.sort((a, b) => a.price - b.price);
    } else {
      items.sort((a, b) => b.price - a.price);
    }

    return items;
}

function searchItems({
    category = "popular",
    village = null,
    seller = null,
    term = "",
    sortValue = "lh",
    itemsPerPage = 10,
    usePriceFilter = "false",
    minPrice = 0,
    maxPrice = 10.00,
    page = 1
  }) {
    // Turn this into a boolean
    usePriceFilter = usePriceFilter === "true" && true;

    return new Promise((resolve, reject) => {
      getItems().then( items => {
        let data = items.filter(item => {
          if (
            usePriceFilter &&
            (item.price < minPrice*100 || item.price > maxPrice*100)
          ) {
            return false;
          }

          if (category === "popular" && village === null && seller === null) {
            return item.popular;
          }
          
          if (category !== Lang.ALL_CATEGORIES && category !== item.category &&
              village !== item.village && seller !== item.firstLastName) {
            return false;
          }

          if (term && !item.name.toLowerCase().includes(term.toLowerCase()))
            return false;

          return true;
        });

        let totalLength = data.length;

        data = sortByPrice(data, sortValue);

        data = data.slice((page - 1) * itemsPerPage, page * itemsPerPage);

        resolve({ data, totalLength });
      });
    });
}

export { newItem, updateItem, getItems, getItem, deleteItem, searchItems, activateItem };