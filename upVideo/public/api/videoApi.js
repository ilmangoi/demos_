import Http from "../utils/http.js";

const http = new Http();

export const uploadChunkFileApi = (chunkData) =>
  http.post("/video/uploadChunkFile", chunkData, {
    headers: {
      "content-type": "multipart/form-data",
    },
  });

export const mergeChunkFileApi = (params) => http.get("/video/mergeChunkFile", { params });

export const isVideoExistApi = async (params) => {
  const res = await http.get("/video/isVideoExist", { params });
  return res.data;
};
