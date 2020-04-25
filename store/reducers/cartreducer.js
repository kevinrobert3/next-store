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
    // console.log(state.cartItems);
    var index = -1;
    for (var i = 0; i < state.cartItems.length; i++) {
      if (state.cartItems[i].CartItemID === action.ID) {
        index = i;
        break;
      }
    }
    //console.log(index);
    console.log(action.newData)
//console.log(state.cartItems[index]);
let data=[];
data.push(
Object.assign(
  {
    CartItemID: action.ID,
  },
  action.newData
))
console.log(data)

// return{
//   ...state,
//   cartItems:[...state.cartItems, data ]
// }
  }

  return state;
};

export default cartReducer;
