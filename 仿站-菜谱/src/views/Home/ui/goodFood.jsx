import React, { Component } from "react";
import { ListView } from "antd-mobile";
import { HomeGoodFoodContainer } from "../style";

class GoodFood extends Component {
  state = {
    // listView它只能通过 ListView.DataSource方法完成数据初始化
    dataSource: new ListView.DataSource({
      // rowHasChanged 回调函数，参数1之前的数据，参数2当前的数据
      // 如果两个值不同，则返回true，添加新数据允许滚动
      rowHasChanged: (row1, row2) => row1 !== row2,
    }),
    // 是否加载
    isLoading: true,
  };

  async componentDidMount() {
    let ret = await this.props.loadData();
    if (ret) {
      this.rData = this.props.data;
      this.setState({
        // 修改数据它只能通过cloneWithRows来完成
        dataSource: this.state.dataSource.cloneWithRows(this.rData),
        isLoading: false,
      });
    }
  }

  // 滚动到底部时触发
  onEndReached = async () => {
    if (this.state.isLoading) return;
    this.setState({ isLoading: true });
    let ret = await this.props.loadData();
    if (ret) {
      this.rData = this.props.data;
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.rData),
        isLoading: false,
      });
    } else {
      this.setState({ isLoading: false });
    }
  };

  render() {
    // 分隔元素
    const separator = (sectionID, rowID) => (
      <div
        key={`${sectionID}-${rowID}`}
        style={{
          backgroundColor: "#F5F5F9",
          height: 8,
          borderTop: "1px solid #ECECED",
          borderBottom: "1px solid #ECECED",
        }}
      />
    );

    // 每行显示的数据
    // rowData 当前行的对象数据
    // sectionID 元素编号 内置计算方式
    // rowID 行索引 0  ...
    const row = (rowData, sectionID, rowID) => {
      return (
        <div key={rowData.id} style={{ padding: "0 15px" }}>
          <div
            style={{
              lineHeight: "50px",
              color: "#888",
              fontSize: 18,
              borderBottom: "1px solid #F6F6F6",
            }}
          >
            {rowData.name}
          </div>
          <div style={{ display: "flex", padding: "15px 0" }}>
            <img style={{ height: "64px", marginRight: "15px" }} src={rowData.img} alt="" />
            <div style={{ lineHeight: 1 }}>
              <div style={{ marginBottom: "8px", fontWeight: "bold" }}>{rowData.burdens}</div>
              <div>
                <span style={{ fontSize: "12px", color: "#FF6E27" }}>点赞：{rowData.all_click}</span>
              </div>
            </div>
          </div>
        </div>
      );
    };

    return (
      <HomeGoodFoodContainer>
        <div className="home-goodfood-title">精品好菜</div>
        <div className="home-goodfood-container">
          <ListView
            // 数据源
            dataSource={this.state.dataSource}
            // 滚动到底部加载显示jsx元素
            renderFooter={() => (
              <div style={{ padding: 30, textAlign: "center" }}>
                {this.state.isLoading ? "Loading..." : "---- 我是有底线的 ----"}
              </div>
            )}
            // 每行要显示的jsx元素
            renderRow={row}
            // 每行之间有分隔线
            renderSeparator={separator}
            // 每次加载的数据量
            pageSize={10}
            style={{
              // 要想滚动，需要添加一个固定高度,原理与better-scroll一样
              height: 300,
            }}
            // 当一个row接近屏幕范围多少像素之内的时候，就开始渲染这一行，渲染可以和加载不同步
            scrollRenderAheadDistance={50}
            // 到达底部时触的事件，在此处理中完成更多数据的加载
            onEndReached={this.onEndReached}
            // 距离底部多少像素时，触发onEndReached事件
            onEndReachedThreshold={50}
          />
        </div>
      </HomeGoodFoodContainer>
    );
  }
}

export default GoodFood;
