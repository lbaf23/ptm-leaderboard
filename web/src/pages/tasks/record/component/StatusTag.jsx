import {Tag} from "antd";
import {LoadingOutlined, EllipsisOutlined} from "@ant-design/icons"

function StatusTag(obj) {
  return (
    <Tag style={{fontSize: '14px', fontWeight: '500'}}>
      {obj.status === 'running' ?
        <span style={{color: 'gray'}}>{obj.status}&nbsp;<LoadingOutlined /></span> : null
      }
      {
        obj.status === 'pending' ?
          <span style={{color: 'gray'}}>{obj.status}&nbsp;...</span> : null
      }
      {
        obj.status === 'succeed' ?
          <span style={{color: 'green'}}>{obj.status}</span> : null
      }
      {
        obj.status === 'failed' ?
          <span style={{color: 'red'}}>{obj.status}</span> : null
      }
    </Tag>
  )
}

export default StatusTag
