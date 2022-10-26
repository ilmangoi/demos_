import React from "react";
import { Button, Form, Input, InputNumber } from "antd";
import { userAddApi } from "@/api/userApi";
import { useNavigate } from "react-router-dom";

const UserAdd = () => {
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    let ret = await userAddApi(values);
    navigate("/");
  };

  const onFinishFailed = (errorInfo: any) => {};

  return (
    <Form
      name="basic"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 12 }}
      initialValues={{ age: 20 }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item label="姓名" name="name" rules={[{ required: true, whitespace: true, message: "必须要填写" }]}>
        <Input />
      </Form.Item>

      <Form.Item
        label="年龄"
        name="age"
        rules={[
          { min: 1, type: "number", message: "年龄不能小于1岁" },
          { max: 200, type: "number", message: "年龄不能大于200岁" },
        ]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 4, span: 12 }}>
        <Button type="primary" htmlType="submit">
          添加用户信息
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UserAdd;
