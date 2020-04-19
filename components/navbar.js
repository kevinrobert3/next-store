import React from "react";
import { auth } from "../lib/config";
import { db } from "../lib/config";
import { connect } from "react-redux";
function signOut() {
  auth
    .signOut()
    .then(function () {
      // Sign-out successful.
    })
    .catch(function (error) {
      // An error happened.
    });
}
function NavBar({ cartVisibility, noOfCartItems, makeCartVisible, userID }) {
  if (userID !== null) {
    //db.collection("UserCart").doc(userID).
  }
  let className;
  if (cartVisibility === true) {
    className =
      "flex items-center justify-between flex-wrap bg-white py-3 lg:py-4 px-5 lg:px-8 lg:px-32 sticky lg:opacity-50";
  } else {
    className =
      "flex items-center justify-between flex-wrap bg-white py-3 lg:py-4 px-6 lg:px-8 lg:px-32 sticky";
  }

  return (
    // <div>
    <nav className={className}>
      <div className="flex flex-row items-center">
        <svg
          onClick={makeCartVisible}
          className="fill-current h-4 w-4 lg:h-5 lg:w-5 cursor-pointer text-orange-300"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>

        <span className="ml-4 text-gray-900 font-semibold hidden lg:block hover:text-orange-500 cursor-pointer">
          Menu
        </span>
      </div>

      {/* </button> */}
      <div className="flex items-center flex-shrink-0 text-black mr-6">
        <svg
          className="fill-current h-6 w-6 mr-2"
          width="54"
          height="54"
          viewBox="0 0 54 54"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
        </svg>
        <span
          className="font-semibold text-xl text-black tracking-tight"
          onClick={signOut}
        >
          Next Store
        </span>
      </div>
      <div className="">
        {noOfCartItems > 0 ? (
          <div
            className="rounded-full bg-red-500 text-xs text-center text-white relative -mb-3 mr-1 ml-4 lg:mr-8 lg:ml-3 lg:-mb-3 cursor-pointer"
            onClick={makeCartVisible}
          >
            {noOfCartItems}
          </div>
        ) : null}

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="cursor-pointer mr-3 h-6 lg:mr-10 text-orange-400"
          onClick={makeCartVisible}
        >
          <title>Shopping Cart</title>
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
        </svg>
      </div>
    </nav>
    //{/* {cartVisibility === true ? (
    //   <div className="bg-white lg:px-0 lg:opacity-50">
    //     <div className="bg-gray-300 nav mx-6 lg:mx-0 lg:bg-gray-100"></div>
    //   </div>
    // ) : (
    //   <div className="bg-white lg:px-0 parent-nav">
    //     <div className="bg-gray-300 nav mx-6 lg:mx-0 lg:bg-gray-100"></div>
    //   </div>
    // )} */}
    //  </div>
  );
}
// openCart = () => {
//   this.props.makeCartVisible();
// };

const mapStateToProps = (state) => {
  return {
    noOfCartItems: state.cart.noOfItems,
    userID: state.user.UUID,
  };
};
// const mapDispatchToProps = (dispatch) => {
//   return {
//     makeCartVisible: () => {
//       dispatch({
//         type: "MAKE_CART_VISIBLE",
//       });
//     },
//   };
// };

export default connect(mapStateToProps)(NavBar);
