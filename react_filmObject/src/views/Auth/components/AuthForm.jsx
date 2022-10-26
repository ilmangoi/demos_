import React, { forwardRef, useImperativeHandle } from "react";
import { Button, Form, Input, Radio, Select } from "antd";

let UserForm = ({ formSubmitFinish, loading }, _ref) => {
  // 通过antd中的Form组件提供的一个自定义的hook，来得到当前Form组件的实例
  // antd在这个Form组件实例中提供了很多方法，如果表单提交，查看表单数据等
  const [form] = Form.useForm();

  // 表单验证通过后，可以通过此事件得到数据
  const onFinish = (values) => {
    formSubmitFinish(values);
  };

  // 通过forwardRef提供的_ref(父组件传过来的ref对象)，把当前组件中相关数据穿透给父组件
  useImperativeHandle(_ref, () => ({
    form,
  }));

  return (
    <Form
      form={form}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 16 }}
      autoComplete="off"
      initialValues={{
        isMenu: "1",
        icon: "ShoppingFilled",
        pid: "0",
      }}
      onFinish={onFinish}
    >
      <Form.Item label="上级权限" name="pid">
        <Select placeholder="选择权限节点">
          <Select.Option value="0">顶级节点</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="路由地址" name="route">
        <Input placeholder="输入路由地址，不要有重复" />
      </Form.Item>
      <Form.Item label="icon图标" name="icon">
        <Input placeholder="在图标库中有的图标名称" />
      </Form.Item>
      <Form.Item
        label="节点名称"
        name="name"
        rules={[{ required: true, whitespace: true, message: "节点名称不能为空" }]}
      >
        <Input placeholder="填写当前添加的节点名称" />
      </Form.Item>
      <Form.Item label="是否为菜单" name="isMenu">
        <Radio.Group>
          <Radio value="1">是</Radio>
          <Radio value="2">否</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 4,
        }}
      >
        <Button type="primary" htmlType="submit" loading={loading}>
          添加权限节点
        </Button>
      </Form.Item>
    </Form>
  );
};

export default forwardRef(UserForm);
