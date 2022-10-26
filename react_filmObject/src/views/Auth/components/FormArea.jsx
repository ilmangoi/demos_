import React from "react";
import { Button } from "antd";
import "../style.scss";

const FormArea = ({ setIsModalOpen, setIsDrawerOpen }) => {
  return (
    <div className="auth-add-btn">
      <Button
        type="primary"
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        添加权限节点
      </Button>
      <Button
        type="primary"
        onClick={() => {
          setIsDrawerOpen(true);
        }}
      >
        分配角色
      </Button>
    </div>
  );
};

export default FormArea;
