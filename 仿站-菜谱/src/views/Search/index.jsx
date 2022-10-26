import React, { Component, createRef } from "react";
import NavHeader from "@/component/navHeader";
import { SearchBar } from "antd-mobile";
import Storage from "@/utils/storage";
import { SearchContainer } from "./style";

const localStorage = new Storage("local");

class Search extends Component {
  searchInputRef = createRef();
  state = {
    histories: localStorage.get("histories", []),
    searchValue: "美食",
    isSearchResult: false, // 表示是否显示搜索结果
  };

  componentDidMount() {
    this.searchInputRef.current.focus();
  }

  // 回车或在手机端按搜索键后完成动作
  onSubmit = (value) => {
    let histories = this.state.histories;
    if (histories.includes(value)) {
      // 如果存在，则找到它的索引位置，进行删除，然后给添加到头部
      histories.splice(histories.indexOf(value), 1);
      histories.unshift(value);
    } else {
      // 添加记录时，要先判断当前是否有相同的，如果有，则不加
      histories.unshift(value);
    }
    // 最多三条记录
    histories = histories.slice(0, 3);
    this.setState(
      {
        histories,
        isSearchResult: true, // 回车后显示搜索结果，不显示历史记录
      },
      () => {
        localStorage.set("histories", histories);
      }
    );
  };
  onChange = (value) => {
    // 清空搜索框时，显示历史记录
    if (value === "") {
      this.setState({ isSearchResult: false });
    }
    this.setState({ searchValue: value });
  };

  render() {
    return (
      <SearchContainer>
        <NavHeader left={true} leftText="返回" onLeft={() => this.props.history.goBack()}>
          搜索页面
        </NavHeader>
        <SearchBar
          ref={this.searchInputRef}
          placeholder="搜索你想要找的菜名"
          onSubmit={this.onSubmit}
          onChange={this.onChange}
        />
        <hr />
        {/* 显示搜索结果的时候，就不显示搜索历史 */}
        {!this.state.isSearchResult ? (
          <ul>
            {this.state.histories.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : null}
      </SearchContainer>
    );
  }
}

export default Search;
