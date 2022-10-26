module.exports = (app) => {
  app.get("/api/swiper", (req, res) => {
    res.send({
      code: 0,
      msg: "ok",
      data: [
        {
          id: 1,
          img: "http://img.1314000.cn/swiper-1.jpeg",
          title: "家常豆腐",
        },
        {
          id: 2,
          img: "http://img.1314000.cn/swiper-2.jpeg",
          title: "尖椒肉丝",
        },
        {
          id: 3,
          img: "http://img.1314000.cn/swiper-3.jpeg",
          title: "水煮鱼",
        },
      ],
    });
  });

  app.get("/api/hotcate", (req, res) => {
    let data = [
      {
        img: "https://i3.meishichina.com/attachment/recipe/2015/09/16/c640_201509161442371783820.jpg?x-oss-process=style/c320",
        title: "家常菜",
      },
      {
        img: "https://i3.meishichina.com/attachment/recipe/2018/11/20/2018112015426906295309702111.jpg?x-oss-process=style/c320",
        title: "汤",
      },
      {
        img: "https://i3.meishichina.com/attachment/recipe/2015/01/05/c640_201501051420460072724.jpg?x-oss-process=style/c180",
        title: "川菜",
      },
      {
        img: "https://i3.meishichina.com/attachment/recipe/2018/04/24/20180424152455529414313.jpg?x-oss-process=style/c180",
        title: "粤菜",
      },
      {
        img: "https://i3.meishichina.com/attachment/recipe/2018/04/24/20180424152455503391713.jpg?x-oss-process=style/c180",
        title: "早餐",
      },
      {
        img: "https://i3.meishichina.com/attachment/recipe/2017/07/31/20170731150146877350813.jpg?x-oss-process=style/c320",
        title: "火锅",
      },
      {
        img: "https://i3.meishichina.com/attachment/recipe/2018/04/24/20180424152456373531113.jpg?x-oss-process=style/c180",
        title: "素菜",
      },
      {
        img: "https://i3.meishichina.com/attachment/recipe/2015/01/21/c640_201501211421826764156.jpg?x-oss-process=style/c180",
        title: "粥",
      },
      {
        img: "https://i3.meishichina.com/attachment/recipe/2017/10/11/20171011150770405975413.jpg?x-oss-process=style/c180",
        title: "凉菜",
      },
      {
        img: "https://i3.meishichina.com/attachment/recipe/2018/04/25/20180425152464324522913.jpg?x-oss-process=style/c180",
        title: "烘焙",
      },
      {
        img: "https://i3.meishichina.com/attachment/recipe/2015/07/27/c640_201507271437975925472.jpg?x-oss-process=style/c180",
        title: "饮品",
      },
    ].map((item, index) => ({ ...item, id: index + 1 }));
    res.send({
      code: 0,
      msg: "ok",
      data: data,
    });
  });
  // 精品好菜
  app.get("/api/goodfood", (req, res) => {
    let page = req.query.page || 1;
    let data = Array(10)
      .fill("")
      .map((_, index) => ({
        id: Date.now() + index,
        name: "小炒牛肉-" + page,
        img: "http://img.1314000.cn/listbg.jpg",
        all_click: "961.2万",
        favorites: "6.0万",
        burdens: "青蒜、小米椒、牛里脊、鸡蛋清、香菜梗、葱、姜",
      }));
    // 模拟没有数据了
    if (page > 3) data = [];

    res.send({
      code: 0,
      msg: "ok",
      data,
    });
  });

  app.get("/api/category", (req, res) => {
    res.send({
      code: 0,
      msg: "ok",
      data: {
        热门: [
          "饮品",
          "清淡",
          "夏季菜谱",
          "下饭菜",
          "面食",
          "粥",
          "晚餐",
          "汤",
          "面条",
          "汤羹",
          "烤箱",
          "中餐",
          "西餐",
          "孕妇",
          "蛋糕",
          "东北菜",
          "凉拌",
          "煲汤",
          "布丁",
          "寿司",
          "糕点",
          "糖水",
          "湘菜",
          "甜点",
        ],
        菜式: [
          "家常菜",
          "素菜",
          "凉菜",
          "下饭菜",
          "面食",
          "小吃",
          "粥",
          "汤",
          "煲汤",
          "私房菜",
          "汤羹",
          "糕点",
          "甜点",
          "饮品",
          "创意菜",
          "腌制",
          "自制蘸料",
          "冰品",
          "热菜",
          "农家菜",
          "荤菜",
          "主食",
          "宴客菜",
          "开胃菜",
          "海鲜",
          "下酒菜",
          "懒人食谱",
          "卤菜",
        ],
        菜系: [
          "川菜",
          "东北菜",
          "粤菜",
          "湘菜",
          "西餐",
          "鲁菜",
          "韩式料理",
          "日式料理",
          "淮扬菜",
          "闽菜",
          "浙菜",
          "徽菜",
          "清真",
          "苏菜",
          "东南亚",
          "贵州菜",
          "本帮菜",
          "法国菜",
          "新疆菜",
          "潮州菜",
          "客家菜",
          "意大利菜",
          "泰国菜",
          "英国菜",
          "台湾美食",
          "香港美食",
          "豫菜",
          "印度菜",
          "云南菜",
          "西班牙菜",
          "赣菜",
          "京菜",
          "澳大利亚菜",
          "晋菜",
          "鄂菜",
        ],
        特色: [
          "泡菜",
          "冰淇淋",
          "粽子",
          "沙拉",
          "油条",
          "豆浆",
          "零食",
          "布丁",
          "糖水",
          "自制食材",
          "果汁",
          "果冻",
          "糖果",
          "果茶",
          "酸菜",
          "青团",
          "香锅",
          "饮料",
        ],
        烘焙: [
          "蛋糕",
          "披萨",
          "面包",
          "月饼",
          "吐司",
          "饼干",
          "杯子蛋糕",
          "蛋挞",
          "曲奇",
          "派",
          "泡芙",
          "慕斯",
          "小蛋糕",
          "马卡龙",
          "戚风蛋糕",
          "提拉米苏",
          "海绵蛋糕",
          "奶油蛋糕",
          "挞",
          "翻糖蛋糕",
          "磅蛋糕",
        ],
        主食: ["寿司", "饼", "炒饭", "馒头", "饺子", "炒面"],
        器具: ["烤箱", "炒锅", "微波炉"],
        烹饪方式: ["烘焙", "拌", "火锅", "蒸", "煮", "卤"],
        口味: ["清淡", "咖喱", "麻辣", "香辣"],
        场合: [
          "早餐",
          "晚餐",
          "中餐",
          "下午茶",
          "宵夜",
          "熬夜餐",
          "春季菜谱",
          "早茶",
          "夏季菜谱",
          "秋季菜谱",
          "冬季菜谱",
          "朋友聚餐",
          "二人世界",
          "户外野炊",
          "深夜食堂",
          "单身食谱",
          "早午餐",
        ],
        节日: ["春节", "年夜饭", "中秋节", "元旦"],
      },
    });
  });

  app.get("/api/material", (req, res) => {
    res.send({
      code: 0,
      msg: "ok",
      data: {
        肉类: ["猪肉", "排骨", "猪蹄", "牛肉"],
        "蛋/奶": ["鸡蛋", "鸭蛋", "鹌鹑蛋", "咸鸭蛋", "松花蛋"],
        鱼类: ["草鱼", "鲤鱼", "鲫鱼"],
        水产: ["虾", "虾米", "龙虾", "河虾"],
        蔬菜: ["白菜", "油菜", "芹菜", "菠菜", "茼蒿"],
        豆类: ["绿豆芽", "黄豆芽", "黄豆"],
        果品类: ["苹果", "香蕉"],
        五谷杂粮: ["荞麦面", "麦芽", "小米"],
        药食: ["燕窝", "人参"],
        调味品: ["榨菜", "冬菜"],
        其他: ["巧克力"],
      },
    });
  });
};
