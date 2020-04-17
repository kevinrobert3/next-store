const initState = {
  cartVisible: false,
  noOfItems: 0,
  cartItems: [
      
    // {
    //   id: "1",
    //   type: "Trouser",
    //   price: 1400,
    //   name: "Fine Trouser",
    // },
  ],
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
    //console.log(action.cartItem)
    return {
      ...state,
      cartItems: [...state.cartItems, action.cartItem],
    };
  }
  console.log(state.cartItems)

  return state;
};

export default cartReducer;
