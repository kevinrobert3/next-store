import { db } from "../../lib/config";
import firebase from "firebase/app";

export const addItem = (item, UID) => {
  return (dispatch, getState) => {
    db.collection("UserCart")
      .doc(UID)
      .collection("CartItems")
      .add({
        cartItem: item,
      })
      .then((doc) => {
        db.collection("UserCart")
          .doc(UID)
          .set({
            cartItems: firebase.firestore.FieldValue.increment(1),
          })
          .catch((err) => {
            console.log("Error!!!", err);
          });

        let data = [];

        data.push(
          Object.assign(
            {
              CartItemID: doc.id,
            },
            item
          )
        );

        dispatch({
          type: "ADD_ITEM",
          cartItem: data,
        });

        dispatch({
          type: "ADD_COUNT",
        });
      })
      .catch((err) => {
        console.log("ERROR:", err);
      });
  };
};

export const removeItem = (CartItemID) => {
  console.log(CartItemID)
  return (dispatch, getState) => {
    dispatch({
      type: "REMOVE_ITEM",
      CartItemID: CartItemID,
    });
  };
};
