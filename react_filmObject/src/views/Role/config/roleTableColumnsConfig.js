import { Button } from "antd";

function getRoleTableColumnsConfig(delRole, editRole, openDispatchRoleModal, dispatchPermission) {
  return [
    {
      title: "角色ID",
      dataIndex: "id",
      align: "center",
      width: 70,
    },
    {
      title: "角色名称",
      dataIndex: "name",
      width: 100,
    },
    {
      title: "角色简介",
      dataIndex: "description",
    },
    {
      title: "操作",
      width: 200,
      render: (_, record) => {
        return (
          <>
            <Button type="primary" size="small" onClick={editRole.bind(this, record)}>
              修改
            </Button>
            <Button type="primary" size="small" onClick={delRole.bind(this, record)} style={{ marginLeft: 10 }}>
              删除
            </Button>
            <Button
              onClick={openDispatchRoleModal.bind(this, record)}
              type="primary"
              size="small"
              style={{ background: "#c41d7f", border: "none", marginTop: 10 }}
            >
              分配用户
            </Button>
            <Button
              onClick={dispatchPermission.bind(this, record)}
              style={{ background: "#f63051", border: "none", marginLeft: 10, marginTop: 10 }}
              type="primary"
              size="small"
            >
              分配权限
            </Button>
          </>
        );
      },
    },
  ];
}
export default getRoleTableColumnsConfig;
