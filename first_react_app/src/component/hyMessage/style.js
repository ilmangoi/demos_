import styled from "styled-components";

export const MessageContainer = styled.div`
  user-select: none;
  height: 0px;
  width: 100%;
  overflow: visible;
  position: fixed;
  top: 0;
  .transition_group {
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .animate__animated {
    -webkit-animation-duration: 0.3s;
    animation-duration: 0.3s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
  }
  @-webkit-keyframes fadeInUp {
    from {
      opacity: 0;
      -webkit-transform: translate3d(0, 100%, 0);
      transform: translate3d(0, 100%, 0);
    }
    to {
      opacity: 1;
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }
  }
  @keyframes fadeInUp {
    from {
      opacity: 0;
      -webkit-transform: translate3d(0, 100%, 0);
      transform: translate3d(0, 100%, 0);
    }
    to {
      opacity: 1;
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }
  }
  .animate__fadeInUp {
    -webkit-animation-name: fadeInUp;
    animation-name: fadeInUp;
  }
  @-webkit-keyframes fadeOutUp {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
      -webkit-transform: translate3d(0, -100%, 0);
      transform: translate3d(0, -100%, 0);
    }
  }
  @keyframes fadeOutUp {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
      -webkit-transform: translate3d(0, -100%, 0);
      transform: translate3d(0, -100%, 0);
    }
  }
  .animate__fadeOutUp {
    -webkit-animation-name: fadeOutUp;
    animation-name: fadeOutUp;
  }
`;

export const SuccessMessageItem = styled.div`
  margin-top: 15px;
  height: 50px;
  line-height: 50px;
  background-color: #e1f3d8;
  border-radius: 3px;
  color: #67c23a;
  font-size: 14px;
  padding: 0 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  .message_content {
    flex: 1;
    margin-left: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const ErrorMessageItem = styled.div`
  margin-top: 15px;
  height: 50px;
  line-height: 50px;
  background-color: #fef0f0;
  border-radius: 3px;
  color: #f56c6c;
  font-size: 14px;
  padding: 0 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  .message_content {
    flex: 1;
    margin-left: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const InfoMessageItem = styled.div`
  margin-top: 15px;
  width: 200px;
  height: 50px;
  line-height: 50px;
  background-color: #edf2fc;
  border-radius: 3px;
  color: #909399;
  font-size: 14px;
  padding: 0 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  .message_content {
    flex: 1;
    margin-left: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const WarnMessageItem = styled.div`
  margin-top: 15px;
  width: 200px;
  height: 50px;
  line-height: 50px;
  background-color: #fdf6ec;
  border-radius: 3px;
  color: #e6a23c;
  font-size: 14px;
  padding: 0 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  .message_content {
    flex: 1;
    margin-left: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
