import React from "react";
import Tabs from "./components/Tabs";
import Tab from "./components/Tab";

function App() {
  return (
    <div>
      <Tabs>
        <Tab title="标签一">内容一</Tab>
        <Tab title="标签二">内容二</Tab>
      </Tabs>
    </div>
  );
}

export default App;
