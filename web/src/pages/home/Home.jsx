import React, {useEffect, useState} from "react";
import {Button, Card, Image} from "antd";

import img from "../../assets/index-logo.svg"
import "./index.css"
import MDEditor from "@uiw/react-md-editor";
import TaskBackend from "../../backend/TaskBackend";
import {EditOutlined, SaveOutlined} from "@ant-design/icons";
import HomeBackend from "../../backend/HomeBackend";

const title = 'Pre-Trained Models Attack Benchmark';

function Home() {
  const [editing, setEditing] = useState(false)
  const [content, setContent] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(()=>{
    getHomeContent()
  },[])

  const getHomeContent = () => {
    HomeBackend.getHomeContent()
      .then(res=>{
        if(res.data.code === 200){
          setContent(res.data.content)
        }
      })
      .catch(e=>{})
  }

  const handleChange = (value) => {
    setContent(value)
  }
  const handleEdit = () => {
    setEditing(true)
  }

  const handleSave = () => {
    setSaving(true)
    HomeBackend.updateHomeContent(content)
      .then(res=>{
        setSaving(false)
        if (res.data.code === 200) {
          setEditing(false)
        }
      })
      .catch(err=>{})
  }
  return (
    <Card
      bordered={false}
      hoverable={false}
      className="card shadow"
    >
      <div className="title">{title}</div>
      <Image src={img} preview={false} className="image"/>

      <div style={{textAlign: 'right'}}>
        {editing ?
          <Button loading={saving} type="text" icon={<SaveOutlined />} onClick={handleSave}/> :
          <Button type="text" icon={<EditOutlined />} onClick={handleEdit}/>
        }
      </div>
      <div style={{textAlign: 'left', marginTop: '20px', marginLeft: '60px', marginRight: '60px'}}>
        {editing ?
          <MDEditor value={content} onChange={handleChange} height="100%" /> :
          <MDEditor.Markdown source={content} />
        }
      </div>
      <p className="bt-content">
        <Button>PAPER</Button>&nbsp;&nbsp;&nbsp;
        <Button>STARTER CODE</Button>
      </p>
    </Card>
  )
}

export default Home;
