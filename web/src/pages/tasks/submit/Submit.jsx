import React from "react";
import {Button, Card, Input, Space, Upload} from "antd";
import { UploadOutlined } from "@ant-design/icons"

const props = {
  name: 'file',
  onChange() {
  },
};

function Submit() {
  return (
    <Card
      bordered={false}
      hoverable
    >
      <p style={{fontSize: '20px', textAlign: 'center', fontWeight: 'bold'}}>Submit</p>
      <div>
        <Space direction="vertical" size="middle" style={{width: '100%'}}>
          <Input addonBefore="model name"/>
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>Upload ZIP file</Button>
          </Upload>
          <Button>
            submit
          </Button>
        </Space>
      </div>
    </Card>
  )
}

export default Submit;
