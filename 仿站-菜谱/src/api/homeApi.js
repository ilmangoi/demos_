import Http from "@/utils/http";

const http = new Http();

/**
 * 获取菜谱首页幻灯片数量
 * @returns Promise<{id,img,title}>
 */
export const getHomeSliderApi = async () => {
  let ret = await http.get("/api/swiper");
  // 由于没有返回to,所以这里手动进行数据清洗
  ret = ret.map((item) => ({
    ...item,
    to: `/detail/${item.id}`,
  }));
  return ret;
};

// 获取热门分类
export const getHotCateApi = () => http.get("/api/hotcate");

// 获取精品好菜
export const getGoodFoodApi = (page = 1) => http.get("/api/goodfood?page=" + page);

export default http.cancelAllRequest.bind(http);
