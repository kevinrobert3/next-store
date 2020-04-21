import React from "react";

// function removeItem(CartItemID){
//   console.log(CartItemID)
// }

function CartItem({ items, removeItem }) {

// if(items.length>0){
// console.log("not empty")
// }else{
//   console.log("empty")
// }
  

  return items.map((item) => {
    //console.log(item[0].item);
    if(item){
     // console.log(item.)
      console.log("empty")
    }else{
      console.log("ju")
    }
    return (
      <div
        className="w-full h-32 bg-white rounded shadow flex flex-row mb-4"
        key={item[0].CartItemID}
      >
        <div className="h-full w-1/3 bg-white flex justify-center py-3 rounded-tl rounded-bl">
          <img
            className="h-full"
            src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
          ></img>
        </div>
        <div className="h-full w-2/3 bg-white py-2">
          <span className="font-semibold">{item[0].Name}</span>
          <br></br>
          <span className="text-sm text-gray-800">Description</span> <br></br>
          <span className="text-sm text-gray-800">Child Xl</span> <br></br>
          <div className="mt-2">
            <input
              className="w-8 rounded border border-gray-400 outline-none pl-2 mr-2"
              type="number"
              defaultValue="1"
              min="1"
              max="8"
            ></input>
            @<span className="ml-1">Kshs {item[0].Price}</span>
          </div>
        </div>
        <div className="h-full w-8 bg-white rounded-tr rounded-br">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            className="h-4 lg:h-5 lg:border lg:border-1 lg:border-white mt-2 ml-1 cursor-pointer fill-current text-gray-700"
            strokeWidth="1"
            title="Remove Item"

            onClick={()=>
              
              removeItem(item[0].CartItemID)}
          >
            <path d="M2.93 17.07A10 10 0 1117.07 2.93 10 10 0 012.93 17.07zm1.41-1.41A8 8 0 1015.66 4.34 8 8 0 004.34 15.66zm9.9-8.49L11.41 10l2.83 2.83-1.41 1.41L10 11.41l-2.83 2.83-1.41-1.41L8.59 10 5.76 7.17l1.41-1.41L10 8.59l2.83-2.83 1.41 1.41z" />
          </svg>
        </div>
      </div>
    );
  });
}

export default CartItem;
