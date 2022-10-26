var express = require("express");
var router = express.Router();
var weChatController = require("../controller/weChatController");
var { getAccessToken } = require("../utils/tools");
var sha1 = require("sha1");

// 素材上传功能所用到的类库
const FormData = require("form-data");
const concat = require("concat-stream");
const axios = require("axios");
const fs = require("fs");
const path = require("path");

// 测试号信息，用于请求微信公众平台的凭据
const appid = "wxef51ed34ca2cbf3c";
const secret = "8ff5ba423003a7f2a3a30b7aeaa01e02";

const weChatRouter = ({ first, all }) => {
  // 注意：公众平台中的验证url为：http://xteert.natappfree.cc/weChat
  // 因为这里的路由为：/weChat
  router.get("/weChat", weChatController.weChat);
  router.post("/weChat", weChatController.weChatAction(first));

  // 定义一个可以上传服务器上面的资源到公众平台上，并且要求它返回media_id
  router.get("/material", async (req, res) => {
    let type = req.query.type || "image";
    let accessToken = await getAccessToken();
    // 上传到公众平台中的post请求地址
    let url = `https://api.weixin.qq.com/cgi-bin/media/upload?access_token=${accessToken}&type=${type}`;
    // 使用post提交一个表单的形式来提交图片(平台要求),在node环境中需要下载form-data包，如果是在浏览器环境中，则是直接内置的
    let formData = new FormData();
    // 先通过前端把图片上传该图片到该服务器中的指定地址，然后再把该图片摄像头到公众平台，获取media_id
    formData.append("media", fs.createReadStream(path.resolve("./uploads/face.jpg")));
    formData.pipe(
      concat({ encoding: "buffer" }, async (data) => {
        // data就是连接完成的buffer格式的表单数据，可以直接将它作为请求体，把图片上传到公众平台
        let result = await axios.post(url, data, {
          headers: {
            "content-type": "multipart/form-data",
          },
        });
        // 返回media_id
        res.send(result.data);
      })
    );
  });

  // 上传要群发的图文消息列表，获取media_id
  router.get("/upmpnews", async (req, res) => {
    let accessToken = await getAccessToken();
    var url = `https://api.weixin.qq.com/cgi-bin/media/uploadnews?access_token=${accessToken}`;
    let postData = {
      articles: [
        {
          thumb_media_id: "fHPgPfvNShhRo8Pojs4PT9Zut80ScMReztAW7D7Qe6Yoy4UVfEvIZllj1TTjGV6b",
          author: "张三",
          title: "湖北襄阳教育系统实施“四大工程”打造清廉学校",
          content_source_url: "www.qq.com",
          content:
            "中国教育报-中国教育新闻网讯（通讯员 迟姮璐）“祖国美丽的大地上，廉洁之花处处香，不论我们走到哪里，哪里都有花儿绽放。朵朵廉花心坦荡，声声铿锵更昂扬。”日前，湖北省襄阳市第九中学传来悠扬的歌声，该校原创的清廉歌曲《一路清风》响彻校园。近年来，湖北省襄阳市教育局党组把学校作为传播知识和传承文明的主阵地，进一步营造公平优质、清廉正气的教育生态。",
          digest: "digest",
          show_cover_pic: 1,
          need_open_comment: 1,
          only_fans_can_comment: 1,
        },
        {
          thumb_media_id: "fHPgPfvNShhRo8Pojs4PT9Zut80ScMReztAW7D7Qe6Yoy4UVfEvIZllj1TTjGV6b",
          author: "李四",
          title: "千锋学员：大四仔闯IT，刚毕业拿下13k",
          content_source_url: "www.qq.com",
          content:
            "各位同学大家好，我姓罗，性别男，爱好女，今年23岁，目前单身，曾学习于千锋Java2005班。在来千锋之前，我还是一位迷茫的大四仔，身上没有任何一技之长，恰逢千锋与吾之学校有战略合作，得以明确方向，入千锋学习Java。",
          digest: "digest",
          show_cover_pic: 0,
          need_open_comment: 1,
          only_fans_can_comment: 1,
        },
        {
          thumb_media_id: "fHPgPfvNShhRo8Pojs4PT9Zut80ScMReztAW7D7Qe6Yoy4UVfEvIZllj1TTjGV6b",
          author: "李四",
          title: "千锋学员：大四仔闯IT，刚毕业拿下14k",
          content_source_url: "www.qq.com",
          content:
            "各位同学大家好，我姓罗，性别男，爱好女，今年23岁，目前单身，曾学习于千锋Java2005班。在来千锋之前，我还是一位迷茫的大四仔，身上没有任何一技之长，恰逢千锋与吾之学校有战略合作，得以明确方向，入千锋学习Java。",
          digest: "digest",
          show_cover_pic: 0,
          need_open_comment: 1,
          only_fans_can_comment: 1,
        },
        {
          thumb_media_id: "fHPgPfvNShhRo8Pojs4PT9Zut80ScMReztAW7D7Qe6Yoy4UVfEvIZllj1TTjGV6b",
          author: "李四",
          title: "千锋学员：大四仔闯IT，刚毕业拿下15k",
          content_source_url: "www.qq.com",
          content:
            "各位同学大家好，我姓罗，性别男，爱好女，今年23岁，目前单身，曾学习于千锋Java2005班。在来千锋之前，我还是一位迷茫的大四仔，身上没有任何一技之长，恰逢千锋与吾之学校有战略合作，得以明确方向，入千锋学习Java。",
          digest: "digest",
          show_cover_pic: 0,
          need_open_comment: 1,
          only_fans_can_comment: 1,
        },
        {
          thumb_media_id: "fHPgPfvNShhRo8Pojs4PT9Zut80ScMReztAW7D7Qe6Yoy4UVfEvIZllj1TTjGV6b",
          author: "李四",
          title: "千锋学员：大四仔闯IT，刚毕业拿下16k",
          content_source_url: "www.qq.com",
          content:
            "各位同学大家好，我姓罗，性别男，爱好女，今年23岁，目前单身，曾学习于千锋Java2005班。在来千锋之前，我还是一位迷茫的大四仔，身上没有任何一技之长，恰逢千锋与吾之学校有战略合作，得以明确方向，入千锋学习Java。",
          digest: "digest",
          show_cover_pic: 0,
          need_open_comment: 1,
          only_fans_can_comment: 1,
        },
        {
          thumb_media_id: "fHPgPfvNShhRo8Pojs4PT9Zut80ScMReztAW7D7Qe6Yoy4UVfEvIZllj1TTjGV6b",
          author: "李四",
          title: "千锋学员：大四仔闯IT，刚毕业拿下17k",
          content_source_url: "www.qq.com",
          content:
            "各位同学大家好，我姓罗，性别男，爱好女，今年23岁，目前单身，曾学习于千锋Java2005班。在来千锋之前，我还是一位迷茫的大四仔，身上没有任何一技之长，恰逢千锋与吾之学校有战略合作，得以明确方向，入千锋学习Java。",
          digest: "digest",
          show_cover_pic: 0,
          need_open_comment: 1,
          only_fans_can_comment: 1,
        },
      ],
    };
    let ret = await axios.post(url, postData);
    res.send(ret.data);
  });

  // 通过获取到的media_id群发消息
  router.get("/mpnews", async (req, res) => {
    let accessToken = await getAccessToken();
    let url = `https://api.weixin.qq.com/cgi-bin/message/mass/sendall?access_token=${accessToken}`;
    let postData = {
      filter: {
        is_to_all: true,
      },
      mpnews: {
        media_id: "8uuKz0AHLKFwdJUoh_ThuKFUKOpvQUpC4jtmjHRHqVxlObFn4tOq6LMcukfQRTmO",
      },
      msgtype: "mpnews",
      send_ignore_reprint: 0,
    };
    let ret = await axios.post(url, postData);
    res.send(ret.data);
  });

  router.get("/createMenu", async (req, res) => {
    let accessToken = await getAccessToken();
    let url = `https://api.weixin.qq.com/cgi-bin/menu/create?access_token=${accessToken}`;
    let postData = {
      button: [
        {
          name: "学习资源",
          sub_button: [
            {
              type: "view",
              name: "B站直达",
              url: "http://www.soso.com/",
            },
            {
              type: "view",
              name: "直播预约",
              url: "https://m.baidu.com/",
            },
          ],
        },
        {
          type: "click",
          name: "视频教程",
          key: "click001",
        },
        {
          name: "砸蛋赢奖",
          sub_button: [
            {
              type: "view",
              name: "抽奖入口",
              url: "http://www.soso.com/",
            },
            {
              type: "click",
              name: "咨询小千",
              key: "click002",
            },
          ],
        },
      ],
    };
    let ret = await axios.post(url, postData);
    res.send(ret.data);
  });

  router.get("/delMenu", async (req, res) => {
    let accessToken = await getAccessToken();
    let url = `https://api.weixin.qq.com/cgi-bin/menu/delete?access_token=${accessToken}`;
    let ret = await axios.get(url);
    res.send(ret.data);
  });

  // 生成场景临时二维码
  router.get("/qr", async (req, res) => {
    let accessToken = await getAccessToken();
    // 1.用于换取ticket凭据，用来得到二维码
    var url = `https://api.weixin.qq.com/cgi-bin/qrcode/create?access_token=${accessToken}`;
    // action_name: "QR_SCENE"表示为临时的整型参数值，expire_seconds表示过期时间，action_info表示二维码详细信息
    // scene_id表示场景id，如果有人扫描该ticket生成的二维码并关注公众号，我们可以收到一个msgType为event的消息，他的eventKey就是由这里的scene_id组成的字符串
    const postData = { expire_seconds: 2592000, action_name: "QR_SCENE", action_info: { scene: { scene_id: 37 } } };
    let ret = await axios.post(url, postData);
    const { ticket } = ret.data;
    // 2.获取场景二维码的图片地址
    var url = `https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=${encodeURIComponent(ticket)}`;
    res.send(`<img src="${url}" />`);
  });

  // 生成授权网址
  router.get("/createAuthUrl", async (req, res) => {
    // 授权后重定向的网址，这里必须使用uri编码转义一下特殊字符
    let redirect_uri = encodeURIComponent(req.query.redirect_uri) || "http://www.baidu.com";
    let state = req.query.state || "STATE";
    var url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_base&state=${state}#wechat_redirect`;
    res.send(url);
  });

  //! scope=snsapi_base
  // 授权后重定向到的网址
  router.get("/vote_base", async (req, res) => {
    // 在query中获取到code值
    let { code } = req.query;
    // 通过code值去向公众平台要用户信息(openid和access_token)
    let url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${appid}&secret=${secret}&code=${code}&grant_type=authorization_code`;
    let ret = await axios.get(url);
    res.send(ret.data.openid + "");
  });

  //! scope=snsapi_userinfo
  // 授权后重定向到的网址
  router.get("/vote_userinfo", async (req, res) => {
    // 通过code值去向公众平台要用户信息(openid和access_token)
    let { code } = req.query;
    // 如果没有session数据时才去重新请求用户数据
    if (!req.session.openid) {
      var url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${appid}&secret=${secret}&code=${code}&grant_type=authorization_code`;
      var ret = await axios.get(url);
      let { openid, access_token } = ret.data;

      // 如果授权是userinfo模式，则可以通过请求到的用户access_token来拉取用户信息
      var url = `https://api.weixin.qq.com/sns/userinfo?access_token=${access_token}&openid=${openid}&lang=zh_CN`;
      var ret = await axios.get(url);
      let { nickname, headimgurl } = ret.data; // 解构用户名和头像url

      // 得到的数据，存储在session中，用于当前会话信息的保持，session是用于在服务器端渲染时，保持用户状态的方案
      req.session.openid = openid;
      req.session.nickname = nickname;
      req.session.headimgurl = headimgurl;
    }

    // 参数1：指定views目录下面的文件
    // 参数2：给模板赋的值（通过小胡子请求获取）
    res.render("vote.art", {
      openid: req.session.openid,
      nickname: req.session.nickname,
      headimgurl: req.session.headimgurl,
    });
  });

  // 在服务器端生成jssdk所需要的config配置信息
  router.post("/jsSdkConfig", async (req, res) => {
    // 获取access_token
    let accessToken = await getAccessToken();
    // 获取jsapi_ticket，jsapi_ticket是公众号用于调用微信 JS 接口的临时票据
    // 正常情况下，jsapi_ticket的有效期为7200秒，通过access_token来获取
    var url = `https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${accessToken}&type=jsapi`;
    var ret = await axios.get(url);
    const { ticket } = ret.data;
    // 生成时间戳
    const timestamp = Math.floor(Date.now() / 1000);
    // 要把前端传来的url进行解码，因为前端传来的url是经过编码的
    var url = decodeURIComponent(req.body.url);
    // 生成签名的随机字符串
    const noncestr = "Wm3WZYTPz0wzccnW";
    // 参与签名的字段包括noncestr（随机字符串）, 有效的jsapi_ticket, timestamp（时间戳）, url（当前网页的URL，不包含#及其后面部分）
    // 对所有待签名参数按照字段名的ASCII 码从小到大排序（字典序）后，使用 URL 键值对的格式（即key1=value1&key2=value2…）拼接成字符串string1
    // 这里需要注意的是所有参数名均为小写字符。对string1作sha1加密，字段名和字段值都采用原始值，不进行URL 转义
    const signature = sha1(`jsapi_ticket=${ticket}&noncestr=${noncestr}&timestamp=${timestamp}&url=${url}`);

    res.send({
      appid,
      timestamp,
      noncestr,
      signature,
    });
  });

  // 分享页面
  router.get("/share", async (req, res) => {
    // 网页授权，得到访问者的openid
    let { code } = req.query;
    if (!req.session.openid) {
      var url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${appid}&secret=${secret}&code=${code}&grant_type=authorization_code`;
      var ret = await axios.get(url);
      let { openid } = ret.data;
      req.session.openid = openid; // 存储openid
    }
    res.render("share", {
      openid: req.session.openid,
    });
  });

  router.get("/bargain", async (req, res) => {
    // 网页授权，得到访问者的openid
    let { code } = req.query;
    if (!req.session.openid) {
      var url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${appid}&secret=${secret}&code=${code}&grant_type=authorization_code`;
      var ret = await axios.get(url);
      let { openid } = ret.data;
      req.session.openid = openid; // 存储openid
    }
    res.render("bargain", {
      targetOpenid: req.query.state,
      openid: req.session.openid,
    });
  });

  return router;
};

module.exports = weChatRouter;
