import { db } from "../../lib/config";
import firebase from "firebase/app";

export const addItem = (item, UID) => {
  
  return (dispatch, getState) => {
    db.collection("UserCart")
      .doc(UID)
      .collection("CartItems")
      .add({
        cartItems: firebase.firestore.FieldValue.increment(1),
        cartItem: item,
      })
      .then((doc) => {
        console.log(doc.id);
        dispatch({
          type: "ADD_ITEM",
          cartItem: item,
          //CartItemID: Math.random()
        });
      })
      .catch((err) => {
        console.log("ERROR:", err);
      });
  };
};
