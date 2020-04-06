import React from "react";

function Menu() {
  return (
    <div className="lg:hidden">
      <div className="bg-white flex flex-col px-4">
        <div className="w-full bg-white p-4">
          <button className="w-full bg-white border border-gray-300 text-gray-700 py-2 rounded-md mb-3">
            Login
          </button>
          <button className="w-full bg-indigo-700 border border-gray-300 text-white py-2 rounded-md">
            Sign up
          </button>
        </div>

        <div className="w-full bg-gray-200 p-5">
          
        </div>
      </div>
    </div>
  );
}

export default Menu;
