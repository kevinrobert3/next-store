import React, { Component } from "react";
import { loadDB } from "../lib/config";
import Product from "../components/product";
import NavBar from "../components/navbar";
import Menu from "../components/menu";
import AuthHoc from "../components/hoc/authhoc";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import {
  Transition,
  CSSTransitionGroup,
  CSSTransition,
  TransitionGroup,
} from "react-transition-group";

import Cart from "../components/cart";

export async function getStaticProps() {
  let db = loadDB().firestore();
  let products = await db
    .collection("Products")
    .get()
    .then((querySnapshot) => {
      let data = [];
      querySnapshot.forEach(function (doc) {
        //console.log(doc.data());
        data.push(
          Object.assign(
            {
              id: doc.id,
            },
            doc.data()
          )
        );
      });

      return data;
    })
    .catch((err) => {
      console.log("Error", err);
    });

  return {
    props: {
      products,
    },
  };
}

class Index extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let className =
      "h-screen w-full bg-red-100 py-6 px-8 lg:px-32 flex flex-col lg:flex-row";
    //console.log(this.props.cartVisible);
    const products = this.props.products;
    //console.log(products);
    return (
      <>
        <NavBar
          makeCartVisible={this.props.makeCartVisible}
          cartVisibility={this.props.cartVisible}
          noOfItems={this.props.noOfCartItems}
        />

        {/* <Menu /> */}
        {this.props.cartVisible === true ? (
          <CSSTransition
            in={this.props.cartVisible}
            out={true}
            timeout={0}
            appear={true}
            unmountOnExit
            // onEnter={()=>{
            //   console.log("in")
            // }}
            onExiting={()=>{
              console.log("onExiting")
            }}
            // onExit={()=>{
            //   console.log("onExit")
            // }}
            classNames="step"
          >
            {/* <p className="text-sm text-purple-700 text-center">wfewf</p> */}
            <Cart makeCartVisible={this.props.makeCartVisible} />
          </CSSTransition>
        ) : null}

        <div className={className}>
          <Product products={products} />
        </div>

        {/* += " lg:opacity-100" */}
        {/* {this.props.cartVisible === true ? (
          <div className={(className )}>
            <Product products={products} />
          </div>
        ) : (
          <div className={className}>
            <Product products={products} />
          </div>
        )} */}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cartVisible: state.cart.cartVisible,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    makeCartVisible: () => {
      dispatch({
        type: "MAKE_CART_VISIBLE",
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthHoc(Index));
//export default AuthHoc(Index);
