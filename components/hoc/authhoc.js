import React from "react";
import { auth } from "../../lib/config";
import { db } from "../../lib/config";
import { connect } from "react-redux";

let UID;
let noOfItems;
let userCartSubscription;

const AuthHoc = (Component) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        status: "LOADING",
        anonymous: true,
      };
      //console.log(props.setUser)
    }

    fetchCartItems(UID, props) {
      // db.collection("UserCart")
      //   .doc(UID)
      //   .collection("CartItems")
      //   .onSnapshot(function (querySnapshot) {
      //     var cities = [];
      //     querySnapshot.forEach(function (doc) {
      //       //console.log(doc.data())
      //       props.setCartItems(doc.data());
      //     });
      //   });
      db.collection("UserCart")
        .doc(UID)
        .collection("CartItems")
        .onSnapshot(function (snapshot) {
          snapshot.docChanges().forEach(function (change) {
            if (change.type === "added") {
              //console.log("New Item: ", change.doc.data());
              let data = [];
              data.push(
                Object.assign(
                  {
                    CartItemID: change.doc.id,
                  },
                  change.doc.data()
                )
              );
              //console.log(data)
              props.setCartItems(data);
            }
            if (change.type === "modified") {
              //console.log("Modified Item: ", change.doc.data());
              //props.setCartItems(doc.data());
            }
            if (change.type === "removed") {
              //console.log("Removed Item: ", change.doc.data());
              //props.setCartItems(doc.data());
            }
          });
        });
    }

    fetchNoOfItems(UID, props) {
      userCartSubscription = db
        .collection("UserCart")
        .doc(UID)
        .onSnapshot(function (doc) {
          noOfItems = doc.data().cartItems;
          props.setCartNo(noOfItems);
        });
    }

    componentDidMount() {
      auth.onAuthStateChanged((user) => {
        if (user) {
          UID = user.uid;
          this.fetchNoOfItems(UID, this.props);
          this.fetchCartItems(UID, this.props);

          this.setState({
            status: "SIGNED_IN",
          });
          let anonymous;
          if (user.isAnonymous === true) {
            this.props.setUser((anonymous = true), UID);
            //}
            //console.log(this.props.setUser)
            // console.log("Anonymous: I'll still show SignUp links");
            // console.log('still load cart items if any')
          } else {
            this.props.setUser((anonymous = false), UID);

            // console.log("Registered User: I'll not show SignUp and login links maybe logout");
            // console.log("Load user Cart too");
            this.setState({
              ...state,
              anonymous: false,
            });
          }
        } else {
          // console.log("no user:,, but i'm signing you anonymously right now....");
          auth
            .signInAnonymously()
            .then(function (cred) {
              db.collection("UserCart")
                .doc(cred.user.uid)
                .set({
                  cartItems: 0,
                })
                .then(function () {
                  console.log("Document successfully written!");
                })
                .catch(function (error) {
                  console.error("Error writing document: ", error);
                });
            })
            .catch(function (error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              console.log(errorCode);
              console.log(errorMessage);
            });
        }
      });
    }
    componentWillUnmount() {}
    renderContent() {
      ///console.log(this.state)
      const { status, anonymous } = this.state;
      if (status == "LOADING") {
        // return <h1 className="text-center text-red-500 align-middle">Loading ......</h1>;
        return <Component {...this.props} />;
      } else if (status == "SIGNED_IN") {
        return <Component {...this.props} />;
      }
    }
    render() {
      return <React.Fragment>{this.renderContent()}</React.Fragment>;
    }
  };
};

export default AuthHoc;
