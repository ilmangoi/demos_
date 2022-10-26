import React, { useState } from "react";
import HyBreadcrumb from "@/component/hyBreadcrumb";
import NavigationBar from "./ui/NavigationBar";
import FormArea from "./ui/FormArea";
import "./style.scss";

// 正在热映列表
const AddNowplaying = ({ history: { goBack } }) => {
  // 编辑器内容
  const [html, setHtml] = useState("");

  // 表单提交
  const onFinish = (values) => {
    console.log({ ...values, html });
  };

  return (
    <div className="add-nowplaying-container">
      {/* 面包屑导航 */}
      <HyBreadcrumb crumbs={["添加正在热映电影信息"]} />
      {/* 导航栏区域 */}
      <NavigationBar goBack={goBack} />
      {/* 表单区域 */}
      <FormArea html={html} setHtml={setHtml} onFinish={onFinish} />
    </div>
  );
};

export default AddNowplaying;
