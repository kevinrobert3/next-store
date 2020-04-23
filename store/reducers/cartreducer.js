import update from "immutability-helper";

const initState = {
  cartVisible: false,
  noOfItems: 0,
  cartItems: [],
};

const cartReducer = (state = initState, action) => {
  if (action.type === "MAKE_CART_VISIBLE") {
    let cartVisibility;
    if (state.cartVisible === true) {
      cartVisibility = false;
    } else {
      cartVisibility = true;
    }
    return {
      ...state,
      cartVisible: cartVisibility,
    };
  } else if (action.type === "SET_CART_COUNT") {
    return {
      ...state,
      noOfItems: action.count,
    };
  } else if (action.type === "ADD_CART_ITEM") {
    // return{
    // ...initState,
    // }
    if (
      state.cartItems.filter(
        (item) => item.CartItemID === action.item[0].CartItemID
      ).length > 0
    ) {
      return {
        ...state,
      };
    } else {
      return {
        ...state,
        cartItems: [...state.cartItems, action.item[0]],
      };
    }
  } else if (action.type === "REMOVE_ITEM") {
    //console.log(action.itemID);
    return {
      ...state,
      cartItems: [
        ...state.cartItems.filter((item) => item.CartItemID !== action.itemID),
      ],
    };
  } else if (action.type === "UPDATE_ITEM") {
    //console.log(action.newData.qty);
    //console.log(action.ID);
  //if (
     // state.cartItems.filter((item) => item.CartItemID === action.ID).length > 0
   // ) {
      console.log(state.cartItems)
      return{
        ...state,
        // cartItems:{
        //   ...state.cartItems,

        // }
      }
     

    // return {
    //   ...state, // copy state
    //   cartItems: {
    //     ...state.cartItems, // copy houses
    //     [cartItems[0]]: {  // update one specific house (using Computed Property syntax)
    //       ...state.cartItems[cartItems[0]],  // copy that specific house's properties
    //       qty: newData.qty   // update its `points` property
    //     }
    //   }
    // }

    // return {
    //   ...state, // copy state
    //   houses: {
    //     ...state.houses, // copy houses
    //     [key]: {  // update one specific house (using Computed Property syntax)
    //       ...state.houses[key],  // copy that specific house's properties
    //       points: state.houses[key].points + 3   // update its `points` property
    //     }
    //   }
    // }
//  }
  }

  return state;
};

export default cartReducer;
