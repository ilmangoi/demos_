import React from "react";
import { Table } from "antd";

const DataTable = ({ authData }) => {
  // 表格嵌套
  const columns = [
    {
      title: "节点名称",
      dataIndex: "name",
    },
    {
      title: "菜单",
      dataIndex: "isMenu",
    },
    {
      title: "路由地址",
      dataIndex: "route",
    },
  ];

  return (
    <Table
      //  让key不同，则它会重新创建，此时一定会初始化，这样就会展开
      key={"" + authData.length}
      // rowKey 把数据源中的id，当作key来使用，因为id在数据库表中都是唯一不重复
      rowKey={(record) => record.id}
      columns={columns}
      expandable={{ defaultExpandAllRows: true }}
      dataSource={authData}
      pagination={false}
    />
  );
};

export default DataTable;
