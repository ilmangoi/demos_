const methods = {
  // 文本消息模板
  createTextXml(fromUserName, toUserName, content) {
    const createTime = Math.floor(Date.now() / 1000);
    // 回复给公众平台的xml，所以你原来接受的from和to角色要互换一下
    return `<xml>
      <ToUserName><![CDATA[${fromUserName}]]></ToUserName>
      <FromUserName><![CDATA[${toUserName}]]></FromUserName>
      <CreateTime>${createTime}</CreateTime>
      <MsgType><![CDATA[text]]></MsgType>
      <Content><![CDATA[${content}]]></Content>
    </xml>`;
  },

  // 图文消息，只能发送1条
  createNewsXml(fromUserName, toUserName, content) {
    const createTime = Math.floor(Date.now() / 1000);
    return `<xml>
      <ToUserName><![CDATA[${fromUserName}]]></ToUserName>
      <FromUserName><![CDATA[${toUserName}]]></FromUserName>
      <CreateTime>${createTime}</CreateTime>
      <MsgType><![CDATA[news]]></MsgType>
      <ArticleCount>1</ArticleCount>
      <Articles>
        <item>
          <Title><![CDATA[${content.title}]]></Title>
          <Description><![CDATA[${content.description}]]></Description>
          <PicUrl><![CDATA[${content.picurl}]]></PicUrl>
          <Url><![CDATA[${content.url}]]></Url>
        </item>
      </Articles>
    </xml>`;
  },
  // 图片消息模板
  createImageXml(fromUserName, toUserName, mediaId) {
    const createTime = Math.floor(Date.now() / 1000);
    return `<xml>
      <ToUserName><![CDATA[${fromUserName}]]></ToUserName>
      <FromUserName><![CDATA[${toUserName}]]></FromUserName>
      <CreateTime>${createTime}</CreateTime>
      <MsgType><![CDATA[image]]></MsgType>
      <Image>
        <MediaId><![CDATA[${mediaId}]]></MediaId>
      </Image>
    </xml>
    `;
  },
  // 视频消息模板
  createVideoXml(fromUserName, toUserName, content) {
    const createTime = Math.floor(Date.now() / 1000);
    return `<xml>
      <ToUserName><![CDATA[${fromUserName}]]></ToUserName>
      <FromUserName><![CDATA[${toUserName}]]></FromUserName>
      <CreateTime>${createTime}</CreateTime>
      <MsgType><![CDATA[video]]></MsgType>
      <Video>
      <MediaId><![CDATA[${content.mediaId}]]></MediaId>
      <Title><![CDATA[${content.title}]]></Title>
      <Description><![CDATA[${content.description}]]></Description>
    </Video>
    </xml>
    `;
  },
};

module.exports = function (name, fromUserName, toUserName, content) {
  name = name[0].toLocaleUpperCase() + name.slice(1);
  return methods[`create${name}Xml`](fromUserName, toUserName, content);
};
