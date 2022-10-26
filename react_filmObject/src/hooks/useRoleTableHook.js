import { useState, useEffect, useRef } from "react";
import { getRoleListApi } from "@/api/roleApi";

// 自定义用户表格数据 hook函数
const useUserTableHook = (searchValue = "") => {
  const [data, setData] = useState([]); // 用户数据
  const [dataLoading, setDataLoading] = useState(true); // 数据加载状态
  const unmount = useRef(false);

  const loadData = (searchValue = "") => {
    if (!unmount.current) {
      return getRoleListApi(searchValue).then((ret) => {
        if (ret.code === 0) {
          setData(ret.data.roles);
          setDataLoading(false);
        }
      });
    }
  };

  // 页面挂载时，加载用户列表数据
  useEffect(() => {
    loadData(searchValue);
    return () => {
      // 如果数据发生了变化，组件要重新渲染，那么让它不要再去重复请求数据
      // 这里利用了useRef保存的数据在组件重新渲染时会缓存的特性来，来得知组件是不是第一次加载
      unmount.current = true;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // 监听搜索框的值的变化，如果变化了，则需要重新加载数据
  useEffect(() => {
    loadData(searchValue);
  }, [searchValue]); // eslint-disable-line react-hooks/exhaustive-deps

  return [data, dataLoading, loadData, setData, setDataLoading];
};

export default useUserTableHook;
