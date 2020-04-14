import { combineReducers } from "redux";
import cartReducer from "../reducers/cartreducer";



const rootReducer = combineReducers({
  cart: cartReducer,
});
// rootReducer=(state=initState, action)=>{
//   console.log(action)
//   return state;
// }

export default rootReducer;
