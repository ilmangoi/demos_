import React, { Component } from "react";
import NavTab from "./ui/navTab";
import cancelAllRequest, { getCategoryListApi, getMaterialListApi } from "@/api/categoryApi";
import Main from "./ui/main";
import SearchBtn from "@/component/searchBtn";

class Category extends Component {
  state = {
    navTabCurrentIndex: 0, // 0 分类，1食材
    currentIndexs: [0, 0], // 分别保存2个tab的当前索引，0 分类，1食材（用于在切换后，保持当前tab的状态）
    cateData: null, // 数据，分类和食材的数据
    menu: [], // 分类和食材的菜单
    mainData: [], // 分类和食材的主体数据
  };

  setNavTabCurrentIndex = (navTabCurrentIndex) => {
    this.setState({ navTabCurrentIndex }, () => {
      this.loadData(this.state.currentIndexs[this.state.navTabCurrentIndex]);
    });
  };

  componentDidMount() {
    this.loadData(this.state.currentIndexs[this.state.navTabCurrentIndex]);
  }

  componentWillUnmount() {
    cancelAllRequest();
  }

  loadData = async (index) => {
    index = index ?? 0;
    let ret = null;
    if (this.state.navTabCurrentIndex === 0) {
      ret = await getCategoryListApi();
    } else {
      ret = await getMaterialListApi();
    }
    this.setState({
      cateData: ret,
      menu: Object.keys(ret),
      mainData: Object.values(ret)[index],
    });
  };

  setMainData = (key) => {
    this.setState({
      mainData: this.state.cateData[key],
    });
  };

  setCurrentIndex = (currentIndex, currentKey) => {
    this.setState(
      (state) => {
        // 记录当前点击的食品或分类项的index
        const currentIndexs = state.currentIndexs;
        currentIndexs[state.navTabCurrentIndex] = currentIndex;
        return { currentIndexs };
      },
      () => this.setMainData(currentKey)
    );
  };

  render() {
    let { navTabCurrentIndex, cateData, mainData, menu, currentIndexs } = this.state;
    return (
      <div>
        <NavTab currentIndex={navTabCurrentIndex} setNavTabCurrentIndex={this.setNavTabCurrentIndex} />
        <SearchBtn onClick={() => console.log("search")} />
        {/* 
          这里的组件切换可以直接通过加上一个唯一的Key来实现，不需要通过传值来控制
          因为如果传入不同的Key，React会认为是不同的组件，会重新渲染，因此只需要把
          网络请求获得到的cateData传递给Main组件，让它重新渲染即可
          但是这样就无法在组件中保存currentIndexs状态了，当前可以把它存在redux中
        */}
        {/* {cateData != null && <Main key={'cate_' + Date.now()} data={cateData} />} */}
        {cateData !== null && (
          <Main
            mainData={mainData}
            menu={menu}
            setCurrentIndex={this.setCurrentIndex}
            currTabIndex={currentIndexs[navTabCurrentIndex]}
          />
        )}
      </div>
    );
  }
}

export default Category;
