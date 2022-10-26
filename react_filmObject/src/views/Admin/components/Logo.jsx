import React from "react";
import { bool } from "prop-types";
import logo from "@/assets/img/logo_large.jpg";
import smallLogo from "@/assets/img/logo_small.jpg";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const Logo = ({ collapsed }) => {
  return (
    <TransitionGroup>
      <CSSTransition timeout={1000} key={collapsed ? "small" : "large"} classNames="logo">
        {
          // 根据collapsed的值来判断是否展示小logo
          collapsed ? (
            <div className="logo_small">
              <img src={smallLogo} alt="" />
            </div>
          ) : (
            <div className="logo_large">
              <img src={logo} alt="" />
            </div>
          )
        }
      </CSSTransition>
    </TransitionGroup>
  );
};

Logo.propTypes = {
  collapsed: bool.isRequired,
};

export default Logo;
