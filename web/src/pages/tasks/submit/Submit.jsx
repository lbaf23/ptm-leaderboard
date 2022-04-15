import React, {useEffect, useState} from "react";
import {Button, Card, Cascader, Divider, Input, message, Space, Upload, Progress} from "antd";
import {UploadOutlined, InboxOutlined} from "@ant-design/icons"
import {useParams} from "react-router-dom";
import SubmitBackend from "../../../backend/SubmitBackend";
import SubmitDescription from "./component/SubmitDescription";

import { Tabs } from 'antd';
import FileBackend from "../../../backend/FileBackend";

const { TabPane } = Tabs;

function Submit(obj) {
  const params = useParams();

  const [loading, setLoading] = useState(false)

  const [modelName, setModelName] = useState('')
  const [modelUrl, setModelUrl] = useState('')
  const [hg, setHg] = useState('')
  const [hgToken, setHgToken] = useState('')
  const [fileList, setFileList] = useState([])
  const [percent, setPercent] = useState(0)

  const [mode, setMode] = useState('hg')

  useEffect(()=>{
  },[])

  const changeTab = (e) => {
    setMode(e)
  }

  const preCheck = () => {
    if(mode === 'file') {
      if (fileList.length === 0) {
        message.error("Upload zip file")
        return false
      }
    } else {
      if(hg === '') {
        message.error("Please input Hugging Face Model")
        return false
      }
    }
    return true
  }
  const handleSubmit = () => {
    if (preCheck()){
      setLoading(true)
      if(mode === 'file') {
        uploadFile()
      } else if(mode === 'hg') {
        submit(hg)
      } else {
        submit(modelUrl)
      }
    }
  }

  const submit = (url) => {
    let name = modelName
    if(name === '') {
      if (mode === 'file') {
        name = fileList[0].name
      } else {
        name = hg
      }
    }
    SubmitBackend.submitModel(name, url, params.id, mode, hgToken)
      .then(res=>{
        setLoading(false)
        if(res.data.code === 200) {
          message.success(res.data.message)
          setFileList([])
          setModelName('')
          setModelUrl('')
          setHg('')
          setHgToken('')
        } else {
          message.error(res.data.message)
        }
      })
      .catch(err=>{})
  }

  const inputModelName = (e) => {
    setModelName(e.target.value)
  }
  const inputModelUrl = (e) => {
    setModelUrl(e.target.value)
  }
  const inputHg = (e) => {
    setHg(e.target.value)
  }
  const inputHgToken = (e) => {
    setHgToken(e.target.value)
  }

  const removeFile = () => {
    setFileList([])
  }

  const onUploadFile = (file) => {
    setFileList([file.file])
  }

  const uploadFile = () =>{
    setLoading(true)
    const file = fileList[0]
    const index = file.name.lastIndexOf('.');
    const ftype = file.name.substring(index)
    if (index === -1 || ftype !== '.zip') {
      message.error('invalid file type, need .zip file');
      setLoading(false)
      return
    }
    if (file.size > 1024 * 1024 * 1024) {
      message.error('file size should be smaller than 1GB');
      setLoading(false)
      return
    }
    uploadChunks(file)
  }

  const uploadChunks = async (file) => {
    // 1 MB
    const chunkSize = 1024 * 1024 * 1
    const chunks = getFileChunks(file, chunkSize)
    const path = `/ptm-leaderboard/${obj.account.name}/${params.id}`
    const name = file.name
    const chunkLength = chunks.length

    for (let i=0; i<chunkLength; i++) {
      let chunk = chunks[i]
      let data = new FormData()
      data.append('file', chunk)
      data.append('index', i)
      data.append('chunkLength', chunkLength)
      data.append('currentSize', chunk.size)
      data.append('totalSize', file.size)
      data.append('path', path)
      data.append('name', name)
      data.append('location', 'local')

      await FileBackend.uploadFile(data)
        .then(res => {
          if (res.data.code === 200) {
            setPercent(parseInt((i+1)/chunkLength * 100))
            if(res.data.finished) {
              const url = res.data.url
              submit(url)
            }
          } else {
            message.error(res.data.message)
          }
        })
        .catch(e => {
          console.log(e)
        })
    }
  }

  const getFileChunks = (file, chunkSize) => {
    let { size } = file
    let total = Math.ceil(size / chunkSize)
    let chunks = []
    if (size > chunkSize) {
      for (let i = 0; i < total; i++) {
        let start = i * chunkSize
        let end = (i + 1) * chunkSize
        let chunk = file.slice(start, end)
        chunks.push(chunk)
      }
    } else {
      chunks.push(file)
    }
    return chunks
  }

  const props = {
    name: 'file',
    accept: '.zip',
    multiple: false,
    customRequest: onUploadFile,
    fileList: fileList,
    onRemove: removeFile,
    disabled: loading,
    listType: "picture"
  };

  return (
    <Card
      bordered={false}
      hoverable
    >
      <p style={{fontSize: '20px', textAlign: 'center', fontWeight: 'bold'}}>Submit</p>

      <Divider>Description</Divider>

      <div>
        <SubmitDescription />
      </div>

      <Divider>Submit</Divider>

      <div>
        <Space direction="vertical" size="middle" style={{width: '100%'}}>
          <Input addonBefore="Model Name" maxLength={20} showCount onChange={inputModelName} value={modelName}/>

          <Tabs defaultActiveKey="hg" onChange={changeTab}>
            <TabPane tab="Hugging Face Model" key="hg">
              <Input addonBefore="Hugging Face Model" maxLength={1000} showCount onChange={inputHg} value={hg}/>
              <Input style={{marginTop: '20px'}} addonBefore="Auth Token" maxLength={1000} showCount onChange={inputHgToken} value={hgToken}/>
            </TabPane>
            <TabPane tab="Upload file" key="file">
              <Upload {...props}>
                <Button icon={<UploadOutlined />}>choose ZIP file</Button>
              </Upload>
              {loading ?
                <Progress percent={percent}/> : null
              }
            </TabPane>
{/*
            <TabPane tab="File url" key="url">
              <Input addonBefore="File url" maxLength={1000} showCount onChange={inputModelUrl} value={modelUrl}/>
            </TabPane>
*/}

          </Tabs>

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
