import React, {useState} from "react";
import {Affix, Layout, PageHeader} from 'antd';
import {Route, Routes, useNavigate, useParams} from 'react-router-dom';
import {LeftOutlined, RightOutlined} from "@ant-design/icons";

import SiderBar from "./component/SiderBar";
import './tasklayout.css'

import {getAuthorizeUrl} from "../auth/Auth";

import TaskInfo from "../tasks/TaskInfo";
import Submit from "../tasks/submit/Submit";
import Rank from "../tasks/rank/Rank"
import Record from "../tasks/record/Record";
import NeedLogin from "./component/NeedLogin";

const {Content, Sider} = Layout;
const PUBLIC_URL = process.env.PUBLIC_URL

const map = {
  "sa": "Sentiment Analysis",
  "csa": "Chinese Sentiment Analysis",
  "nli": "Natural Language Inference",
  "qqp": "Quora Question Pairs"
}

function TaskLayout(props) {
  const params = useParams()

  const [collapsed, setCollapsed] = useState(false)

  const onCollapse = () => {
    setCollapsed(!collapsed)
  }
  const navigate = useNavigate()

  const userLogin = () => {
    const url = window.location.href
    localStorage.setItem("url", url)
    window.location.href = getAuthorizeUrl()
  }
  const renderComponentIfLogin = (component) => {
    if(props.account === null) {
      return <NeedLogin userLogin={userLogin}/>
    } else {
      return component
    }
  }

  return (
    <div className="task-layout">
      <PageHeader
        onBack={() => {
          navigate(`${PUBLIC_URL}/home/tasks`)
        }}
        title={"Tasks"}
        subTitle={map[params.id]}
      />
      <Layout>
        <Affix offsetTop={10}>
          <div>
            <Sider
              theme="light"
              trigger={null}
              collapsed={collapsed}
            >
              <SiderBar/>
            </Sider>
            <div className="trigger" onClick={onCollapse}>
              {collapsed ? <RightOutlined className="trigger-icon"/> :
                <LeftOutlined className="trigger-icon"/>}
            </div>
          </div>
        </Affix>
        <Content className="task-content">
          <Routes>
            <Route index element={<TaskInfo/>}/>
            <Route exact path="rank" element={<Rank/>}/>
            <Route exact path="submit" element={renderComponentIfLogin(<Submit account={props.account}/>)}/>
            <Route path="record" element={renderComponentIfLogin(<Record account={props.account}/>)}/>
          </Routes>
        </Content>
      </Layout>
    </div>
  )
}

export default TaskLayout;
