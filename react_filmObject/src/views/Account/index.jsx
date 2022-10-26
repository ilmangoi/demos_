import React, { useState, useCallback, useRef } from "react";
import { message, Modal } from "antd";
import { utils, writeFile } from "xlsx";
import HyBreadcrumb from "@/component/hyBreadcrumb";
import FormArea from "./components/FormArea";
import DataTable from "./components/DataTable";
import FormModal from "./components/FormModal";

import { addUserApi, editUserInfoApi, selectUsersApi, deleteUserApi } from "@/api/userApi";

// 这是一个容器组件，所有的ui展示都是在此组件是来引入的，它只负责逻辑处理的部分
// 里面公用的数据可以通过状态提升来完成共享，当然也可以通过context或useReducer来完成
const Account = ({ history, location }) => {
  // 获取弹层组件的实例中暴露出来的方法
  const userModal = useRef(null);
  // 获取表格组件的实例中暴露出来的方法
  const dataTableRef = useRef(null);
  // 控制添加用户的弹层是否打开
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 如果uid为0，则表示为添加用户，如果大于0则表示为修改用户
  const [uid, setUid] = useState(0);
  // 记录选中的用户数量
  const [uidLen, setUidLen] = useState(0);
  // 搜索框中的数据
  const [searchValue, setSearchValue] = useState("");

  // 表单提交事件的回调
  const onSubmitFinish = useCallback((formData) => {
    if (uid === 0) {
      userModal.current.setLoading(true); // 让提交用户的弹层进入等待
      addUserApi(formData)
        .then((ret) => {
          if (ret.code === 0) {
            setIsModalOpen(false); // 添加用户到接口成功时，关闭对话框
            userModal.current.setLoading(false); // 关闭等待状态
            userModal.current.resetForm(); // 清空表单
            message.success("提交成功"); // 提交失败则给一个轻提示
          }
        })
        .catch((e) => {
          message.error("提交失败"); // 提交失败则给一个轻提示
          userModal.current.setLoading(false); // 关闭等待状态
        });
    } else {
      userModal.current.setLoading(true); // 让提交用户的弹层进入等待
      editUserInfoApi(formData)
        .then((ret) => {
          if (ret.code === 0) {
            setIsModalOpen(false); // 添加用户到接口成功时，关闭对话框
            userModal.current.setLoading(false); // 关闭等待状态
            userModal.current.resetForm(); // 清空表单
            message.success("修改成功"); // 提交失败则给一个轻提示
          }
        })
        .catch((e) => {
          message.error("修改失败"); // 提交失败则给一个轻提示
          userModal.current.setLoading(false); // 关闭等待状态
        });
    }
  }, []); // eslint-disable-line

  // 搜索事件的回调
  const handleSearchUser = useCallback((value) => {
    if (/^\s+$/.test(value)) {
      message.error("搜索内容为空");
      return;
    }
    // 点击搜索的按钮时，才把输入框中的数据同步到state中，因为有依赖项监听，所以会触发对应的请求
    setSearchValue(value);
  }, []); // eslint-disable-line

  // 导出用户数据为excel
  const exportSelectUserExcel = useCallback(async () => {
    // 通过网络请求得到服务器端返回过来的数据
    let ret = await selectUsersApi(dataTableRef.current.selectedRowKeys);
    // json数据转换成excel文件给用户下载
    let newBook = utils.book_new();
    let sheet = utils.json_to_sheet(ret);
    utils.book_append_sheet(newBook, sheet, "用户列表数据");
    writeFile(newBook, "download.xlsx");
  }, []); // eslint-disable-line

  // 删除用户
  const delUser = useCallback((id) => {
    Modal.confirm({
      title: "删除用户确认",
      content: "您真的要删除此用户信息吗？",
      okText: "确认删除",
      cancelText: "再想一下",
      onOk: () => {
        // 返回一个promise对象，异步关闭确认框
        return deleteUserApi(id).then((ret) => {
          message.success("删除用户成功", 1, () => {
            dataTableRef.current.setData((v) => v.filter((item) => item.id !== id));
          });
        });
      },
    });
  }, []); // eslint-disable-line

  // 修改用户
  const editUser = useCallback((id) => {
    setUid(id); // 设置uid，用于判断是添加用户还是修改用户（大于0表示修改用户）
    setIsModalOpen(true); // 打开弹层
  }, []); // eslint-disable-line

  // 添加用户
  const addUser = useCallback(() => {
    setUid(0); // 设置uid，用于判断是添加用户还是修改用户（等于0表示添加用户）
    setIsModalOpen(true); // 打开弹层
  }, []); // eslint-disable-line

  // 切换页码
  const switchPage = useCallback((page) => {
    dataTableRef.current.loadData(page);
    history.replace(location.pathname + "?page=" + page);
  }, []); // eslint-disable-line

  // 用户表格选择框变动时的回调
  const selectChange = useCallback((selectedRowKeys) => {
    setUidLen(selectedRowKeys.length);
  }, []); // eslint-disable-line

  return (
    <div>
      {/* 面包屑导航 */}
      <HyBreadcrumb crumbs={["用户列表"]} />
      {/* 表单区域 */}
      <FormArea
        handleSearchUser={handleSearchUser}
        exportSelectUserExcel={exportSelectUserExcel}
        uidLen={uidLen}
        addUser={addUser}
      />
      {/* 表格区域 */}
      <DataTable
        ref={dataTableRef}
        searchValue={searchValue}
        delUser={delUser}
        editUser={editUser}
        switchPage={switchPage}
        selectChange={selectChange}
      />
      {/* 弹出层表单 */}
      <FormModal
        uid={uid}
        ref={userModal}
        onSubmitFinish={onSubmitFinish}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
};

export default Account;
