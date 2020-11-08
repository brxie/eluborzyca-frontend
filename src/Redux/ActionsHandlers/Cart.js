import Cookies from 'universal-cookie';
import { getItems } from "./../../ApiProxy/ApiProxy";

const CART_ITEMS_COOKIE_KEY='LOCAL_CART_ITEMS'

const Cart = {

    AddItem(state, action) {
        let index = state.cartItems.findIndex(x => x.id === action.payload.id);

        // Is the item user wants to add already in the cart?
        if (index !== -1) {
          // Yes, update the quantity.
          let cloneCartItems = [...state.cartItems];
          cloneCartItems[index] = {
            ...cloneCartItems[index],
            quantity: state.cartItems[index].quantity + action.payload.quantity
          };
  
          new Cookies().set(CART_ITEMS_COOKIE_KEY, cloneCartItems)
          return { ...state, cartItems: cloneCartItems };
        }
  
        let items = state.cartItems.concat(action.payload);
        new Cookies().set(CART_ITEMS_COOKIE_KEY, items)
        // No, add a new item.
        return { ...state, cartItems: items};
    },

    DeleteItem(state, action) {
        let items = state.cartItems.filter(x => x.id !== action.payload)
        new Cookies().set(CART_ITEMS_COOKIE_KEY, items)
        return {...state, cartItems: items };
    },

    UpdateQuantity(state, action) {
        let index = state.cartItems.findIndex(x => x.id === action.payload.id);

        // User wants to update quantity of existing item.
        if (index !== -1) {
          let cloneCartItems = [...state.cartItems];
          cloneCartItems[index] = {
            ...cloneCartItems[index],
            quantity: action.payload.quantity
          };
          
          new Cookies().set(CART_ITEMS_COOKIE_KEY, cloneCartItems)
          return { ...state, cartItems: cloneCartItems };
        }
  
        // If we couldn't find such item, do nothing.
        return state;
    },

    LoadItems(state) {
      let cookie = new Cookies().get(CART_ITEMS_COOKIE_KEY)
      if (!cookie || cookie.length === 0) {
        return state;
      }

      // some product can change or be removed, we need 
      // to  update state of them
      var items = [];

      getItems().then( dbItems => {
        for(let cookieItem of cookie) {
          for(let dbItem of dbItems) {
            if (cookieItem.id === dbItem.id) {
              Object.assign(cookieItem, dbItem);
              items.push(cookieItem);
            }
          }
        }
      });

      new Cookies().set(CART_ITEMS_COOKIE_KEY, items)
      return { ...state, cartItems: items} 

    }
}


export default Cart