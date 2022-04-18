import React, {useEffect, useState} from "react";
import {Card, Image} from "antd";

import img from "../../assets/index-logo.svg"
import "./index.css"

import HomeBackend from "../../backend/HomeBackend";
import homeMarkdown from "../../assets/home.md";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";


function Home() {
  const [md, setMd] = useState('')

  useEffect(()=>{
    getMd()
  },[])

  const getMd = () => {
    fetch(homeMarkdown)
      .then(res=>res.text()).then((text)=>{
      setMd(text)
    })
  }

  return (
    <Card
      bordered={false}
      hoverable={false}
      className="card shadow"
    >
      <div className="title">Pre-Trained Models Attack Benchmark</div>
      <Image src={img} preview={false} className="image"/>
      <ReactMarkdown
        children={md}
        remarkPlugins={[remarkGfm]}
      />
      {/*<div style={{textAlign: 'right'}}>
        {editing ?
          <Button loading={saving} type="text" icon={<SaveOutlined />} onClick={handleSave}/> :
          <Button type="text" icon={<EditOutlined />} onClick={handleEdit}/>
        }
      </div>
      <div style={{textAlign: 'left', marginTop: '20px', marginBottom: '60px', marginLeft: '60px', marginRight: '60px'}}>
        {editing ?
          <MDEditor value={content} onChange={handleChange} height="100%" /> :
          <MDEditor.Markdown source={content} />
        }
      </div>*/}
    </Card>
  )
}

export default Home;
