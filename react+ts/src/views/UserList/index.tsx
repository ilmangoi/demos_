import React, { useEffect, useState } from "react";
import { userListApi, userDelApi } from "@/api/userApi";
import { Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { UserType } from "@/typings/userType";
import { useNavigate } from "react-router-dom";

const UserList = () => {
  const [data, setData] = useState<UserType[]>([]);
  const navigate = useNavigate();

  const delUser = async (id: number) => {
    let ret = await userDelApi(id);
    // 删除成功后，重新请求数据
    if (ret.code === 0) {
      userListApi().then((ret) => {
        setData(ret.data);
      });
    }
  };

  // 定义表格列，类型为ColumnsType<UserType>，其中UserType是我们定义的用户类型
  // ColumnsType是antd的类型，使用它可以把UserType中的属性和表格列的属性对应起来
  const columns: ColumnsType<UserType> = [
    {
      title: "用户名",
      dataIndex: "name",
    },
    {
      title: "年龄",
      dataIndex: "age",
    },
    {
      title: "操作",
      render: (_, record) => {
        return (
          <Space size="middle">
            <span
              onClick={() => {
                navigate(`/${record.id}`);
              }}
            >
              修改
            </span>
            <span
              onClick={() => {
                delUser(record.id);
              }}
            >
              删除
            </span>
          </Space>
        );
      },
    },
  ];

  useEffect(() => {
    userListApi().then((ret) => {
      setData(ret.data);
    });
  }, []);

  return (
    <div>
      <Table rowKey={(record) => record.id} columns={columns} dataSource={data} />
    </div>
  );
};

export default UserList;
