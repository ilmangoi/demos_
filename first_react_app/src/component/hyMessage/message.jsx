import React, { Component } from "react";
import types from "prop-types";
import { SuccessMessageItem, ErrorMessageItem, InfoMessageItem, WarnMessageItem } from "./style";
import HyIcon from "@/component/hyIcon";
import withConsumer from "@/hoc/withConsumer";

@withConsumer
class Message extends Component {
  static propTypes = {
    children: types.node,
    content: types.string,
    duration: types.number,
    hyKey: types.string,
    type: types.string,
  };
  static defaultProps = {
    duration: 3000,
    content: "这是一个弹窗",
    type: "info",
  };

  componentDidMount() {
    setTimeout(() => {
      this.context.delMessage(this.props.hyKey);
    }, this.props.duration);
  }

  render() {
    const { children, content } = this.props;
    switch (this.props.type) {
      case "success":
        return (
          <SuccessMessageItem>
            <HyIcon icon="custom-chenggong" />
            <div className="message_content">{children || <span>{content}</span>}</div>
          </SuccessMessageItem>
        );
      case "error":
        return (
          <ErrorMessageItem>
            <HyIcon icon="custom-cuowu" />
            <div className="message_content">{children || <span>{content}</span>}</div>
          </ErrorMessageItem>
        );
      case "warn":
        return (
          <WarnMessageItem>
            <HyIcon icon="custom-jinggao" />
            <div className="message_content">{children || <span>{content}</span>}</div>
          </WarnMessageItem>
        );
      case "info":
      default:
        return (
          <InfoMessageItem>
            <HyIcon icon="custom-xiaoxi" />
            <div className="message_content">{children || <span>{content}</span>}</div>
          </InfoMessageItem>
        );
    }
  }
}

export default Message;
