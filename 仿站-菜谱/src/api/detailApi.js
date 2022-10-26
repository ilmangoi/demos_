import Http from "@/utils/http";

const http = new Http();

export const getDetailApi = (id) => http.get("/api/detail/" + id);

export const addDetailFavApi = (id, uid) => http.post("/api/addDetailFav", { id, uid });

export default http.cancelAllRequest.bind(http);
