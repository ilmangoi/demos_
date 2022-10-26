import React from "react";
import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Divider } from "antd";
import { array } from "prop-types";

const hyBreadcrumb = ({ crumbs }) => {
  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item href="/dashboard">
          <HomeOutlined />
        </Breadcrumb.Item>
        {crumbs.map((item, index) => (
          <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
        ))}
      </Breadcrumb>
      <Divider />
    </>
  );
};

hyBreadcrumb.propTypes = {
  crumbs: array,
};

hyBreadcrumb.defaultProps = {
  crumbs: [],
};

export default hyBreadcrumb;
