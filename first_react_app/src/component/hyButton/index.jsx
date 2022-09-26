import React, { Component } from "react";
import types from "prop-types";
import { HyButtonWrapper } from "./style";

class HyButton extends Component {
  static propTypes = {
    color: types.string,
    round: types.bool,
    size: types.oneOf(["small", "medium", "large"]),
    clickFn: types.func,
    value: types.string,
  };
  static defaultProps = {
    backgroundColor: "#409eff",
    round: false,
    size: "medium",
    clickFn: () => {},
    value: "按钮",
  };
  borderRadius = this.props.round ? "50%" : "5px";
  size = {
    small: {
      width: "80px",
      height: "32px",
    },
    medium: {
      width: "120px",
      height: "40px",
    },
    large: {
      width: "160px",
      height: "48px",
    },
  };

  render() {
    const { backgroundColor, size, clickFn, value } = this.props;
    return (
      <HyButtonWrapper
        style={{ backgroundColor, ...this.size[size], borderRadius: this.borderRadius }}
        onClick={clickFn.bind(this)}
      >
        <span>{value}</span>
      </HyButtonWrapper>
    );
  }
}

export default HyButton;
