import { combineReducers } from "redux";
import cartReducer from "../../store/reducers/cartreducer";
import userReducer from '../../store/reducers/userReducer';



const rootReducer = combineReducers({
  cart: cartReducer,
  user: userReducer,
});
// rootReducer=(state=initState, action)=>{
//   console.log(action)
//   return state;
// }

export default rootReducer;
