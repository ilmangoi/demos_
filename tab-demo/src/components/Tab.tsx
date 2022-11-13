import React, { forwardRef, useImperativeHandle } from "react";

type IProps = {
  title: string;
  children: (React.ReactElement | string)[] | React.ReactElement | string;
};

function Tab(props: IProps, _ref: any) {
  const activated = () => {
    console.log(props.title + "activated");
  };

  const deactivated = () => {
    console.log(props.title + "deactivated");
  };

  useImperativeHandle(_ref, () => ({
    activated,
    deactivated,
  }));

  return <div>{props.children}</div>;
}

export type IExpose = {
  activated: () => void;
  deactivated: () => void;
};

export default forwardRef(Tab);
