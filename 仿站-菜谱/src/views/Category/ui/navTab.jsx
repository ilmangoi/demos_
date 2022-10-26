import React, { Component } from "react";
import { CategoryNavBar } from "../style";

class NavTab extends Component {
  toggleTabNav = (currentIndex) => this.props.setNavTabCurrentIndex(currentIndex);

  render() {
    let { currentIndex } = this.props;
    return (
      <CategoryNavBar>
        <ul>
          <li className={currentIndex === 0 ? "active" : ""} onClick={() => this.toggleTabNav(0)}>
            分类
          </li>
          <li className={currentIndex === 1 ? "active" : ""} onClick={() => this.toggleTabNav(1)}>
            食材
          </li>
          <li className={currentIndex === 0 ? "slider" : "slider right"}></li>
        </ul>
      </CategoryNavBar>
    );
  }
}

export default NavTab;
