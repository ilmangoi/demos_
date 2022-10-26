import styled from "styled-components";

export const PageFooterWrapper = styled.div`
  width: 100%;
  font-size: 16px;
  position: sticky;
  bottom: 0;
  left: 0;
  background: #fff;
  height: 1.6rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top: 0.0267rem solid #ccc;

  a {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #666;
    text-decoration: none;

    img {
      width: 0.5867rem;
      height: 0.5867rem;
    }

    &.active {
      color: #000;
    }
  }
`;
