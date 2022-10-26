import React from "react";
import "./style.scss";
import HyBreadcrumb from "@/component/hyBreadcrumb";
import { Button } from "antd";

const Nowplaying = ({ history: { push } }) => {
  return (
    <div className="nowplaying-container">
      <HyBreadcrumb crumbs={["正在热映列表"]} />
      <div className="nowplaying-add-btn">
        <Button type="primary" onClick={() => push("/films/addNowplaying")}>
          添加正在热映电影
        </Button>
      </div>
    </div>
  );
};

export default Nowplaying;
