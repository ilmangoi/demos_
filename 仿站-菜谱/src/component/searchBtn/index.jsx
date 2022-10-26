import React, { Component } from "react";
import { string, func, element, oneOfType, bool } from "prop-types";
import { SearchBtnContainer } from "./style";

class SearchBtn extends Component {
  render() {
    return (
      <SearchBtnContainer borderColor={this.props.borderColor} onClick={this.props.onClick}>
        {this.props.icon && <img src="http://img.1314000.cn/icon/search.png" alt="" />}
        <span>{this.props.title}</span>
      </SearchBtnContainer>
    );
  }
}

SearchBtn.propTypes = {
  onClick: func,
  borderColor: string,
  icon: bool,
  title: oneOfType([string, element]),
};
SearchBtn.defaultProps = {
  onClick: () => {},
  title: "搜索你要找的菜",
  borderColor: "#ff6c0c",
  icon: true,
};
export default SearchBtn;
