import React, { useState, useEffect, useRef, cloneElement, useMemo } from "react";
import type { MouseEvent } from "react";
import { TabsContainer } from "./TabsStyle";
import Tab, { IExpose } from "./Tab";

type IProps = {
  children: React.ReactElement[];
};

function Tabs(props: IProps) {
  const [activeTab, setActiveTab] = useState(0);
  const curTabRef = useRef<IExpose>();
  const prevTabRef = useRef<IExpose>();

  let [tabs, setTabs] = useState(() => {
    return props.children.map((tab, index) => {
      return cloneElement(tab, {
        ref: curTabRef,
      });
    });
  });

  const titles = useMemo(() => {
    return tabs.map((tab: any) => tab.props.title);
  }, [tabs]);

  const switchTabHandler = (evt: MouseEvent, index: number) => {
    setActiveTab(index);
  };

  const addTabHandler = (e: MouseEvent) => {
    setTabs((tabs: any) => {
      return [
        ...tabs,
        React.createElement(Tab, { ref: curTabRef, title: Date.now().toString(16).slice(-3), children: "新内容" }),
      ];
    });
  };

  useEffect(() => {
    curTabRef.current!.activated();
    if (prevTabRef.current) prevTabRef.current.deactivated();
    prevTabRef.current = curTabRef.current;
  }, [activeTab]);

  return (
    <TabsContainer>
      <div className="title">
        {titles.map((title: string, index: number) => (
          <div
            key={title}
            onClick={(evt) => switchTabHandler(evt, index)}
            className={activeTab === index ? "activeTab" : ""}
          >
            {title}
          </div>
        ))}
        <div onClick={addTabHandler}>+</div>
      </div>
      <div className="content">{tabs[activeTab]}</div>
    </TabsContainer>
  );
}

export default Tabs;
