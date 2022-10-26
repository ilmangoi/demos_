import React from "react";
import { Form, Input } from "antd";

const BasicForm = () => {
  return (
    <div>
      <Form.Item label="电影名称" name="filmName">
        <Input placeholder="电影名称" />
      </Form.Item>
    </div>
  );
};

export default BasicForm;
