import styled from "styled-components";

export const NavHeaderWrapper = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  height: 1.0667rem;
  line-height: 1.0667rem;
  background: #ff6c0c;
  font-size: 0.48rem;
  text-align: center;
  color: #fff;
  display: flex;
  justify-content: space-between;
  z-index: 9999;

  div {
    &:first-child {
      margin-left: 0.2667rem;
    }

    &:last-child {
      margin-right: 0.2667rem;
    }
  }
`;
