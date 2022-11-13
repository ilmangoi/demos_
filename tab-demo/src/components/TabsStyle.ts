import styled from "styled-components";

export const TabsContainer = styled.div`
  width: 600px;
  height: 400px;
  border: 1px solid black;
  padding: 8px;

  .title {
    display: flex;
    width: 100%;
    height: 22px;
    border-bottom: 1px solid black;

    div {
      box-sizing: border-box;
      height: 100%;
      width: 60px;
      border: 1px solid black;
      border-bottom: none;
      margin: 0 3px;
      padding: 1px;
      font-size: 13px;
      text-align: center;
    }
  }

  .activeTab {
    color: red;
  }
`;
