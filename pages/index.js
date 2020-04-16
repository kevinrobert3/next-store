import React, { Component } from "react";
import { loadDB } from "../lib/config";
import Product from "../components/product";
import NavBar from "../components/navbar";
import Menu from "../components/menu";
import AuthHoc from "../components/hoc/authhoc";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import Item from "../components/animate";
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
    //console.log(this.props.cartVisible)
    return (
      <>
        <NavBar
          makeCartVisible={this.props.makeCartVisible}
          cartVisibility={this.props.cartVisible}
          noOfItems={this.props.noOfCartItems}
        />

        {/* <Menu /> */}

        {/* <Item></Item> */}
        
        
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
