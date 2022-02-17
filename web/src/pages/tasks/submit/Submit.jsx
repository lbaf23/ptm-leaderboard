import React, {useEffect, useState} from "react";
import {Button, Card, Cascader, Input, message, Space, Upload} from "antd";
import {UploadOutlined} from "@ant-design/icons"
import CasdoorBackend from "../../../backend/CasdoorBackend";
import {useParams} from "react-router-dom";


// owner=ptm-leaderboard
// user=user1
// application=app-built-in
// tag=avatar
// parent=CropperDiv
// fullFilePath=avatar%2Fptm-leaderboard%2Fuser1.jpeg
// provider=

function Submit(obj) {

  console.log(obj.account)
  const params = useParams();

  const [loading, setLoading] = useState(false)
  const [modelName, setModelName] = useState('')
  const [fileList, setFileList] = useState([])

  useEffect(()=>{
    CasdoorBackend.getUser()
      .then(res=>{console.log(res.data)})
      .catch(err=>{console.log(err)})
  },[])

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
      message.error('invalid file type');
      return
    }
    if (file.size > 1024 * 1024 * 1024) {
      message.error('file size should be smaller than 1GB');
      return
    }
    let filePath = `/ptm-leaderboard/${obj.account.name}/${params.id}/${file.name}`
    CasdoorBackend.uploadFile(obj.account.owner, obj.account.name, "ptm-leaderboard", "models", "admin", filePath, file)
      .then(res=>{
        if (res.data.status === 'ok') {
          console.log(res.data.data)
          setFileList([
            {name: file.name, url: res.data.data}
          ])
        } else {
          message.error(res.data.msg)
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
