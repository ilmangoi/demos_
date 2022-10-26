import { useState, useEffect, useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { getUserListApi } from "@/api/userApi";

// 自定义用户表格数据 hook函数
const useUserTableHook = (pageNum = 1, searchValue = "") => {
  const [data, setData] = useState([]); // 用户数据
  const [total, setTotal] = useState(0); // 总条数
  const [dataLoading, setDataLoading] = useState(true); // 数据加载状态
  const unmount = useRef(false);
  const history = useHistory();
  const location = useLocation();

  const loadData = (page = 1, searchValue = "") => {
    if (!unmount.current) {
      return getUserListApi(page, searchValue).then((ret) => {
        if (ret.code === 0) {
          setData(ret.data.users);
          setTotal(ret.data.total);
          setDataLoading(false);
        }
      });
    }
  };

  // 页面挂载时，加载用户列表数据
  useEffect(() => {
    loadData(pageNum, searchValue);
    return () => {
      // 如果数据发生了变化，组件要重新渲染，那么让它不要再去重复请求数据
      // 这里利用了useRef保存的数据在组件重新渲染时会缓存的特性来，来得知组件是不是第一次加载
      unmount.current = true;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // 通过副作用函数来监听data数据的变化，如果data中的数据变化为0时，则需要重新把page给变化一次
  useEffect(() => {
    if (data.length === 0) {
      let page = pageNum;
      page = page === 1 ? 1 : page - 1;
      loadData(page);
      history.replace(location.pathname + "?page=" + page);
    }
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  // 监听搜索框的值的变化，如果变化了，则需要重新加载数据
  useEffect(() => {
    loadData(pageNum, searchValue);
  }, [searchValue]); // eslint-disable-line react-hooks/exhaustive-deps

  return [data, total, dataLoading, loadData, setData, setDataLoading];
};

export default useUserTableHook;
