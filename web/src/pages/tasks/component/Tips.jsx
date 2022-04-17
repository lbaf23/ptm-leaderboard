import {Collapse} from "antd";
import {QuestionCircleOutlined} from "@ant-design/icons";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkGfm from 'remark-gfm'

import React from "react";

const {Panel} = Collapse

function Tips(props) {
  return (
    <Collapse
      bordered={false}
      expandIcon={({ isActive }) => <QuestionCircleOutlined style={{fontSize: '14px'}} rotate={isActive ? 180 : 0} />}
    >
      <Panel key={0} header="Tips" >
        <ReactMarkdown
          children={props.md}
          remarkPlugins={[remarkMath, remarkGfm]}
          rehypePlugins={[rehypeKatex]}
        />
      </Panel>
    </Collapse>
  )
}

export default Tips
