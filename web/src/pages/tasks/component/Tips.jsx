import {Collapse} from "antd";
import {QuestionCircleOutlined} from "@ant-design/icons";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import 'katex/dist/katex.min.css'


const {Panel} = Collapse

function Tips(props) {
  return (
    <Collapse
      bordered={false}
      expandIcon={({ isActive }) => <QuestionCircleOutlined style={{fontSize: '14px'}} rotate={isActive ? 180 : 0} />}
    >
      <Panel key={0} header="Tips" style={{overflow: 'auto'}}>
        <div>
          <ReactMarkdown
            children={props.md}
            remarkPlugins={[remarkMath, remarkGfm]}
            rehypePlugins={[rehypeKatex, rehypeHighlight]}
          />
        </div>
      </Panel>
    </Collapse>
  )
}

export default Tips
