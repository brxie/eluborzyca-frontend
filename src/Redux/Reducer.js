import * as CONSTANTS from "./Constants";
import Cart from "./ActionsHandlers/Cart"

// If multiple components need access to some data, in that case we store such data in redux.
const initialState = {
  cartItems: [],
  showCartDialog: false,
  showMenu: true,
  checkedOutItems: [],
  loggedInUser: null
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.ADD_ITEM_IN_CART: {
      return Cart.AddItem(state, action);
    }
    case CONSTANTS.SHOW_CART_DLG:
      return { ...state, showCartDialog: action.payload };
    case CONSTANTS.DELETE_CART_ITEM:
      return Cart.DeleteItem(state, action);
    case CONSTANTS.LOAD_CART_ITEMS:
      return Cart.LoadItems(state);
    case CONSTANTS.TOGGLE_MENU:
      return { ...state, showMenu: !state.showMenu };
    case CONSTANTS.SET_LOGGED_IN_USER:
      return { ...state, loggedInUser: action.payload };
    case CONSTANTS.LOGOUT:
      return { ...state, loggedInUser: null, checkedOutItems: [] };
    case CONSTANTS.SET_CHECKEDOUT_ITEMS:
      return { ...state, checkedOutItems: action.payload };
    case CONSTANTS.UPDATE_CART_ITEM_QUANTITY: {
      return Cart.UpdateQuantity(state, action);
    }
    default:
      return state;
  }
};

export default rootReducer;
