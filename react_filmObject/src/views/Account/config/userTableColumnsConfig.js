import { Space, Tag, Image } from "antd";

function getColumnsConfig(delUser, editUser) {
  // 表格列标题与自定义表格列的配置
  return [
    {
      title: "账号",
      align: "left",
      dataIndex: "username",
    },
    {
      title: "昵称",
      dataIndex: "nickname",
    },
    {
      title: "年龄",
      align: "center",
      dataIndex: "age",
      render: (text) => {
        if (text > 20) {
          return <Tag color="#f50">{text}</Tag>;
        }
        return <Tag color="green">{text}</Tag>;
      },
    },
    {
      title: "头像",
      align: "center",
      dataIndex: "avatar",
      render: (text) => <Image width={50} src={text} />,
    },
    {
      title: "城市",
      align: "center",
      dataIndex: "city",
    },
    {
      title: "出生",
      align: "center",
      dataIndex: "birthday",
    },
    {
      title: "操作",
      render: (text, record) => (
        <Space size={1}>
          <Tag color="success" style={{ cursor: "pointer" }} onClick={() => editUser(record.id)}>
            修改
          </Tag>
          <Tag color="error" style={{ cursor: "pointer" }} onClick={() => delUser(record.id)}>
            删除
          </Tag>
        </Space>
      ),
    },
  ];
}

export default getColumnsConfig;
