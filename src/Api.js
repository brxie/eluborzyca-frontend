import { getItems } from "./Data";

///
//
// Methods of this class are used to simulate calls to server.
//
class Api {
  getItemUsingID(id) {
    return new Promise( (resolve, reject) => {
      getItems().then( items => {
        let res = items.filter(x => x.id === parseInt(id, 10));
        resolve(res.length === 0 ? null : res[0]);
      });
    });
  }

  sortByPrice(data, sortval) {
    if (sortval !== "lh" && sortval !== "hl") return data;

    let items = [...data];

    if (sortval === "lh") {
      items.sort((a, b) => a.price - b.price);
    } else {
      items.sort((a, b) => b.price - a.price);
    }

    return items;
  }

  searchItems({
    category = "popular",
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
            (item.public.price < minPrice || item.public.price > maxPrice)
          ) {
            return false;
          }

          if (category === "popular") {
            return item.public.popular;
          }

          if (category !== "All categories" && category !== item.public.category)
            return false;

          if (term && !item.public.name.toLowerCase().includes(term.toLowerCase()))
            return false;

          return true;
        });

        let totalLength = data.length;

        data = this.sortByPrice(data, sortValue);

        data = data.slice((page - 1) * itemsPerPage, page * itemsPerPage);

        resolve({ data, totalLength });
      });
    });
  }
}

export default new Api();
