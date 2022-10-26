import React, { useState, forwardRef, useImperativeHandle, useEffect } from "react";
import { Button, Checkbox, DatePicker, Form, Input, Radio, Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { getUserInfoApi } from "@/api/userApi";
import moment from "moment";

let UserForm = ({ formSubmitFinish, uid }, _ref) => {
  // 通过antd中的Form组件提供的一个自定义的hook，来得到当前Form组件的实例
  // antd在这个Form组件实例中提供了很多方法，如果表单提交，查看表单数据等
  const [form] = Form.useForm();
  const [avatar, setAvatar] = useState("");

  //! 表单验证通过后，可以通过此事件得到数据
  //! 注意：日期组件的值是一个moment对象，需要通过format方法转换成字符串
  const onFinish = (values) => {
    formSubmitFinish({ ...values, birthday: values.birthday.format("YYYY-MM-DD"), avatar });
  };

  // 上传组件事件
  const changeUpdateFromEvent = (e) => {
    // 这个回调函数可以监听到上传组件中所有的事件，包括上传成功、上传失败、上传中等等
    // 这里只监听上传成功的事件，上传成功就把上传成功后的图片地址保存到avatar中
    // 上传组件会自动发送一个请求，请求的地址是action属性中的值，请求的参数是fileList属性中的值
    // 上传成功后，会把上传成功后的服务器返回数据给我们，我们可以通过e.file.response来获取
    if (e.file.status === "done") {
      setAvatar(e.file.response.data.path);
    }

    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  useEffect(() => {
    // 如果uid大于0，说明是编辑用户，需要根据uid去获取用户信息并回显
    if (uid > 0) {
      getUserInfoApi(uid).then((ret) => {
        // 设置头像
        setAvatar(ret.data.avatar);
        // Form组件有一个实例方法（setFieldsValue），可以去设置请求成功后的数据，不是初始化来设置
        let setUserFormData = { ...ret.data, birthday: moment(ret.data.birthday) };
        // 头像通过状态来单独的设置，无需要在通过Form组件的实例来设置
        delete setUserFormData.avatar;
        form.setFieldsValue({
          ...setUserFormData,
        });
      });
    }
  }, [uid]); // eslint-disable-line react-hooks/exhaustive-deps

  // 通过forwardRef提供的_ref(父组件传过来的ref对象)，把当前组件中相关数据穿透给父组件
  useImperativeHandle(_ref, () => ({
    form,
    setAvatar,
  }));

  return (
    <Form
      name="userForm"
      // form属性，传入一个Form组件对象中自定义的hook所创建的ref对象，得到当前Form组件的实例
      form={form}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 16 }}
      initialValues={{
        sex: "1",
        lessons: ["html", "css", "js"],
        // 给日期选择器添加初始值, 在公司用人，一定要求是成年 18
        birthday: moment().add(-18, "y"),
        fileList: [],
      }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        label="账号"
        name="username"
        rules={[
          {
            required: true,
            whitespace: true,
            message: "请输入用户名!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="密码"
        name="password"
        rules={[
          {
            required: true,
            whitespace: true,
            message: "请输入密码!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="性别" name="sex">
        <Radio.Group>
          <Radio value="1">先生</Radio>
          <Radio value="2">女士</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item name="lessons" label="课程">
        <Checkbox.Group>
          <Checkbox value="html">HTML</Checkbox>
          <Checkbox value="css">CSS</Checkbox>
          <Checkbox value="js">JS</Checkbox>
          <Checkbox value="vue">VUE</Checkbox>
          <Checkbox value="react">REACT</Checkbox>
        </Checkbox.Group>
      </Form.Item>
      <Form.Item
        name="city"
        label="城市"
        rules={[
          {
            required: true,
            message: "请选择一个城市!",
          },
        ]}
      >
        <Select onChange={(value) => console.log(value)} placeholder="选择您所在的城市名称" style={{ width: 200 }}>
          <Select.Option value="1000">北京</Select.Option>
          <Select.Option value="1001">上海</Select.Option>
          <Select.Option value="1002">深圳</Select.Option>
          <Select.Option value="1003">重庆</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="birthday"
        label="出生日期"
        rules={[
          {
            validator: (rule, value) => {
              const diffDay = moment().diff(value, "y");
              if (diffDay >= 18) {
                return Promise.resolve("");
              }
              return Promise.reject("");
            },
            message: "年龄小于18岁，不符合法定工作年龄!",
            validateTrigger: "onBlur",
          },
        ]}
      >
        <DatePicker inputReadOnly />
      </Form.Item>
      <Form.Item
        name="avatar"
        label="上传头像"
        // 这个属性相当于在子组件 Upload组件中添加了一个fileList属性，并且也让表单组件知道它的value值叫fileList
        // 这里因为表单组件中的默认值都是要在initialValues中设置的，所以为了统一，这里把upload的fileList属性也放到initialValues中
        valuePropName="fileList"
        // 监听上传组件的所有事件
        getValueFromEvent={changeUpdateFromEvent}
        // 表单项提示信息
        extra="图片仅支持jpg、png、gif，且大于不能超过2M"
      >
        <Upload action="http://localhost:8888/static/uploadImg?dir=common" listType="picture" showUploadList={false}>
          <Button icon={<UploadOutlined />}>上传头像</Button>
          <img src={avatar} alt="" style={{ width: 50, marginLeft: 20 }} />
        </Upload>
      </Form.Item>
    </Form>
  );
};

export default forwardRef(UserForm);
