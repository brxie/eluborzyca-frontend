import Items from '../ApiClient/Items'


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
    maxPrice = 1000,
    page = 1
  }) {
    // Turn this into a boolean
    usePriceFilter = usePriceFilter === "true" && true;

    return new Promise((resolve, reject) => {
      getItems().then( items => {
        let data = items.filter(item => {
          if (
            usePriceFilter &&
            (item.price < minPrice || item.price > maxPrice)
          ) {
            return false;
          }

          if (category === "popular" && village === "") {
            return item.popular;
          }
          
          console.log("item: " + JSON.stringify(item))
          if (category !== "All categories" && category !== item.category &&
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

export { newItem, updateItem, getItems, getItem, deleteItem, searchItems };