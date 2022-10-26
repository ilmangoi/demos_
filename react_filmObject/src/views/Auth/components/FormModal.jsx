import React, { useRef, Fragment, forwardRef, useImperativeHandle, useState } from "react";
import { Modal } from "antd";
import AuthForm from "./AuthForm";

const FormModal = ({ isModalOpen, setIsModalOpen, onSubmitFinish }, _ref) => {
  // 控制弹层的加载状态
  const [loading, setLoading] = useState(false);
  // 通过useRef来获取子组件的实例
  const userFormRef = useRef();

  // 表单提交数据接收(提升到父组件中去做)
  const formSubmitFinish = (values) => {
    setLoading(true);
    onSubmitFinish(values)
      .then(() => {
        setLoading(false);
        setIsModalOpen(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  // 重置表单
  const resetForm = () => {
    userFormRef.current.form.resetFields();
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
      <Modal title={`添加权限节点`} width={900} open={isModalOpen} onCancel={handleCancel} footer={false}>
        {/* 添加权限的表单项 */}
        <AuthForm ref={userFormRef} formSubmitFinish={formSubmitFinish} loading={loading} />
      </Modal>
    </Fragment>
  );
};

export default forwardRef(FormModal);
