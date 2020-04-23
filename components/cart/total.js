import React from "react";

function Total({items}) {
  //console.log(items)
  return (
    <div className="w-full h-64 lg:h-64 bg-white fixed bottom-0 relative cart-total-bottom-shadow cart-total px-5 py-2">
      <span className="text-gray-900 text-sm">Subtotal</span>
      <span className="font-semibold float-right">Kshs 1400</span>
      <div className="w-full border border-gray-100 border-1 mt-3 mb-10"></div>

      <button className=" w-full bg-red-500 rounded-lg text-white py-3 uppercase font-extrabold shadow-xl lg:shadow-xl">
        Checkout
      </button>
    </div>
  );
}

export default Total;
