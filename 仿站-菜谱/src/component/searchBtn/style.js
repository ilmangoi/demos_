import styled from "styled-components";

export const SearchBtnContainer = styled.div`
  width: 8rem;
  height: 1.2267rem;
  border: 0.0267rem solid ${(props) => props.borderColor};
  margin: 0.4rem auto;
  border-radius: 5px;
  box-shadow: 0.0267rem 0.0267rem 0.1333rem #ccc;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 0.5333rem;
    height: 0.5333rem;
  }

  span {
    font-size: 16px;
    color: #555;
    margin-left: 0.2667rem;
  }
`;
