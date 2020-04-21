import { combineReducers } from "redux";
import cartReducer from "../../store/reducers/cartreducer";
import userReducer from '../../store/reducers/userReducer';

 import {firestoreReducer}  from 'redux-firestore';



const rootReducer = combineReducers({
  cart: cartReducer,
  user: userReducer,
  firestore: firestoreReducer
});
// rootReducer=(state=initState, action)=>{
//   console.log(action)
//   return state;
// }

export default rootReducer;
