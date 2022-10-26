import React from "react";
import { Button, Input } from "antd";
import "../style.scss";

const FormArea = ({ handleSearchRole, addRole }) => {
  return (
    <div className="role-formarea-container">
      <div>
        {/* onSearch事件中按下回车，或点击搜索时触发，参数就是输入框中的内容 */}
        <Input.Search placeholder="输入你想搜索内容" allowClear enterButton="搜索一下" onSearch={handleSearchRole} />
      </div>
      <div>
        <Button type="primary" onClick={addRole}>
          添加角色
        </Button>
      </div>
    </div>
  );
};

export default FormArea;
