import React, { Component } from "react";
import {
  CSSTransition,
} from "react-transition-group";

class Item extends Component {
  state = {
    transition: true,
  };
  handleClick = (e) => {
    if (this.state.transition === true) {
      this.setState({
        transition: false,
      });
    } else {
      this.setState({
        transition: true,
      });
    }
  };
  render() {
    return (
      <div>
        <CSSTransition
          in={this.state.transition}
           timeout={{
            appear: 0,
            enter: 0,
            exit: 1000,
           }}
          appear={true}
          unmountOnExit
          classNames="step"
        >
          <p
            className="text-center text-xl text-indigo-700"
            onClick={this.handleClick}
          >
            dewfewfew
          </p>
        </CSSTransition>
      </div>
    );
  }
}

export default Item;
