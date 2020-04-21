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
  } else if (action.type === "ADD_ITEM") {
    return {
      ...state,
      cartItems: [...state.cartItems, action.cartItem],
    };
  } else if (action.type === "SET_CART_COUNT") {
    return {
      ...state,
      noOfItems: action.count,
    };
  } else if (action.type === "ADD_CART_ITEM") {
    //console.log(action.item)
    return {
      ...state,
      //cartItems: [...state.cartItems, action.item],
      //cartItems: [ action.item],
      cartItems: []
    };
  }

  return state;
};

export default cartReducer;
