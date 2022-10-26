import React from "react";
import { Button } from "antd";
import "../style.scss";

const NavigationBar = ({ goBack }) => {
  return (
    <div className="add-nowplaying-add-btn">
      <Button type="primary" onClick={() => goBack()}>
        返回列表
      </Button>
    </div>
  );
};

export default NavigationBar;
