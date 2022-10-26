import styled from "styled-components";

export const RouterTransition = styled.div`
  .fade-enter,
  .fade-exit-done,
  .fade-appear {
    opacity: 0;
  }

  .fade-enter-active,
  .fade-appear-active {
    opacity: 1;
    transition: opacity 200ms;
  }

  .fade-exit-active {
    opacity: 0;
    transition: opacity 200ms;
  }
`;
