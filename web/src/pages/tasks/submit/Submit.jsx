import React, {useEffect, useState} from "react";
import {Button, Card, Cascader, Input, message, Space, Upload} from "antd";
import {UploadOutlined, InboxOutlined} from "@ant-design/icons"
import CasdoorBackend from "../../../backend/CasdoorBackend";
import {useParams} from "react-router-dom";
import SubmitBackend from "../../../backend/SubmitBackend";


const { Dragger } = Upload;

function Submit(obj) {
  const params = useParams();

  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [modelName, setModelName] = useState('')
  const [fileList, setFileList] = useState([])

  useEffect(()=>{

  },[])

  const preCheck = () => {
    if (modelName === '') {
      message.error("Model Name is empty")
      return false
    }
    if (fileList.length === 0) {
      message.error("Upload zip file")
      return false
    }
    return true
  }
  const handleSubmit = () => {
    if (preCheck()){
      setLoading(true)
      SubmitBackend.submitModel(modelName, fileList[0].url, params.id)
        .then(res=>{
          setLoading(false)
          if(res.data.code === 200) {
            message.success(res.data.message)
            setFileList([])
            setModelName('')
          } else {
            message.error(res.data.message)
          }
        })
        .catch(err=>{})
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
    setUploading(true)
    const file = f.file

    setFileList([{name: file.name, status: 'uploading'}])

    const index = file.name.lastIndexOf('.');
    const ftype = file.name.substring(index)
    if (index === -1) {
      message.error('invalid file type, need .zip file');
      setUploading(false)
      return
    }
    if (file.size > 1024 * 1024 * 1024) {
      message.error('file size should be smaller than 1GB');
      setUploading(false)
      return
    }
    let filePath = `/ptm-leaderboard/${obj.account.name}/${params.id}/${file.name}`
    CasdoorBackend.uploadFile(obj.account.owner, obj.account.name, "ptm-leaderboard", "models", "admin", filePath, file)
      .then(res=>{
        setUploading(false)
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
    accept: '.zip',
    multiple: false,
    customRequest: onUploadFile,
    fileList: fileList,
    onRemove: removeFile,
    maxCount: 1,
    disabled: uploading
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

          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">
              Upload ZIP file
            </p>
          </Dragger>

          <div style={{textAlign: 'center', marginTop: '20px'}}>
            <Button loading={loading} onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </Space>
      </div>
    </Card>
  )
}

export default Submit;
