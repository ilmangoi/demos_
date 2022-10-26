import styled from "styled-components";

export const HomeSliderItem = styled.div`
  position: relative;
  width: 100%;
  .title {
    position: absolute;
    bottom: 0.2667rem;
    left: 0.5333rem;
    color: white;
    font-weight: bold;
    font-size: 0.5333rem;
  }
  .index {
    position: absolute;
    bottom: 0.2667rem;
    right: 0.5333rem;
    color: white;
    font-weight: bold;
    font-size: 0.5333rem;
  }
  img {
    width: 100%;
    vertical-align: top;
  }
  a {
    display: inline-block;
    width: 100%;
    height: 176px;
  }
`;

export const HomeHotCateContainer = styled.div`
  background: white;
  .title {
    font-size: 16px;
    padding: 0.4rem;
    color: #949494;
  }
  .am-grid-item-content div {
    font-size: 16px;
  }
`;

export const HomeGoodFoodContainer = styled.div`
  .home-goodfood-title {
    padding: 0.4rem;
    color: #949494;
    font-size: 0.5333rem;
    background: #fff;
    border-bottom: 0.0267rem solid #ccc;
  }

  .home-goodfood-container {
    font-size: 16px;
    box-sizing: border-box;
    background: #fff;
    margin-top: 0.2667rem;
    padding-left: 0.1rem;
    height: 8rem;
    overflow: hidden;
  }
`;
