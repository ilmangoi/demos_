import React, { useImperativeHandle, forwardRef, useEffect } from "react";
import { Form, Input } from "antd";
import { checkRoleNameExistsApi, getRoleApi } from "@/api/roleApi";

const RoleForm = ({ onFinish, roleId }, _ref) => {
  // 获取表单组件实例
  let [form] = Form.useForm();

  // 检查角色名称不能在服务器数据端有重复
  const checkRoleNameExists = (role, value) => {
    return checkRoleNameExistsApi(value).then((ret) => {
      if (ret.data === 0) {
        return Promise.resolve("");
      }
      return Promise.reject("");
    });
  };

  useEffect(() => {
    // 如果uid大于0，说明是编辑用户，需要根据uid去获取用户信息并回显
    if (roleId > 0) {
      getRoleApi(roleId).then((ret) => {
        // Form组件有一个实例方法（setFieldsValue），可以去设置请求成功后的数据，不是初始化来设置
        let setUserFormData = { ...ret.data };
        form.setFieldsValue({
          ...setUserFormData,
        });
      });
    }
  }, [roleId]); // eslint-disable-line react-hooks/exhaustive-deps

  useImperativeHandle(_ref, () => ({ form }));

  return (
    <Form form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 18 }} autoComplete="off" onFinish={onFinish}>
      <Form.Item
        label="角色名称"
        name="name"
        rules={[
          { required: true, whitespace: true, message: "角色名称不能为空" },
          { validator: checkRoleNameExists, message: "此角色名称已经存在", validateTrigger: "onBlur" },
        ]}
      >
        <Input placeholder="请输入角色名称" allowClear />
      </Form.Item>
      <Form.Item
        label="角色描述"
        name="description"
        rules={[{ required: true, whitespace: true, message: "角色名称不能为空" }]}
      >
        <Input placeholder="请输入角色描述" allowClear />
      </Form.Item>
    </Form>
  );
};

export default forwardRef(RoleForm);
