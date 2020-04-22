import { db } from "../../lib/config";
import firebase from "firebase/app";

export const addItem = (item, UID) => {
  return (dispatch, getState) => {
    db.collection("UserCart")
      .doc(UID)
      .collection("CartItems")
      .add({
        item,
      })
      .then((doc) => {
        db.collection("UserCart")
          .doc(UID)
          .update({
            cartItems: firebase.firestore.FieldValue.increment(1),
          })
          .catch((err) => {
            console.log("Error!!!", err);
          });
      })
      .catch((err) => {
        console.log("ERROR:", err);
      });
  };
};

export const removeItem = (CartItemID, UID) => {
  // console.log(CartItemID);
  // console.log(UID)
  db.collection("UserCart")
    .doc(UID)
    .collection("CartItems")
    .doc(CartItemID)
    .delete()
    .then(function () {
      db.collection("UserCart")
        .doc(UID)
        .update({
          cartItems: firebase.firestore.FieldValue.increment(-1),
        })
        .then(() => {
          return (dispatch, getState) => {
            dispatch({
              type: "REMOVE_ITEM",
              CartItemID: CartItemID,
            });
          };
        })
        .catch((err) => {
          console.log("Error!!!", err);
        });
      //console.log("Item successfully deleted!");
    })
    .catch(function (error) {
      console.error("Error removing Item: ", error);
    });
};
