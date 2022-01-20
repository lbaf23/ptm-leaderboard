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
    <div>
      <p style={{fontSize: '20px', textAlign: 'center', fontWeight: 'bold'}}>Submit</p>
      <Card
        bordered={false}
        hoverable
        style={{
          textAlign: 'center',
        }}
      >
        <Space direction="vertical" size="middle" style={{width: '100%'}}>
          <Input addonBefore="model name"/>
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>Upload ZIP file</Button>
          </Upload>
          <Button>
            submit
          </Button>
        </Space>
      </Card>
    </div>
  )
}

export default Submit;
