//! 控制器，路由匹配成功后，用他来处理业务逻辑
const sha1 = require("sha1");
const xml2js = require("xml2js");
const sendMethod = require("../msgData");
const moment = require("moment");
const token = "ilmango";

const controller = {
  weChat(req, res) {
    const { signature, timestamp, nonce, echostr } = req.query;
    // 字典排序,拼成一个字符串，进行sha1加密
    let cryptStr = sha1([token, timestamp, nonce].sort().join(""));
    // 用加密后的字符串和传过来的字符串进行比对，如果对，则返回echoStr表示对接成功
    if (cryptStr === signature) {
      res.send(echostr);
    } else {
      res.send(""); // 验证失败，则不予理会
    }
  },
  weChatAction(first) {
    return (req, res) => {
      let postXmlData = [];
      // post传过来的数据都是数据流，不能直接通过req.body获取
      req.on("data", (chunk) => postXmlData.push(chunk));
      req.on("end", async () => {
        // 得到公众平台post发送过来的所有的xml内容 string
        let xmlStr = Buffer.concat(postXmlData).toString("utf-8");
        // 将xml转换成js对象以方便更好的去操作
        const xmlParser = new xml2js.Parser();
        // 解析为xml的json对象
        let { xml } = await xmlParser.parseStringPromise(xmlStr);
        // 公众平台的id号
        const toUserName = xml.ToUserName[0];
        // 发送给公众平台的微信在此平台的唯一id值
        const fromUserName = xml.FromUserName[0];
        // 消息类型 text image voice video music news
        let msgType = xml.MsgType[0];
        // 发送过来的消息内容
        let content = xml.Content ? xml.Content[0] : "";
        // 根据用户输入的数据来决定要返回什么内容，注意这里先判断用户发送的是什么内容，这里只有用户发送文件时才会进行响应
        if ("text" === msgType) {
          if (content.includes("天气")) {
            // 接收类型为text，返回类型也为text，不需要修改
            content = "有大风，会很冷，多穿衣服，少说话，多面试"; // 要给用户返回的内容
          }
          if (content === "图文") {
            msgType = "news"; // 要给用户返回的数据类型
            content = {
              // 要给用户返回的内容
              title: "养了9个月卖了4000块@@",
              description:
                "当孩子做了正确的事或者取得了好的成绩时，无论是家长还是老师，总会想着给孩子一些奖励，什么样的奖励才是最好的呢",
              picurl:
                "https://p3-sign.toutiaoimg.com/tos-cn-i-tjoges91tu/TKfXAxcC7D0RkG~noop.image?_iz=58558&from=article.pc_detail&x-expires=1666926824&x-signature=JHtSD3qlR1Nj9AVM678%2FCVftEVI%3D",
              url: "https://www.toutiao.com/article/7156030679283663395/?log_from=861dd6a071e1a_1666322030432",
            };
          }
          if (content === "图片") {
            msgType = "image"; // 要给用户返回的数据类型
            // 要给用户返回的内容, 通过素材管理中的接口上传多媒体文件，得到的id。
            content = "fHPgPfvNShhRo8Pojs4PT9Zut80ScMReztAW7D7Qe6Yoy4UVfEvIZllj1TTjGV6b";
          }
          if (content === "视频") {
            msgType = "video"; // 要给用户返回的数据类型
            content = {
              // 要给用户返回的内容
              mediaId: "gDE3n-X71Pi1i7aNzNcsO85GYQ_1RyYL9OzroAzqEl6b1mHeSpdFQzCYz8265GJz",
              title: "你好视频",
              description: "这就是一个视频",
            };
          }
          const sendXml = sendMethod(msgType, fromUserName, toUserName, content); // 把数据嵌入xml模板
          res.send(sendXml);
        } else if ("event" === msgType) {
          const event = xml.Event[0]; // 获取事件标识
          if ("subscribe" === event) {
            // 当用户通过场景二维码关注公众号时，会在用户关注公众号后，推送一条带参数的二维码扫描事件给开发者
            // 如果是直接通过搜索关注的，则EventKey没有值，如果是通过扫描二维码关注的，则EventKey有值
            // 值为qrscene_为前缀，后面为二维码的参数值(action_info)，示例：'qrscene_37'
            var qrSceneKey = xml.EventKey[0];
            // 把scene_id截取出来，并转换为数字，如果没有则为null
            let pid = qrSceneKey === "" ? null : Number(qrSceneKey.split("_")[1]);
            // 保存关注时间，或再次关注的时间
            var time = moment().format("YYYY-MM-DD hh:mm:ss");
            // 根据fromUserName(openid: 用户的唯一标识)查询数据库中该用户的信息
            var sql = `select openid,active from wx_users where openid='${fromUserName}'`;
            // 这里使用了first，如果没有查询到数据则会返回undefined，如果查到则会返回一个对象
            var ret = await first(sql);
            // 如果为undefined则表示为一个新用户，直接插入数据库，如果不为undefined则表示为老用户(取消关注了)，更新数据库中的数据(更新mtime：再次关注的时间)
            if (!ret) {
              // 如果是一个新用户，并且没有pid(表示是直接通过搜索关注的)，则直接插入数据库
              // 而如果是一个新用户，并且有pid(表示是通过扫描二维码关注的)，这样的话就需要根据pid查询数据库中的用户信息(该用户是谁邀请的)
              // 然后把该用户的id作为一级推荐人，并把该用户的一级推荐人作为二级推荐人，二级推荐人作为三级推荐人，然后插入数据库(最高三级推荐人，再多就违法了)
              // 在真实业务中，会根据分销人员的等级来分配好处，比如一级推荐人可以获得10%的佣金，二级推荐人可以获得5%的佣金，三级推荐人可以获得2%的佣金
              // 如果某个用户没有推荐人，则它可以获取所有的佣金
              if (!null) {
                var sql = `insert into wx_users (openid,ctime,mtime) values ('${openid}','${time}','${time}')`;
                await first(sql);
              } else {
                var sql = `select openid,level1,level2 from wx_users where id=${pid}`;
                var userinfo = await first(sql);
                var sql = `insert into wx_users (openid,ctime,mtime,level1,level2,level3) values ('${openid}','${time}','${time}','${userinfo.openid}','${userinfo.l1}','${userinfo.l2}')`;
                await first(sql);
              }
            } else {
              if (ret.active === "0") {
                var sql = `update wx_users set active='1',mtime='${time}'`;
                await first(sql);
              }
            }
            res.send(
              sendMethod(
                "text",
                fromUserName,
                toUserName,
                "😘😘😘欢迎关注此公众平台,您将得到所有的可用的前端知识!😘😘😘\n回复\n1:实时新闻\n2:娱乐新闻\n3:科技与狠活"
              )
            );
          } else if ("unsubscribe" === event) {
            // 根据openid把当前用户在数据表中修改一下状态 active='0'
            var sql = `update wx_users set active='0' where openid='${openid}'`;
            var ret = await first(sql);
            res.send("");
          } else if ("CLICK" === event) {
            const eventKey = xml.EventKey[0];
            if ("click001" === eventKey) {
              content = "视频教程";
            } else {
              content = "咨询小千";
            }
            res.send(sendMethod("text", fromUserName, toUserName, content));
          } else {
            res.send("");
          }
        }
      });
    };
  },
};

module.exports = controller;
