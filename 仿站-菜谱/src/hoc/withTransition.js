import React, { Component } from "react";
import { CSSTransition } from "react-transition-group";
import { RouterTransition } from "@/assets/style/routerTransition.js";

const withTransition = (Cmp) => {
  return class extends Component {
    render() {
      return (
        <RouterTransition>
          <CSSTransition in={this.props.match ? true : false} timeout={300} classNames="fade" unmountOnExit>
            {this.props.match ? <Cmp {...this.props} /> : <div></div>}
          </CSSTransition>
        </RouterTransition>
      );
    }
  };
};

export default withTransition;
