import styled from "styled-components";

export const CategoryNavBar = styled.div`
  font-size: 16px;
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  height: 1.1733rem;
  background: #ee742f;
  display: flex;
  align-items: center;
  justify-content: center;
  ul {
    width: 3.7333rem;
    height: 0.8rem;
    position: relative;
    display: flex;
    border: 0.0267rem solid #fff;
    z-index: 0;
    border-radius: 0.4rem;
    li {
      flex: 1;
      width: 50%;
      line-height: 0.8rem;
      text-align: center;
      color: #fff;
      &.slider {
        position: absolute;
        width: 50%;
        height: 0.8rem;
        background: #fff;
        z-index: -1;
        border-radius: 0.4rem;
        transform: translateX(0);
        transition: all 0.3s;
      }
      &.right {
        transform: translateX(100%);
      }
      &.active {
        color: #ee742f;
        transition: all 0.3s;
      }
    }
  }
`;
export const CategoryMainContainer = styled.div`
  display: flex;
  height: calc(100vh - 4.88rem);
  overflow: hidden;
  font-size: 16px;
  .slider {
    width: 2rem;
    overflow: hidden;
    ul {
      overflow-y: auto;
      height: 100%;
      li {
        height: 1.333rem;
        line-height: 1.333rem;
        text-align: center;
        background: #f3f3f3;
        &.active {
          background: #fff;
          span {
            display: inline-block;
            height: 100%;
            border-bottom: 0.0267rem solid #ee742f;
          }
        }
      }
    }
  }
  .main {
    flex: 1;
    background: #fff;
    overflow: hidden;
    ul {
      overflow-y: auto;
      height: 100%;
      display: flex;
      flex-wrap: wrap;
      align-content: flex-start;
      li {
        width: 33.3333%;
        text-align: center;
        height: 1.3333rem;
        line-height: 1.3333rem;
        color: #666;
      }
    }
  }
`;
