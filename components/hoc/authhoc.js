import React from "react";
import { loadDB } from "../../lib/config";

let auth = loadDB().auth();
const AuthHoc = (Component) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        status: "LOADING",
        anonymous: true,
      };
    }
    
    componentDidMount() {
        auth.onAuthStateChanged((user) => {
          if (user) {
            this.setState({
              status: "SIGNED_IN",
            });
            //console.log(user);
            if(user.isAnonymous===true){
                console.log("Anonymous: I'll still show SignUp links");
                console.log('still load cart items if any')
            }else{
                console.log("Registered User: I'll not show SignUp and login links");
                console.log("Load user Cart too");
                this.setState({
                    ...state,
                    anonymous: false,
                  });
            }
          } else {
            console.log("no user:,, but i'm signing you anonymously right now....");
            auth.signInAnonymously().catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage)
              });
          }
        });
    
    }
    componentWillUnmount(){

    }
    renderContent() {
      const { status, anonymous } = this.state;
      if (status == "LOADING") {
        // return <h1 className="text-center text-red-500 align-middle">Loading ......</h1>;
        return <Component {...this.props }/>;

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
