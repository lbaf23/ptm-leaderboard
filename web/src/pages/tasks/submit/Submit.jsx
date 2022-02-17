import React, {useState} from "react";
import {Button, Card, Input, message, Space, Upload} from "antd";
import {UploadOutlined} from "@ant-design/icons"
import CasdoorBackend from "../../../backend/CasdoorBackend";
import {useParams} from "react-router-dom";


function Submit(obj) {
  console.log(obj.account)

  const params = useParams();

  const [loading, setLoading] = useState(false)
  const [modelName, setModelName] = useState('')
  const [fileList, setFileList] = useState([])

  const preCheck = () => {
    if (modelName === '') {
      message.error("Model Name is empty")
      return false
    }
    return true
  }
  const handleSubmit = () => {
    if (preCheck()){
      setLoading(true)
    }
  }

  const inputModelName = (e) => {
    setModelName(e.target.value)
  }

  const removeFile = () => {
    // TODO delete file
    setFileList([])
  }

  const onUploadFile = (f) =>{
    const file = f.file
    const index = file.name.lastIndexOf('.');
    if (index === -1) {
      message.error('不能识别文件类型');
      return
    }
    if (file.size > 1024 * 1024 * 1024) {
      message.error('文件不能大于1GB');
      return
    }
    let filePath = `/ptm-leaderboard/${1}/${params.id}/${file.name}`
    CasdoorBackend.uploadFile("admin", "ptm-leaderboard", "admin", filePath, file)
      .then(res=>{
        if (res.data.status === 'ok') {
          console(filePath, file.name, res.data.data)
        }
      })
      .catch(e=>{console.log(e)})
  }
  const props = {
    name: 'file',
    multiple: false,
    customRequest: onUploadFile,
    fileList: fileList,
    onRemove: removeFile,
  };

  return (
    <Card
      bordered={false}
      hoverable
    >
      <p style={{fontSize: '20px', textAlign: 'center', fontWeight: 'bold'}}>Submit</p>
      <div>
        <Space direction="vertical" size="middle" style={{width: '100%'}}>
          <Input addonBefore="Model Name" onChange={inputModelName} value={modelName}/>
          <Upload {...props}>
            <Button icon={<UploadOutlined/>}>Upload model file</Button>
          </Upload>
          <Button loading={loading} onClick={handleSubmit}>
            submit
          </Button>
        </Space>
      </div>
    </Card>
  )
}

export default Submit;
