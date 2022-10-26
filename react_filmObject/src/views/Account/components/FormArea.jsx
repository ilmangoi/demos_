import React, { useEffect, useState } from "react";
import { Button, Input } from "antd";
import "../style.scss";

const FormArea = ({ handleSearchUser, uidLen, exportSelectUserExcel, addUser }) => {
  // 是否显示导出excel按钮
  const [isExcel, setIsExcel] = useState(false);

  // uidLen变化时，判断是否显示导出excel按钮
  useEffect(() => {
    setIsExcel(uidLen > 0);
  }, [uidLen]);

  return (
    <div className="account-formarea-container">
      <div>
        {/* onSearch事件中按下回车，或点击搜索时触发，参数就是输入框中的内容 */}
        <Input.Search placeholder="输入你想搜索内容" allowClear enterButton="搜索一下" onSearch={handleSearchUser} />
      </div>
      <div>
        {isExcel ? (
          <Button onClick={exportSelectUserExcel} className="account-formarea-excel-btn">
            导出选中用户为excel文件
          </Button>
        ) : null}
        <Button type="primary" onClick={addUser}>
          添加用户
        </Button>
      </div>
    </div>
  );
};

export default FormArea;
