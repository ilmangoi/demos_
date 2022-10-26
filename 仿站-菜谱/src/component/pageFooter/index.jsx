import React, { Component, Fragment } from "react";
import { NavLink, withRouter } from "react-router-dom";
import pageFooterConfig from "@/config/component/pageFooterConfig";
import propTypes from "prop-types";
import { PageFooterWrapper } from "./style";

@withRouter
class PageFooter extends Component {
  static defaultProps = {
    show: true,
  };
  static propTypes = {
    show: propTypes.bool,
  };
  render() {
    let pathname = this.props.location.pathname;
    return (
      <Fragment>
        {this.props.show ? (
          <PageFooterWrapper>
            {pageFooterConfig.map((item, index) => (
              <NavLink to={item.path} key={index}>
                <img src={`${item.icon}${pathname === item.path ? "-active" : ""}.png`} alt="" />
                <span>{item.title}</span>
              </NavLink>
            ))}
          </PageFooterWrapper>
        ) : null}
      </Fragment>
    );
  }
}

export default PageFooter;
