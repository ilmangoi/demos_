import React, { Component } from "react";
import { Grid } from "antd-mobile";
import { array, bool, number, func } from "prop-types";

class CustomGrid extends Component {
  render() {
    let { data, hasLine, columnNum, onClick } = this.props;
    return (
      <Grid
        hasLine={hasLine}
        data={data}
        columnNum={columnNum}
        activeStyle={false}
        itemStyle={{ height: "1.33rem" }}
        renderItem={(row, index) => {
          return (
            <div onClick={(evt) => onClick(row.id)} style={{ lineHeight: "1.33rem" }}>
              {row.title}
            </div>
          );
        }}
      />
    );
  }
}

CustomGrid.propTypes = {
  data: array.isRequired,
  hasLine: bool,
  columnNum: number,
  onClick: func,
};

CustomGrid.defaultProps = {
  hasLine: true,
  columnNum: 4,
  onClick: () => {},
};

export default CustomGrid;
