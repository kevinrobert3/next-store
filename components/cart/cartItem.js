import React from "react";
import { db } from "../../lib/config";

function CartItem({ items, removeItem, UID }) {
  return items.map((item) => {
    //console.log(item.qty);
    async function handleQtyChange(e) {
      if (e.target.value > 0) {
        //console.log(e.target.value);
        //console.log(item.CartItemID)
      } else {
        e.target.value = 1;
        //console.log(e.target.value);
      }
      //console.log(e.target.value);
     // console.log(UID);
      var cartItemQtyRef = db
        .collection("UserCart")
        .doc(UID)
        .collection("CartItems")
        .doc(item.CartItemID);

      return await cartItemQtyRef
        .update({
          qty: parseInt(e.target.value),
        })
        .then(function () {
          //console.log("Item Quantity successfully updated!");
        })
        .catch(function (error) {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
    }

    return (
      <div
        className="w-full h-32 bg-white rounded shadow flex flex-row mb-4"
        key={item.CartItemID}
      >
        <div className="h-full w-1/3 bg-white flex justify-center py-3 rounded-tl rounded-bl">
          <img
            className="h-full"
            src={item.item.Image[0]}
          ></img>
        </div>
        <div className="h-full w-2/3 bg-white py-2">
          <span className="font-semibold text-sm">{item.item.Name}</span>
          <br></br>
          <span className="text-sm text-gray-600">Description</span> <br></br>
          <span className="text-sm text-gray-600">Child Xl</span> <br></br>
          <div className="mt-2">
            <input
              className="w-6 h-6 text-gray-700 text-sm rounded border border-gray-300 outline-none mr-2 text-center"
              type="number"
              //defaultValue="1"
              defaultValue={item.qty}
              min="1"
              max="100"
              onChange={handleQtyChange}
            ></input>
            @
            <span className="ml-1 text-sm text-gray-800">
              Kshs {item.item.Price}
            </span>
          </div>
        </div>
        <div className="h-full w-8 bg-white rounded-tr rounded-br">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            className="h-4 lg:h-5 lg:border lg:border-1 lg:border-white mt-2 ml-1 cursor-pointer fill-current text-orange-300"
            strokeWidth="1"
            title="Remove Item"
            onClick={() =>
              //console.log(UID)
              removeItem(item.CartItemID)
            }
          >
            <path d="M2.93 17.07A10 10 0 1117.07 2.93 10 10 0 012.93 17.07zm1.41-1.41A8 8 0 1015.66 4.34 8 8 0 004.34 15.66zm9.9-8.49L11.41 10l2.83 2.83-1.41 1.41L10 11.41l-2.83 2.83-1.41-1.41L8.59 10 5.76 7.17l1.41-1.41L10 8.59l2.83-2.83 1.41 1.41z" />
          </svg>
        </div>
      </div>
    );
  });
}

export default CartItem;
