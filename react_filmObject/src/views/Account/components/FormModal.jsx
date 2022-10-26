import React, { useRef, Fragment, forwardRef, useImperativeHandle, useState } from "react";
import { Modal } from "antd";
import UserForm from "./UserForm";

const FormModal = ({ isModalOpen, setIsModalOpen, onSubmitFinish, uid }, _ref) => {
  // 控制弹层的加载状态
  const [loading, setLoading] = useState(false);
  // 通过useRef来获取子组件的实例
  const userFormRef = useRef();

  // 表单提交数据接收(提升到父组件中去做)
  const formSubmitFinish = (values) => onSubmitFinish(values);

  // 重置表单
  const resetForm = () => {
    userFormRef.current.setAvatar("");
    userFormRef.current.form.resetFields();
  };

  // 提交表单
  const submitForm = () => userFormRef.current.form.submit();

  // 点击确定时回调该函数
  const handleOk = () => {
    // 通过表单实例对象来获取表单项中的值
    // console.log(userFormRef.current.form.getFieldsValue())
    // 表单提交，这个动作会触发表单组件的表单验证,如果验证通过则触发onFinish事件
    submitForm();
  };

  // 点击取消或关闭时回调该函数
  const handleCancel = () => {
    resetForm(); // 清空表单
    setIsModalOpen(false); // 关闭弹层
  };

  // 把控制弹层的一些方法暴露出去
  useImperativeHandle(_ref, () => ({
    setLoading,
    resetForm,
  }));

  return (
    <Fragment>
      <Modal
        title={uid ? "添加用户信息" : "修改用户信息"}
        width={950}
        okText={uid === 0 ? "添加" : "修改"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={loading}
        // 可以把对话框底部的按钮区域取消
        // footer={false}
        style={{ top: "20px" }}
      >
        {/* 添加用户的表单项 */}
        <UserForm ref={userFormRef} formSubmitFinish={formSubmitFinish} uid={uid} />
      </Modal>
    </Fragment>
  );
};

export default forwardRef(FormModal);
