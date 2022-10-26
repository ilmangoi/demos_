import React, { useEffect } from "react";
import { Button, Form, Input, InputNumber } from "antd";
import { idToInfoApi, userEditApi } from "@/api/userApi";
import { useParams, useNavigate } from "react-router-dom";

const UserEdit = () => {
  // 地址栏转过来的数据都为字符串  如果你要写类型，字段类型为 string
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();
  // 得到的数据后，要动态给Form表单项设置上去，用到Form它的实例
  // 用上Form自带的ref对象对象，得到它的实例，调用实例中的方法，完成表单项的数据设置
  const [form] = Form.useForm();
  // 网络请求得到对应id它的用户信息
  useEffect(() => {
    // 发起网络请求，根据用户id得到对应的用户信息
    idToInfoApi(Number(params.id)).then((ret) => {
      // 设置表单项
      form.setFieldsValue(ret.data);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onFinish = async (values: any) => {
    let id = Number(params.id);
    let ret = await userEditApi(id, { id, ...values });
    if (ret.code === 0) {
      navigate("/");
    }
  };
  const onFinishFailed = (errorInfo: any) => {};

  return (
    <Form
      form={form}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 12 }}
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
          修改用户信息
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UserEdit;
