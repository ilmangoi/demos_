// function delay() {
//   return new Promise((_) => {
//     setTimeout(() => {
//       _("");
//     }, 3000);
//   });
// }

module.exports = (app) => {
  app.get("/api/detail/:id", async (req, res) => {
    // await delay()
    res.send({
      code: 0,
      msg: "ok",
      data: {
        id: Date.now(),
        name: "\u5bab\u4fdd\u9e21\u4e01",
        img: "http://img.1314000.cn/listbg.jpg",
        // 当前用户对地此文件是否已经收藏过 0没有，1有
        isfav: 0,
        code: "78599088",
        remark: "",
        all_click: "1442.2\u4e07",
        favorites: "13.0\u4e07",
        info: "\u5bab\u4fdd\u9e21\u4e01\u7684\u7279\u8272\u662f\u8fa3\u4e2d\u6709\u751c\u3001\u751c\u4e2d\u6709\u8fa3\uff1b\u9e21\u8089\u7684\u9c9c\u5ae9\u914d\u5408\u82b1\u751f\u7684\u9999\u8106\uff0c\u5165\u53e3\u9165\u9999\u3001\u7ea2\u800c\u4e0d\u8fa3\u3001\u8fa3\u800c\u4e0d\u731b\u3001\u8089\u8d28\u5ae9\u6ed1\u3002",
        health_str:
          "\u9e21\u86cb\uff1a\u6da6\u71e5\u3001\u589e\u5f3a\u514d\u75ab\u529b\u3001\u62a4\u773c\u660e\u76ee\n\u59dc\uff1a\u964d\u9006\u6b62\u5455\u3001\u5316\u75f0\u6b62\u54b3\u3001\u6563\u5bd2\u89e3\u8868\n\u6599\u9152\uff1a\u6d3b\u8840\u5316\u7600",
        share_img: "http://s3.cdn.xiangha.com/videoImg/201510/1310/561c71166b43e.jpg/MjUwX2FiYWNhaXB1MTcxMF9jXzEtM18w",
        content:
          '<p style="box-sizing: border-box; margin-bottom: 20px; padding: 0px; border: 0px; color: rgb(34, 34, 34); font-family: &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, &quot;Helvetica Neue&quot;, Arial, sans-serif; font-size: 18px; text-align: justify; white-space: normal; background-color: rgb(255, 255, 255); margin-top: 0px !important;">\n    <span style="box-sizing: border-box; margin: 0px; padding: 0px; border: 0px; color: rgb(93, 93, 93); --tt-darkmode-color: #5D5D5D;">1973年11月1日下午，湖北省仙桃市的一个普通家庭里出生了一对双胞胎。</span>\n</p>\n<p style="box-sizing: border-box; margin-top: 20px; margin-bottom: 20px; padding: 0px; border: 0px; color: rgb(34, 34, 34); font-family: &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, &quot;Helvetica Neue&quot;, Arial, sans-serif; font-size: 18px; text-align: justify; white-space: normal; background-color: rgb(255, 255, 255);">\n    <span style="box-sizing: border-box; margin: 0px; padding: 0px; border: 0px; color: rgb(93, 93, 93); --tt-darkmode-color: #5D5D5D;">哥哥五点出生，弟弟五点零五分出生，这时间成了他们命中注定的缘分。</span>\n</p>\n<p style="box-sizing: border-box; margin-top: 20px; margin-bottom: 20px; padding: 0px; border: 0px; color: rgb(34, 34, 34); font-family: &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, &quot;Helvetica Neue&quot;, Arial, sans-serif; font-size: 18px; text-align: justify; white-space: normal; background-color: rgb(255, 255, 255);">\n    <span style="box-sizing: border-box; margin: 0px; padding: 0px; border: 0px; color: rgb(93, 93, 93); --tt-darkmode-color: #5D5D5D;">爷爷李银生希望两个孩子以后能够成为保家卫国的英雄男儿，</span>\n</p>\n<p style="box-sizing: border-box; margin-top: 20px; margin-bottom: 20px; padding: 0px; border: 0px; color: rgb(34, 34, 34); font-family: &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, &quot;Helvetica Neue&quot;, Arial, sans-serif; font-size: 18px; text-align: justify; white-space: normal; background-color: rgb(255, 255, 255);">\n    <span style="box-sizing: border-box; margin: 0px; padding: 0px; border: 0px; color: rgb(93, 93, 93); --tt-darkmode-color: #5D5D5D;">给他们起名李峰华、李卫华。</span>\n</p>\n<p style="box-sizing: border-box; margin-top: 20px; margin-bottom: 20px; padding: 0px; border: 0px; color: rgb(34, 34, 34); font-family: &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, &quot;Helvetica Neue&quot;, Arial, sans-serif; font-size: 18px; text-align: justify; white-space: normal; background-color: rgb(255, 255, 255);">\n    <span style="box-sizing: border-box; margin: 0px; padding: 0px; border: 0px; color: rgb(93, 93, 93); --tt-darkmode-color: #5D5D5D;">他们就是后来的世界体操冠军——李大双、李小双。</span>\n</p>\n<p>\n    <img src="https://p6-tt.byteimg.com/origin/pgc-image/b2f2564a954e4209b66e5f7514a647dc?from=pc" alt="从“全能冠军”到“亿万富商”，李小双经历了什么？" class="syl-page-img"/>\n</p>\n<p class="pgc-img-caption" style="box-sizing: border-box; margin-top: 20px; padding: 0px; border: 0px; margin-bottom: 0px !important;">\n    <br/>\n</p>\n<p style="box-sizing: border-box; margin-top: 20px; margin-bottom: 20px; padding: 0px; border: 0px; color: rgb(34, 34, 34); font-family: &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, &quot;Helvetica Neue&quot;, Arial, sans-serif; font-size: 18px; text-align: justify; white-space: normal; background-color: rgb(255, 255, 255);">\n    <span style="box-sizing: border-box; margin: 0px; padding: 0px; border: 0px; color: rgb(93, 93, 93); --tt-darkmode-color: #5D5D5D;">李家并不富裕，父亲李裕舟是搬运工，母亲邓群姣是招待所的临时工。</span>\n</p>\n<p style="box-sizing: border-box; margin-top: 20px; margin-bottom: 20px; padding: 0px; border: 0px; color: rgb(34, 34, 34); font-family: &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, &quot;Helvetica Neue&quot;, Arial, sans-serif; font-size: 18px; text-align: justify; white-space: normal; background-color: rgb(255, 255, 255);">\n    <span style="box-sizing: border-box; margin: 0px; padding: 0px; border: 0px; color: rgb(93, 93, 93); --tt-darkmode-color: #5D5D5D;">虽然赚得不多，可是工作都特别耗时间，没时间照顾孩子。</span>\n</p>\n<p style="box-sizing: border-box; margin-top: 20px; margin-bottom: 20px; padding: 0px; border: 0px; color: rgb(34, 34, 34); font-family: &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, &quot;Helvetica Neue&quot;, Arial, sans-serif; font-size: 18px; text-align: justify; white-space: normal; background-color: rgb(255, 255, 255);">\n    <span style="box-sizing: border-box; margin: 0px; padding: 0px; border: 0px; color: rgb(93, 93, 93); --tt-darkmode-color: #5D5D5D;">没办法，母亲把兄弟两人送到了公明山外公家。</span>\n</p>\n<p style="box-sizing: border-box; margin-top: 20px; margin-bottom: 20px; padding: 0px; border: 0px; color: rgb(34, 34, 34); font-family: &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, &quot;Helvetica Neue&quot;, Arial, sans-serif; font-size: 18px; text-align: justify; white-space: normal; background-color: rgb(255, 255, 255);">\n    <span style="box-sizing: border-box; margin: 0px; padding: 0px; border: 0px; color: rgb(93, 93, 93); --tt-darkmode-color: #5D5D5D;">到那以后姥爷首先就给李小双改了名字，据说是一番引经据典，改名叫李政末。</span>\n</p>\n<p style="box-sizing: border-box; margin-top: 20px; margin-bottom: 20px; padding: 0px; border: 0px; color: rgb(34, 34, 34); font-family: &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, &quot;Helvetica Neue&quot;, Arial, sans-serif; font-size: 18px; text-align: justify; white-space: normal; background-color: rgb(255, 255, 255);">\n    <span style="box-sizing: border-box; margin: 0px; padding: 0px; border: 0px; color: rgb(93, 93, 93); --tt-darkmode-color: #5D5D5D;">两间茅草屋和农村的泥土，就是他们的乐园。</span>\n</p>\n<p style="box-sizing: border-box; margin-top: 20px; margin-bottom: 20px; padding: 0px; border: 0px; color: rgb(34, 34, 34); font-family: &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, &quot;Helvetica Neue&quot;, Arial, sans-serif; font-size: 18px; text-align: justify; white-space: normal; background-color: rgb(255, 255, 255);">\n    <span style="box-sizing: border-box; margin: 0px; padding: 0px; border: 0px; color: rgb(93, 93, 93); --tt-darkmode-color: #5D5D5D;">这是他们最快乐的时光，但是也养成了野马的性子。</span>\n</p>\n<p>\n    <br/>\n</p>',
      },
    });
  });

  app.post("/api/addDetailFav", (req, res) => {
    res.send({
      code: 0,
      msg: "ok",
      data: {
        favid: 2000,
      },
    });
  });
};
