import React, { Component } from "react";
import connect from "./connect";
import NavHeader from "@/component/navHeader";
import SearchBtn from "@/component/searchBtn";
import Slider from "./ui/Slider";
import HotCate from "./ui/hotCate";
import GoodFood from "./ui/goodFood";
import { Toast } from "antd-mobile";

@connect
class Home extends Component {
  state = {
    page: 1,
    goodFood: [],
  };

  componentDidMount() {
    // all解决后会返回一个数组，数组中中的内容就是每个promise的解决值
    // 只要其中一个promise失败了，那么all就会失败
    Promise.all([this.props.getHomeSliderAction(), this.props.getHotCateAction()]).catch(() => {
      Toast.fail("请求数据异常");
    });
  }

  componentWillUnmount() {
    this.props.destroyAllAction();
  }

  loadData = async () => {
    let goodfood = await this.props.getGoodFoodAction(this.state.page);
    if (goodfood.length === 0) {
      Toast.info("没有更多的新数据了", 2, null, false);
      return false;
    }
    this.setState((state) => ({ goodFood: [...state.goodFood, ...goodfood], page: state.page + 1 }));
    return true;
  };

  render() {
    return (
      <div>
        <NavHeader left={false} right={false}>
          菜谱首页
        </NavHeader>
        <Slider data={this.props.sliderData} />
        <SearchBtn onClick={() => this.props.history.push("/search")} />
        {/* 把history对象传给hotCate组件，方便它去进行路由跳转 */}
        <HotCate data={this.props.hotCate} history={this.props.history} />
        {/* 数据加载完成后才开始渲染组件，因为组件中需要数据进行初始化 */}
        <GoodFood data={this.state.goodFood} loadData={this.loadData} />
      </div>
    );
  }
}

export default Home;
