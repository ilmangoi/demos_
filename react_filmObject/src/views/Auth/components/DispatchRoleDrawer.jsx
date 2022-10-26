import React, { useCallback } from "react";
import { Drawer, Select, Divider, Tree, Button } from "antd";

const DispatchRoleDrawer = ({
  isDrawerOpen,
  setIsDrawerOpen,
  onSelectRoleChanged,
  currentRoleId,
  roleData,
  onTreeCheck,
  treeData,
  selectedAuthKeys,
}) => {
  // 关闭抽屉
  const onClose = useCallback(() => {
    setIsDrawerOpen(false);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Drawer title="分配权限节点到角色中" width={500} placement="right" onClose={onClose} open={isDrawerOpen}>
      {/* 选择角色进行分配权限 */}
      <Select
        showSearch
        style={{ width: 230 }}
        placeholder="选择你需要分配的角色"
        // 搜索时过滤对应的 option 属性，如设置为 children 表示对Select.Option内嵌内容进行搜索。
        optionFilterProp="children"
        // 是否根据输入项进行筛选。当其为一个函数时，会接收 inputValue option 两个参数，
        // option 表示 Select.Option ，它是一个对象，包含children和一些其他属性，input 表示用户输入的值。
        filterOption={(input, option) => option.children.includes(input)}
        onChange={onSelectRoleChanged}
      >
        {roleData.map((item) => (
          <Select.Option key={item.id} value={item.id}>
            {item.name}
          </Select.Option>
        ))}
      </Select>
      <Divider />
      {/* 权限树状列表 */}
      <Tree
        checkable
        // 这里要使用checkedKeys，而不是defaultCheckedKeys,因为defaultCheckedKeys只会在第一次渲染的时候生效
        checkedKeys={selectedAuthKeys}
        defaultExpandAll={true}
        onCheck={onTreeCheck}
        treeData={treeData}
      />
      <Divider />
      <Button
        type="primary"
        onClick={() => {
          console.log(
            "得到当有角色id和它所对应的权限id列表，发起网络请求给接口，完成记录",
            selectedAuthKeys,
            currentRoleId
          );
        }}
      >
        给角色分配权限
      </Button>
    </Drawer>
  );
};

export default DispatchRoleDrawer;
