import React, { Component } from "react";
import { connect } from "react-redux";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }
  handleClickOutside = (event) => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      alert("outside");
      //this.setState({ showOptions: false });
    } else {
      alert("You clicked inside of me!");
    }
  };

  componentDidMount = () => {
    document.addEventListener("mousedown", this.handleClick);
  };

  componentWillUnmount = () => {
    // console.log("unmounting");
    document.removeEventListener("mousedown", this.handleClick);
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
          <div className="w-full h-32 bg-white rounded shadow flex flex-row mb-4">
            <div className="h-full w-1/3 bg-white flex justify-center py-3 rounded-tl rounded-bl">
              <img
                className="h-full"
                src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
              ></img>
            </div>
            <div className="h-full w-2/3 bg-white py-2">
              <span className="font-semibold">Fine woven bag</span>
              <br></br>
              <span className="text-sm text-gray-800">Description</span>{" "}
              <br></br>
              <span className="text-sm text-gray-800">Child Xl</span> <br></br>
              <div className="mt-2">
                <input
                  className="w-8 rounded border border-gray-400 outline-none pl-2 mr-2"
                  type="number"
                  defaultValue="1"
                  min="1"
                  max="8"
                ></input>
                @<span className="ml-1">Kshs 1400</span>
              </div>
            </div>
            <div className="h-full w-8 bg-white rounded-tr rounded-br">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                className="h-4 lg:h-5 lg:border lg:border-1 lg:border-white mt-2 ml-1 cursor-pointer fill-current text-gray-700"
                strokeWidth="1"
              >
                <path d="M2.93 17.07A10 10 0 1117.07 2.93 10 10 0 012.93 17.07zm1.41-1.41A8 8 0 1015.66 4.34 8 8 0 004.34 15.66zm9.9-8.49L11.41 10l2.83 2.83-1.41 1.41L10 11.41l-2.83 2.83-1.41-1.41L8.59 10 5.76 7.17l1.41-1.41L10 8.59l2.83-2.83 1.41 1.41z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="w-full h-64 lg:h-64 bg-white fixed bottom-0 relative cart-total-bottom-shadow cart-total px-5 py-2">
          <span className="text-gray-900 text-sm">Subtotal</span>
          <span className="font-semibold float-right">Kshs 1400</span>
          <div className="w-full border border-gray-100 border-1 mt-3 mb-10"></div>

          <button className=" w-full bg-red-500 rounded-lg text-white py-3 uppercase font-extrabold shadow-xl lg:shadow-xl">
            Checkout
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cartVisible: state.cart.cartVisible,
  };
};

export default connect(mapStateToProps)(Cart);
