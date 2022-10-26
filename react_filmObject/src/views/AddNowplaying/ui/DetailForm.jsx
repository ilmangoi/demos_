import React, { useState, useEffect, Fragment } from "react";
import "@wangeditor/editor/dist/css/style.css";
import { Editor, Toolbar } from "@wangeditor/editor-for-react";

const DetailForm = ({ html, setHtml }) => {
  // 编辑器
  const [editor, setEditor] = useState(null);
  // 工具栏配置
  const toolbarConfig = {};
  // 编辑器配置
  const editorConfig = {
    placeholder: "请输入内容...",
  };
  // 及时销毁 editor
  useEffect(() => {
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);

  return (
    <Fragment>
      <div style={{ border: "1px solid #ccc", zIndex: 100 }}>
        <Toolbar
          editor={editor}
          defaultConfig={toolbarConfig}
          mode="default"
          style={{ borderBottom: "1px solid #ccc" }}
        />
        <Editor
          defaultConfig={editorConfig}
          value={html}
          onCreated={setEditor}
          onChange={(editor) => setHtml(editor.getHtml())}
          mode="default"
          style={{ height: "300px", overflowY: "hidden" }}
        />
      </div>
    </Fragment>
  );
};

export default DetailForm;
