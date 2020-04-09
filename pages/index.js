import React, { Component } from "react";
import { loadDB } from "../lib/config";
import Product from "../components/product";
import NavBar from "../components/navbar";
import Menu from "../components/menu";
import AuthHoc from "../components/hoc/authhoc";
import { BrowserRouter, Switch, Route } from "react-router-dom";

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
  render() {
    //console.log(this.props.status);
    const products = this.props.products;
    //console.log(products);
    return (
      <>
        <NavBar />
        {/* <Menu /> */}
        <div className="h-screen w-full bg-red-100 py-6 px-8 lg:px-32 flex flex-col lg:flex-row">
          <Product products={products} />
        </div>
      </>
    );
  }
}

export default AuthHoc(Index);
