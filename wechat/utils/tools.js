const fs = require("fs");
const path = require("path");
const axios = require("axios");

// 测试号信息，用于请求微信公众平台的凭据
const appid = "wxef51ed34ca2cbf3c";
const secret = "8ff5ba423003a7f2a3a30b7aeaa01e02";

const getAccessToken = async () => {
  // access_token缓件文件所在的位置，这里在文件名中加入了appid，这是由于该服务器可以会被多个公众号接入，因此可以会保存多个token，为了防止混乱，则使用作为公众号标识的appid作为文件名
  let tokenCacheFilePath = path.resolve(`./cache/${appid}_token.db`);
  // token过期时间为两小时，这里让他每一小时重复请求一次
  let expire = 3600000;
  // 保存请求到的token
  let accessToken = "";
  // 判断当前文件是否存在，如果存在，则判断当前文件最后的修改时间+过期时间值，是否大于当前时间，如果大于，则表没有过期，如果小于则过期，就需要重新来获取
  if (fs.existsSync(tokenCacheFilePath)) {
    let stat = fs.statSync(tokenCacheFilePath);
    let expireTime = stat.mtime.getTime() + expire;
    let currentTime = Date.now();
    if (currentTime < expireTime) {
      let accessToken = fs.readFileSync(tokenCacheFilePath, "utf-8");
      return accessToken;
    }
  }
  // 文件不存在或过期
  let url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`;
  // 发起get请求
  let ret = await axios.get(url);
  // 保存请求到的token
  accessToken = ret.data.access_token;
  // 写入到缓存中
  fs.writeFileSync(tokenCacheFilePath, accessToken);
  // 返回token
  return accessToken;
};

module.exports = {
  getAccessToken,
};
