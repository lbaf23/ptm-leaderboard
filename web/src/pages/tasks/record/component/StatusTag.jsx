import {Tag} from "antd";
import {LoadingOutlined} from "@ant-design/icons"

function StatusTag(obj) {
  return (
    <Tag style={{fontSize: '14px', fontWeight: '500'}}>
      {obj.status === 'loading' ?
        <span style={{color: 'gray'}}>{obj.status}&nbsp;<LoadingOutlined /></span> :
        <>
          {obj.status === 'succeed' ?
            <span style={{color: 'green'}}>{obj.status}</span> :
            <span style={{color: 'red'}}>{obj.status}</span>
          }
        </>
      }
    </Tag>
  )
}

export default StatusTag
