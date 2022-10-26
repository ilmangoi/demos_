import React, { useEffect, useState, useCallback, useRef } from "react";
import { message } from "antd";
import { addAuthApi, getAuthListApi } from "@/api/authApi";
import { getRoleListApi, getRoleToAuthApi } from "@/api/roleApi";
import HyBreadcrumb from "@/component/hyBreadcrumb";
import FormArea from "./components/FormArea";
import DataTable from "./components/DataTable";
import FormModal from "./components/FormModal";
import DispatchRoleDrawer from "./components/DispatchRoleDrawer";
import "./style.scss";

const Index = () => {
  // 弹层的实例对象
  const fromModalRef = useRef(null);
  // 添加权限的弹层是否打开
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 分配权限的抽屉是否打开
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  // 权限数据
  const [authData, setAuthData] = useState([]);
  // 角色数据
  const [roleData, setRoleData] = useState([]);
  // 权限树型数据
  const [treeData, setTreeData] = useState([]);
  // 树状组件中选中的权限节点列表
  const [selectedAuthKeys, setSelectedAuthKeys] = useState([]);
  // 当前选中的角色
  const [currentRoleId, setCurrentRoleId] = useState(null);

  // 提交表单数据
  const onSubmitFinish = useCallback((values) => {
    return new Promise((resolve, reject) => {
      addAuthApi(values)
        .then((ret) => {
          if (ret.code === 0) {
            message.success("添加权限节点成功", 2, () => {
              fromModalRef.current.resetForm();
              resolve();
            });
          }
        })
        .catch((err) => {
          message.error("添加权限节点失败", 2, () => {
            reject(err);
          });
        });
    });
  }, []);

  // checkedKeys表示选中的复选框，但是如果树型结构中有子节点，那么父节点可以是半选中状态，这时候checkedKeys中就不会包含父节点的key
  // 如果想要获取父节点的key，就要通过info.halfCheckedKeys来获取,这个是一个数组,里面包含了所有半选中的key
  const onTreeCheck = useCallback((checkedKeys, info) => {
    setSelectedAuthKeys(checkedKeys);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onSelectRoleChanged = useCallback((roleId) => {
    // 进行网络请求得到当前角色它所对应的已有的权限列表
    getRoleToAuthApi(roleId).then((ret) => {
      // 设置当前选中的角色id
      setCurrentRoleId(roleId);
      // 把此角色对应的已有权限id进行赋值给当前的组件状态
      setSelectedAuthKeys(ret.data);
    });
  }, []);

  useEffect(() => {
    // 获取角色数据并存储
    getRoleListApi().then((ret) => setRoleData(ret.data.roles));
    // 获取权限数据并存储，然后清洗后存储权限树型数据
    getAuthListApi().then((ret) => {
      setAuthData(ret.data);
      let treeData = [];
      ret.data.forEach((item) => {
        if (item.children) {
          let tmp = { key: item.id, title: item.name, children: [] };
          item.children.forEach((val) => {
            tmp.children.push({
              key: val.id,
              title: val.name,
            });
          });
          treeData.push(tmp);
        } else {
          treeData.push({
            key: item.id,
            title: item.name,
          });
        }
      });
      setTreeData(treeData);
    });
  }, []);

  return (
    <div className="auth-container">
      {/* 面包屑导航 */}
      <HyBreadcrumb crumbs={["权限列表"]} />
      {/* 表单区域 */}
      <FormArea setIsDrawerOpen={setIsDrawerOpen} setIsModalOpen={setIsModalOpen} />
      {/* 表格数据区域 */}
      <DataTable authData={authData} />
      {/* 弹层区域 */}
      <FormModal
        ref={fromModalRef}
        onSubmitFinish={onSubmitFinish}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      {/* 分配角色的抽屉 */}
      <DispatchRoleDrawer
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
        onSelectRoleChanged={onSelectRoleChanged}
        currentRoleId={currentRoleId}
        roleData={roleData}
        onTreeCheck={onTreeCheck}
        treeData={treeData}
        selectedAuthKeys={selectedAuthKeys}
      />
    </div>
  );
};

export default Index;
