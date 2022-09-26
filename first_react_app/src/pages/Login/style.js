import styled from "styled-components";

export const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;

  .login_form {
    width: 400px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 0 10px #ccc;
    background-color: rgba(30, 30, 30, 0.3);
    .login_form_title {
      user-select: none;
      text-align: center;
      font-size: 28px;
      font-weight: bold;
      margin-bottom: 30px;
    }
  }
  .login_form_btn_group {
    display: flex;
    flex-direction: row;
    justify-content: right;
  }
`;
