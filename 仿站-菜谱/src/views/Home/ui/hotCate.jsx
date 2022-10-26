import CustomGrid from "@/component/customGrid";
import React, { Component } from "react";
import { HomeHotCateContainer } from "../style";

class HotCate extends Component {
  render() {
    return (
      <HomeHotCateContainer>
        <div className="title">热门分类</div>
        {this.props.data.length > 0 ? (
          <CustomGrid
            onClick={(id) => {
              console.log(id, this.props.history);
            }}
            data={this.props.data}
          />
        ) : null}
      </HomeHotCateContainer>
    );
  }
}

export default HotCate;
