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
    // console.log(state);
    // return{
    // ...initState,
    // }
    if (
      state.cartItems.filter(
        (item) => item.CartItemID === action.item[0].CartItemID
      ).length > 0
    ) {
      //console.log("there");
      return {
        ...state,
      };
    } else {
      // console.log("not there")
      return {
        ...state,
        cartItems: [...state.cartItems, action.item[0]],
        //cartItems: []
      };
    }
  } else if (action.type === "REMOVE_ITEM") {
    //console.log(action.itemID);
    return {
      ...state,
      // cartItems: [...state.cartItems, action.item[0]],
      cartItems: [
        ...state.cartItems.filter((item) => item.CartItemID !== action.itemID),
      ],
      //cartItems: []
    };
  }

  return state;
};

export default cartReducer;
