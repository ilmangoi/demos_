import React, { Component, createRef } from "react";
import { HyInputWrapper } from "./style.js";
import { CSSTransition } from "react-transition-group";
import HyIcon from "@/component/hyIcon";
import types from "prop-types";

class HyInput extends Component {
  static propTypes = {
    showHidden: types.bool,
    validatorRules: types.array,
    label: types.string,
    placeHolder: types.string,
    name: types.string,
  };
  static defaultProps = {
    showHidden: false,
    validatorRules: [],
    label: "",
    placeHolder: "",
    name: "",
  };
  textInput = createRef();
  tipSpan = createRef();
  hiddenIcon = createRef();
  state = {
    show: true,
    iconFillName: "custom-yanjing_xianshi_o",
    value: "",
  };

  componentDidMount() {
    if (this.props.validatorRules.length) {
      this.props.validatorRules.forEach((rule) => {
        this.textInput.current.addEventListener(rule.trigger, (e) => {
          const tip = rule.validator(this.textInput.current.value);
          if (!tip) {
            this.setState({
              show: false,
            });
          } else if (tip instanceof Error) {
            this.tipSpan.current.innerHTML = tip.message;
            this.setState({
              show: true,
            });
            // 阻止同一事件的其他监听器被调用，为了防止多个错误提示同时出现而导致的覆盖行为
            e.stopImmediatePropagation();
          }
        });
      });
    }
  }

  switchIconHandler(e) {
    if (this.state.iconFillName === "custom-yanjing_xianshi_o") {
      this.setState({
        iconFillName: "custom-yanjing_yincang_o",
      });
      this.textInput.current.type = "text";
    } else {
      this.setState({
        iconFillName: "custom-yanjing_xianshi_o",
      });
      this.textInput.current.type = "password";
    }
  }

  changeHandler(e) {
    this.setState({
      value: e.target.value,
    });
  }

  render() {
    const { show, iconFillName, value } = this.state;
    const { showHidden, label, placeHolder, name } = this.props;
    return (
      <HyInputWrapper className="hy_input_wrapper">
        <div className="hy_input_content">
          <div className="hy_input_label">
            <span>{label}</span>
          </div>
          <div className="hy_input">
            <input
              name={name}
              type={showHidden ? "password" : "text"}
              placeholder={placeHolder}
              ref={this.textInput}
              value={value}
              onChange={this.changeHandler.bind(this)}
            />
            {showHidden ? (
              <HyIcon
                icon={iconFillName}
                width={22}
                height={22}
                ref={this.hiddenIcon}
                clickFn={this.switchIconHandler.bind(this)}
              />
            ) : null}
          </div>
        </div>
        <CSSTransition
          timeout={30000}
          in={show}
          classNames={{
            enter: "animate__animated",
            exit: "animate__animated",
            enterActive: "animate__fadeInUp",
            exitActive: "animate__fadeOutDown",
          }}
        >
          <div className="hy_input_tip">
            <span ref={this.tipSpan}></span>
          </div>
        </CSSTransition>
      </HyInputWrapper>
    );
  }
}

export default HyInput;
