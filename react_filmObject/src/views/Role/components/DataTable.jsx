import React, { useState, useImperativeHandle, forwardRef } from "react";
import { Table } from "antd";
import useRoleTableHook from "@/hooks/useRoleTableHook";
import getColumnsConfig from "../config/roleTableColumnsConfig";
import "../style.scss";

const DataTable = (
  { searchValue, delRole, editRole, selectChange, openDispatchRoleModal, dispatchPermission },
  _ref
) => {
  // 保存选中的用户id（表格左侧的复选框）
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  // 把表格的数据和分页的数据提取出来，方便后面的使用
  const [data, dataLoading, loadData, setData] = useRoleTableHook(searchValue);

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys); // 保存选中的用户id
    selectChange(newSelectedRowKeys); // 执行父方法传入的处理函数（逻辑代码不往ui组件中去写）
  };

  // 设置表格的初始选中项，与onChange事件回调函数
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  // 表格列配置
  const columnsConfig = getColumnsConfig(delRole, editRole, openDispatchRoleModal, dispatchPermission);

  // 给父组件暴露接口
  useImperativeHandle(_ref, () => ({
    selectedRowKeys,
    loadData,
    setData,
  }));

  return (
    <div className="role-datatable-container">
      {/* rowKey 把数据源中的id，当作key来使用，因为id在数据库表中都是唯一不重复 */}
      <Table
        bordered={true}
        rowSelection={rowSelection} // 选中项配置
        rowKey={(record) => record.id} // 唯一的key
        columns={columnsConfig} // 列配置
        dataSource={data} // 数据源
        loading={dataLoading} // 加载状态
        pagination={false} // 分页
      />
    </div>
  );
};

export default forwardRef(DataTable);
