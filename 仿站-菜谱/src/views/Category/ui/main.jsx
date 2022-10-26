import React, { Component } from "react";
import { CategoryMainContainer } from "../style";

class Main extends Component {
  render() {
    let { menu, mainData, currTabIndex, setCurrentIndex } = this.props;

    return (
      <CategoryMainContainer>
        <div className="slider">
          <ul>
            {menu.map((item, index) => (
              <li
                onClick={() => setCurrentIndex(index, item)}
                key={index}
                // 根据记录的状态来设置激活状态
                className={currTabIndex === index ? "active" : ""}
              >
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="main">
          <ul>
            {mainData.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </CategoryMainContainer>
    );
  }
}

export default Main;
