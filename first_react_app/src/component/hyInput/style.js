import styled from "styled-components";

export const HyInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  user-select: none;
  max-width: 500px;
  min-width: 300px;
  .hy_input_content {
    display: flex;
    flex-direction: row;
    height: 40px;
    .hy_input_label {
      display: flex;
      justify-content: right;
      align-items: center;
      height: 100%;
      width: 80px;
      font-size: 17px;
      margin-right: 5px;
    }
    .hy_input {
      flex: 1;
      position: relative;
      input {
        box-sizing: border-box;
        line-height: 40px;
        height: 100%;
        width: 100%;
        color: #60623f;
        border: 1px solid #dcdfe6;
        border-radius: 4px;
        padding: 0 15px;
        font-size: inherit;
        &:focus {
          border-color: #409eff;
          outline: none;
        }
      }
    }
  }
  .hy_input_tip {
    height: 22px;
    color: #f00;
    font-size: 12px;
    margin-top: 5px;
    padding-left: 90px;
  }
  .hy_svg_icon {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
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
      -webkit-transform: translate3d(0, 20%, 0);
      transform: translate3d(0, 20%, 0);
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
      -webkit-transform: translate3d(0, 20%, 0);
      transform: translate3d(0, 20%, 0);
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
  @-webkit-keyframes fadeOutDown {
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
      -webkit-transform: translate3d(0, 20%, 0);
      transform: translate3d(0, 20%, 0);
    }
  }
  @keyframes fadeOutDown {
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
      -webkit-transform: translate3d(0, 20%, 0);
      transform: translate3d(0, 20%, 0);
    }
  }
  .animate__fadeOutDown {
    -webkit-animation-name: fadeOutDown;
    animation-name: fadeOutDown;
  }
`;
