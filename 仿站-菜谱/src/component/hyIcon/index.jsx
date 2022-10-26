import React, { Component } from "react";
import types from "prop-types";
import "@/assets/icon/iconfont.js";

class HyIcon extends Component {
  static propTypes = {
    width: types.number,
    height: types.number,
    active: types.bool,
    fill: types.string,
    activeFill: types.string,
    clickFn: types.func,
    icon: types.string,
  };
  static defaultProps = {
    width: 16,
    height: 16,
    active: false,
    clickFn: () => {},
    icon: "custom-dianying",
  };

  render() {
    const { width, height, active, fill, activeFill, icon } = this.props;
    return (
      <svg
        className="hy_svg_icon"
        style={{
          width: `${width}px`,
          height: `${height}px`,
          fill: active ? fill : activeFill,
        }}
        onClick={this.props.clickFn.bind(this)} // <--- bind this
      >
        <use href={`#${icon}`} />
      </svg>
    );
  }
}

export default HyIcon;
