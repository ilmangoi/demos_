import React, { Component } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { MessageContainer } from "./style";
import Message from "./message";
import withConsumer from "@/hoc/withConsumer";

@withConsumer
class HyMessage extends Component {
  render() {
    const { messageList } = this.context;
    return (
      <MessageContainer>
        <TransitionGroup className="transition_group">
          {messageList.map((item) => (
            <CSSTransition
              timeout={300}
              key={item.hyKey}
              unmountOnExit
              classNames={{
                enter: "animate__animated",
                exit: "animate__animated",
                enterActive: "animate__fadeInUp",
                exitActive: "animate__fadeOutUp",
              }}
            >
              <Message {...item} />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </MessageContainer>
    );
  }
}

export default HyMessage;
