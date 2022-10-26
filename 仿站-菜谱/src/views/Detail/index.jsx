import React, { Component } from "react";
import NavHeader from "@/component/navHeader";
import cancelAllRequest, { getDetailApi, addDetailFavApi } from "@/api/detailApi";
import SearchBtn from "@/component/searchBtn";
import { Toast } from "antd-mobile";
import { connect } from "react-redux";
import { COMMON_JUMP_URL } from "@/typings/commonType";
import withSpiderDoc from "@/hoc/withSpiderDoc";
import { DetailContainer } from "./style";

@withSpiderDoc // 高阶组件，用于爬取页面数据
@connect((state) => ({ token: state.getIn(["user", "token"]), uid: state.getIn(["user", "uid"]) }), {
  jumpUrl: (url) => ({ type: COMMON_JUMP_URL, payload: url }),
})
class Detail extends Component {
  state = {
    info: null,
  };

  async componentDidMount() {
    // 请求当前id的信息
    let ret = await getDetailApi(this.props.match.params.id);
    this.setState({ info: ret });
  }

  componentWillUnmount() {
    cancelAllRequest();
  }

  addFav = async () => {
    // 点击收藏
    // 1.判断当前用户是否已经登录，如果没有登录，则跳转到登录
    // 2.如果他登录了，则发送请求，后端会进行判断，当前用户是否已经收藏过，如果收藏过，则不处理
    // 先判断当前用户通过接口返回过来的数据中，是否有已收藏的标识，0表示未收藏，1表示已收藏
    if (this.state.info.isfav === 0) {
      if (!this.props.token) {
        this.props.jumpUrl("/detail/" + this.state.info.id);
        this.props.history.replace("/login");
        return;
      }
      await addDetailFavApi(this.state.info.id, this.props.uid);
      Toast.info("收藏成功", 2, () => {
        // 改变按钮中的文字为已收藏
        this.setState((state) => ({ info: { ...state.info, isfav: 1 } }));
      });
      return;
    }
    Toast.info("已收藏");
  };

  render() {
    let { info } = this.state;
    return (
      <DetailContainer>
        <NavHeader
          onLeft={() => {
            this.props.history.goBack();
          }}
          onRight={() => {
            this.props.history.push("/search");
          }}
        >
          {info && info.name}
        </NavHeader>
        {info ? (
          <>
            <img className="logo" src={info.img} alt="" />
            <SearchBtn onClick={() => this.addFav()} icon={false} title={info.isfav === 0 ? "点击收藏" : "已收藏"} />
            <div className="content" dangerouslySetInnerHTML={{ __html: info.content }}></div>
          </>
        ) : (
          <div>加载中...</div>
        )}
      </DetailContainer>
    );
  }
}

export default Detail;
