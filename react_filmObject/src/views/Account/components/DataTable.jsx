import React, { useState, useImperativeHandle, forwardRef } from "react";
import { Table } from "antd";
import { useLocation } from "react-router-dom";
import useUserTableHook from "@/hooks/useUserTableHook";
import { toSearch } from "@/utils/tools";
import getColumnsConfig from "../config/userTableColumnsConfig";
import "../style.scss";

const DataTable = ({ searchValue, delUser, editUser, switchPage, selectChange }, _ref) => {
  // 由于该组件不是路由的落地组件，因此没有路由对象，所以需要通过useHistory来获取路由对象
  const location = useLocation();
  // 保存选中的用户id（表格左侧的复选框）
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  // 把表格的数据和分页的数据提取出来，方便后面的使用
  const [data, total, dataLoading, loadData, setData] = useUserTableHook(getPageNum(), searchValue);

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
  const columnsConfig = getColumnsConfig(delUser, editUser);

  // 通过url中的page参数来获取当前的页码，用于传给useUserTableHook来加载数据
  function getPageNum() {
    return toSearch(location.search).page ? +toSearch(location.search).page : 1;
  }

  // 给父组件暴露接口
  useImperativeHandle(_ref, () => ({
    selectedRowKeys,
    loadData,
    setData,
  }));

  return (
    <div className="account-datatable-container">
      {/* rowKey 把数据源中的id，当作key来使用，因为id在数据库表中都是唯一不重复 */}
      <Table
        bordered={true}
        rowSelection={rowSelection} // 选中项配置
        rowKey={(record) => record.id} // 唯一的key
        columns={columnsConfig} // 列配置
        dataSource={data} // 数据源
        loading={dataLoading} // 加载状态
        pagination={{
          total,
          pageSize: 10,
          current: getPageNum(),
          onChange: switchPage, // 点击分页页码事件
        }}
      />
    </div>
  );
};

export default forwardRef(DataTable);
