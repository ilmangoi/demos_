import React, { useState } from "react";
import { Button, Form, Input, message } from "antd";
import { usernameRules, passwordRules } from "../validate";
import { useDispatch } from "react-redux";
import { asyncLoginAction } from "@/actionCreators/userAction";

const LoginForm = () => {
  const dispatch = useDispatch();
  let [loading, setLoading] = useState(false); // 控制按钮的加载状态(防抖)

  // 表单提交验证通过时被回调
  const onFinish = (userData) => {
    setLoading(true);
    dispatch(asyncLoginAction(userData));
  };

  // 表单提交验证失败时被回调
  const onFinishFailed = (errorInfo) => {
    setLoading(true);
    message.error("表单项验证失败", 2, () => setLoading(false));
  };

  return (
    <Form
      // 表单项的label标签在栅格系统中24等份所占的比例
      labelCol={{
        span: 6,
      }}
      // 表单项在栅格系统中24等份所占的比例
      wrapperCol={{
        span: 16,
      }}
      // 初始化数据,它是一个对象,key和Form.Item中的name属性的值名称要保持一致
      initialValues={{
        username: "admin",
        password: "123456",
      }}
      onFinish={onFinish} // 表单验证通过后触发的事件
      onFinishFailed={onFinishFailed} // 表单验证失败后触发的事件
      autoComplete="off" // 关闭浏览器自动填充功能
    >
      <Form.Item
        label="账号"
        name="username" // 接受表单项数据所用到的名称
        rules={usernameRules} // 表单验证规则
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="密码"
        name="password" // 接受表单项数据所用到的名称
        rules={passwordRules} // 表单验证规则
      >
        <Input />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 6,
          span: 16,
        }}
      >
        <Button loading={loading} type="primary" htmlType="submit">
          进入系统
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
