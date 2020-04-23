import React, { Component } from "react";
import { db } from "../lib/config";
import Product from "../components/product";
import NavBar from "../components/navbar";
import Menu from "../components/menu";
import AuthHoc from "../components/hoc/authhoc";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { CSSTransition } from "react-transition-group";
import Head from 'next/head'

import Cart from "../components/cart/cart";

export async function getStaticProps() {
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
      "w-full bg-white py-6 px-8 lg:px-32 flex flex-col lg:flex-row";
    const products = this.props.products;
    return (
      <>
      
      <Head>
        <title>Home page</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="theme-color" content="#e69a52"></meta>
      </Head>
      {/* Sandy Brown #e69a52  #ea5 rgb(230,154,82) */}
        <NavBar
          makeCartVisible={this.props.makeCartVisible}
          cartVisibility={this.props.cartVisible}
          noOfItems={this.props.noOfCartItems}
        />
        {/* <Menu /> */}

        <CSSTransition
          in={this.props.cartVisible}
          timeout={{
            appear: 0,
            enter: 0,
            exit: 1000,
          }}
          appear={true}
          unmountOnExit
          classNames="step"
        >
          <Cart makeCartVisible={this.props.makeCartVisible} />
        </CSSTransition>
        {this.props.cartVisible === true ? (
          <div className={(className += " lg:opacity-50")} id="main">
            <Product products={products} />
          </div>
        ) : (
          <div className={className} id="main">
            <Product products={products} />
          </div>
        )}
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
    setCartItems: (item) => {
      dispatch({
        type: "ADD_CART_ITEM",
        item: item,
      });
    },
    deleteItem: (id) => {
      dispatch({
        type: "REMOVE_ITEM",
        itemID: id
      });
    },
    updateItem: (newData, docID)=>{
      dispatch({
        type: "UPDATE_ITEM",
        newData: newData,
        ID: docID
      })
    },
    setCartNo: (number) => {
      dispatch({
        type: "SET_CART_COUNT",
        count: number,
      });
    },
    setUser: (userType, UID) => {
      dispatch({
        type: "SET_USER",
        ifAnonymous: userType,
        userUID: UID,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthHoc(Index));
//export default connect(mapStateToProps, mapDispatchToProps)(Index);
//export default AuthHoc(Index);
