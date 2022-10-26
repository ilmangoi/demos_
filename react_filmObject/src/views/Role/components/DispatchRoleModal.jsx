import React, { useState } from "react";
import { Modal, Divider, Input, Checkbox, Row, Col, Button } from "antd";
import _ from "lodash";

const DispatchRoleModal = ({
  setSelectedUserIds,
  selectedUserIds,
  roleId,
  roleName,
  setIsDispatchRoleModalOpen,
  isDispatchRoleModalOpen,
  dispatchRole,
  userData,
}) => {
  // 控制加载状态
  const [isLoading, setIsLoading] = useState(false);

  // 关闭弹层
  const handleCancel = () => {
    setIsDispatchRoleModalOpen(false);
  };

  // 提交要指派的用户
  const submit = () => {
    // 只有勾选了用户，才进行网络请求更新
    if (selectedUserIds.length > 0) {
      setIsLoading(true);
      // 网络请求放进了父组件中
      dispatchRole().finally(() => {
        setIsLoading(false);
      });
    }
  };

  return (
    <Modal
      title={`指派角色 -- ${roleName} -- ${roleId}`}
      width={900}
      open={isDispatchRoleModalOpen}
      onCancel={handleCancel}
      footer={false}
    >
      <Input.Search
        placeholder="搜索指定的用户名"
        allowClear
        enterButton="搜索用户"
        onSearch={(value) => {}}
        style={{ width: 500 }}
      />
      <Divider />
      {/* 用户列表 */}
      <Checkbox.Group
        style={{ width: "100%" }}
        // 使用网络请求获取已经是该角色的用户，让其默认为选中
        value={selectedUserIds}
        onChange={(checkedValues) => setSelectedUserIds(checkedValues)}
      >
        {/* lodash中的数组，分割方法，把一个一维数组，按指定个数分配成2维数组 */}
        {/* 将其切割开，然后使用antd的栅格布局组件将其进行布局 */}
        {_.chunk(userData, 6).map((item, index) => (
          <Row key={`row-${index}`}>
            {item.map((val) => (
              <Col span={4} key={val.id}>
                <Checkbox value={val.id}>
                  {val.username} -- {val.roleId}
                </Checkbox>
              </Col>
            ))}
          </Row>
        ))}
      </Checkbox.Group>
      <Divider />
      <div>
        <Button loading={isLoading} type="primary" onClick={submit}>
          添加选中用户
        </Button>
      </div>
    </Modal>
  );
};

export default DispatchRoleModal;
