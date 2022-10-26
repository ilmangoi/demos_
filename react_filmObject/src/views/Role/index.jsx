import React, { useCallback, useRef, useState } from "react";
import { message, Modal } from "antd";
import HyBreadcrumb from "@/component/hyBreadcrumb";
import FormArea from "./components/FormArea";
import DataTable from "./components/DataTable";
import FormModal from "./components/FormModal";
import DisPatchRoleModal from "./components/DispatchRoleModal";
import { editRoleApi, addRoleApi, delRoleApi, getRoleToUserList, addUserToRole } from "@/api/roleApi";

const Role = () => {
  // 获取弹层组件的实例中暴露出来的方法
  const roleModal = useRef(null);
  // 获取表格组件的实例中暴露出来的方法
  const dataTableRef = useRef(null);
  // 控制添加角色的弹层是否打开
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  // 控制指派角色的弹层是否打开
  const [isDispatchRoleModalOpen, setIsDispatchRoleModalOpen] = useState(false);
  // 如果roleId为0，则表示为添加角色，如果大于0则表示为修改角色
  const [roleId, setRoleId] = useState(0);
  // 当前要操作的角色名称
  const [roleName, setRoleName] = useState("");
  // 记录选中的用户数量
  const [roleIdLen, setRoleIdLen] = useState(0);
  // 搜索框中的数据
  const [searchValue, setSearchValue] = useState("");
  // 被选中的用户ID，用于指派权限
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  // 角色信息
  const [userData, setUserData] = useState([]);

  // 搜索事件的回调
  const handleSearchRole = useCallback((value) => {
    if (/^\s+$/.test(value)) {
      message.error("搜索内容为空");
      return;
    }
    // 点击搜索的按钮时，才把输入框中的数据同步到state中，因为有依赖项监听，所以会触发对应的请求
    setSearchValue(value);
  }, []);

  // 表单提交事件的回调
  const onSubmitFinish = useCallback((formData) => {
    if (roleId === 0) {
      roleModal.current.setLoading(true); // 让提交用户的弹层进入等待
      addRoleApi(formData)
        .then((ret) => {
          if (ret.code === 0) {
            setIsFormModalOpen(false); // 添加用户到接口成功时，关闭对话框
            roleModal.current.setLoading(false); // 关闭等待状态
            roleModal.current.resetForm(); // 清空表单
            message.success("提交成功"); // 提交失败则给一个轻提示
          }
        })
        .catch((e) => {
          message.error("提交失败"); // 提交失败则给一个轻提示
          roleModal.current.setLoading(false); // 关闭等待状态
        });
    } else {
      roleModal.current.setLoading(true); // 让提交用户的弹层进入等待
      editRoleApi(formData)
        .then((ret) => {
          if (ret.code === 0) {
            setIsFormModalOpen(false); // 添加用户到接口成功时，关闭对话框
            roleModal.current.setLoading(false); // 关闭等待状态
            roleModal.current.resetForm(); // 清空表单
            message.success("修改成功"); // 提交失败则给一个轻提示
          }
        })
        .catch((e) => {
          message.error("修改失败"); // 提交失败则给一个轻提示
          roleModal.current.setLoading(false); // 关闭等待状态
        });
    }
  }, []); // eslint-disable-line

  // 删除用户
  const delRole = useCallback((record) => {
    const id = record.id;
    Modal.confirm({
      title: "删除用户确认",
      content: "您真的要删除此用户信息吗？",
      okText: "确认删除",
      cancelText: "再想一下",
      onOk: () => {
        // 返回一个promise对象，异步关闭确认框
        return delRoleApi(id).then((ret) => {
          message.success("删除用户成功", 1, () => {
            dataTableRef.current.setData((v) => v.filter((item) => item.id !== id));
          });
        });
      },
    });
  }, []); // eslint-disable-line

  // 修改用户
  const editRole = useCallback((record) => {
    setRoleId(record.id); // 设置uid，用于判断是添加用户还是修改用户（大于0表示修改用户）
    setIsFormModalOpen(true); // 打开弹层
  }, []); // eslint-disable-line

  // 添加角色
  const addRole = useCallback(() => {
    setRoleId(0); // 设置uid，用于判断是添加用户还是修改用户（等于0表示添加用户）
    setIsFormModalOpen(true); // 打开弹层
  }, []); // eslint-disable-line

  // 给角色分配用户(请求前置信息，并打开弹层)
  const openDispatchRoleModal = useCallback((record) => {
    setRoleId(record.id); // 记录当前要指派角色的id
    setRoleName(record.name); // 记录角色名

    // 在打开弹层之前，先去请求已经是当前角色的用户，作为前置信息进行记录
    getRoleToUserList(record.id).then((ret) => {
      const ids = ret.data.map((v) => v.id);
      setSelectedUserIds(ids); // 设置角色的已有用户（默认选中）
      setUserData(ret.data); // 记录用户信息
      setIsDispatchRoleModalOpen(true); // 打开弹层
    });
  }, []); // eslint-disable-line

  const dispatchRole = useCallback(() => {
    // 这里返回一个promise，方便子组件中控制按钮的加载状态
    return new Promise((resolve, reject) => {
      addUserToRole(roleId, selectedUserIds)
        .then((ret) => {
          message.success("指派成功", 2, () => {
            setIsDispatchRoleModalOpen(false); // 关闭弹层
            resolve();
          });
        })
        .catch((err) => {
          message.success("指派失败", 2, () => {
            reject(err);
          });
        });
    });
  }, []); // eslint-disable-line

  // 给角色分配权限
  const dispatchPermission = useCallback(() => {}, []); // eslint-disable-line

  // 用户表格选择框变动时的回调
  const selectChange = useCallback((selectedRowKeys) => {
    setRoleIdLen(selectedRowKeys.length);
  }, []); // eslint-disable-line

  return (
    <div>
      <HyBreadcrumb crumbs={["角色列表"]} />
      {/* 表单区域 */}
      <FormArea addRole={addRole} handleSearchRole={handleSearchRole} roleIdLen={roleIdLen} />
      {/* 添加修改角色的弹窗 */}
      <FormModal
        roleId={roleId}
        ref={roleModal}
        onSubmitFinish={onSubmitFinish}
        isFormModalOpen={isFormModalOpen}
        setIsFormModalOpen={setIsFormModalOpen}
      />
      {/* 角色表格区域 */}
      <DataTable
        ref={dataTableRef}
        delRole={delRole}
        editRole={editRole}
        selectChange={selectChange}
        openDispatchRoleModal={openDispatchRoleModal}
        dispatchPermission={dispatchPermission}
        searchValue={searchValue}
      />
      {/* 指派用户的弹层 */}
      <DisPatchRoleModal
        selectedUserIds={selectedUserIds}
        setSelectedUserIds={setSelectedUserIds}
        roleId={roleId}
        roleName={roleName}
        setIsDispatchRoleModalOpen={setIsDispatchRoleModalOpen}
        isDispatchRoleModalOpen={isDispatchRoleModalOpen}
        dispatchRole={dispatchRole}
        userData={userData}
      />
    </div>
  );
};

export default Role;
