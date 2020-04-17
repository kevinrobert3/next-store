import React from "react";
import { auth } from "../../lib/config";
import { connect } from "react-redux";

let UID;
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

    componentDidMount() {
      auth.onAuthStateChanged((user) => {
        if (user) {
          UID = user.uid;
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
          auth.signInAnonymously().catch(function (error) {
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
