import React, { Component } from "react";
import { connect } from "react-redux";
import CartItem from "../cart/cartItem";
import Total from "../cart/total";

import { removeItem } from "../../store/actions/cartActions";

import { db } from "../../lib/config";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }
  handleClickOutside = (event) => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      alert("outside");
    } else {
      alert("You clicked inside of me!");
    }
  };

  fetchCartItems(userUID) {
    //console.log(userUID)
    db.collection("UserCart")
      .doc(userUID)
      .collection("CartItems")
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
        });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  }

  componentDidMount = () => {
    document.addEventListener("mousedown", this.handleClick);
    //console.log(this.props)
    //this.fetchCartItems(this.props.userUID)
  };

  componentWillUnmount = () => {
    // console.log("unmounting");
    document.removeEventListener("mousedown", this.handleClick);
  };

  removeItem = (CartItemID) => {
    if (this.props.userUID !== null) {
      removeItem(CartItemID, this.props.userUID);
    }
  };

  handleClick = (e) => {
    if (this.node.contains(e.target)) {
      // console.log("inside");
      return;
    }
    //console.log("outside");
    if (this.props.cartVisible === true) {
      this.props.makeCartVisible();
    }
  };

  render() {
    //console.log(this.props.cartItems);
    return (
      <div
        className="bg-white w-full lg:w-1/3 h-screen fixed top-0 right-0 flex flex-col shadow-lg z-50 lg:opacity-50"
        ref={(node) => (this.node = node)}
      >
        <div className="w-full h-12 bg-white lg:bg-white fixed top-0 px-5 py-3 relative leading-none cart-head-bottom-shadow">
          <span className="font-semibold">Shopping Cart</span>
          <div
            className="flex flex-row float-right cursor-pointer"
            onClick={this.props.makeCartVisible}
          >
            <span className="text-sm">Close</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              className="h-3 ml-1 hidden lg:block"
              id="close"
            >
              <path d="M16.172 9l-6.071-6.071 1.414-1.414L20 10l-.707.707-7.778 7.778-1.414-1.414L16.172 11H0V9z" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              className="h-3 ml-1 lg:hidden"
            >
              <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
            </svg>
          </div>
        </div>
        <div className="w-full h-full bg-gray-200 lg:bg-gray-100 px-5 py-4 relative overflow-y-auto">
          {this.props.cartItems.length > 0 ? (
            <CartItem
              items={this.props.cartItems}
              removeItem={this.removeItem}
              UID={this.props.userUID}
            />
          ) : (
            <p>Go Shopping You dont have any items</p>
          )}
        </div>
        {this.props.cartItems.length > 0 ? <Total /> : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cartVisible: state.cart.cartVisible,
    cartItems: state.cart.cartItems,
    userUID: state.user.UUID,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeItem: (CartItemID, UID) => dispatch(removeItem(CartItemID, UID)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
