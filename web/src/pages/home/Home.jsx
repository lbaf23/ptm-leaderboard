import React, {useEffect, useState} from "react";
import {Card, Image} from "antd";

import img from "../../assets/index-logo.svg"
import "./index.css"

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
      <div style={{textAlign: 'left', marginTop: '40px', marginBottom: '60px', marginLeft: '60px', marginRight: '60px'}}>
        <ReactMarkdown
          children={md}
          remarkPlugins={[remarkGfm]}
        />
      </div>
    </Card>
  )
}

export default Home;
