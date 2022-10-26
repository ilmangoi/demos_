import React from "react";

const withSpiderDoc = (Cmp) => {
  return class extends React.Component {
    async componentDidMount() {
      // 收集访问数据
      let userAgent = window.navigator.userAgent;
      let clientWidth = document.documentElement.clientWidth;
      // 网络请求
      console.log(clientWidth, userAgent);
    }

    render() {
      return <Cmp {...this.props} />;
    }
  };
};

export default withSpiderDoc;
