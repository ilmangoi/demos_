import cancelAllRequest, { getHomeSliderApi, getHotCateApi, getGoodFoodApi } from "@/api/homeApi";
import * as types from "@/typings/homeType";

export const getHomeSliderAction = () => async (dispatch, getState) => {
  // 回退时，无需重新再加载资源(使用redux做缓存)
  if (getState().getIn(["home", "sliderData"]).size === 1) {
    const ret = await getHomeSliderApi();
    dispatch({ type: types.HOME_ADD_SWIPER, payload: ret });
  }
};

export const getHotCateAction = () => async (dispatch, getState) => {
  if (getState().getIn(["home", "hotCate"]).size === 0) {
    const ret = await getHotCateApi();
    dispatch({ type: types.HOME_ADD_HOTCATE, payload: ret });
  }
};

// 这个数据不往redux中存储，但是它仍然可以写在actionsCreator中
// 它同样会被mapDispatchToProps映射到props中
export const getGoodFoodAction =
  (page = 1) =>
  async (dispatch) => {
    const ret = await getGoodFoodApi(page);
    return ret;
  };

// 用于取消所有action
export const destroyAllAction = () => async (dispatch) => cancelAllRequest();
