import React from "react";
import { Tabs, Form, Divider, Button } from "antd";
import BasicForm from "./BasicForm";
import DetailForm from "./DetailForm";

const FormArea = ({ onFinish, html, setHtml }) => {
  return (
    <Form labelCol={{ span: 4 }} wrapperCol={{ span: 16 }} autoComplete="off" onFinish={onFinish}>
      <Tabs
        defaultActiveKey="1"
        onChange={(key) => console.log(key)}
        items={[
          {
            label: `基础信息`,
            key: "1",
            children: <BasicForm />,
          },
          {
            label: `详情信息`,
            key: "2",
            children: <DetailForm html={html} setHtml={setHtml} />,
          },
        ]}
      />
      <Divider />
      <Button htmlType="submit" type="primary">
        添加正在热映电影信息
      </Button>
    </Form>
  );
};

export default FormArea;
