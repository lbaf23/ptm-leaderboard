import React, {useState} from "react";
import {Layout} from 'antd';
import {Route, Routes, Link} from 'react-router-dom';
import {LoginOutlined} from "@ant-design/icons";
import Home from '../home/Home';
import Submit from '../submit/Submit';
import SiderBar from "./component/SiderBar";
import Rank from "../rank/Rank";
import Tasks from "../tasks/Tasks";
import TaskInfo from "../tasks/TaskInfo";
import RankInfo from "../rank/RankInfo";
import Record from "../record/Record";

const {Header, Content, Sider} = Layout;

function MainLayout() {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = () => {
    setCollapsed(!collapsed)
  }
  return (
    <Layout style={{height: "100vh"}}>
      <Header style={{paddingLeft: '20px'}}>
        <a href="/">
          <span style={{color: 'white', fontSize: '40px', fontWeight:'bold'}}>
            PTMA
          </span>
        </a>
        <Link to="/">
          <span style={{fontSize: '20px', float: 'right', color: 'white', fontWeight:'bold'}}>
            <LoginOutlined />&nbsp;Login
          </span>
        </Link>
      </Header>
      <Layout>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={onCollapse}
          breakpoint="lg"
        >
          <SiderBar />
        </Sider>
        <Layout>
          <Content
            style={{
              padding: '20px',
              overflow: 'auto',
            }}
          >
            <Routes>
              <Route exact path="/" element={<Home/>}/>
              <Route exact path="/submit" element={<Submit/>}/>

              <Route exact path="/rank" element={<Rank/>}/>
              <Route path="/rank/:id" element={<RankInfo/>}/>

              <Route exact path="/tasks" element={<Tasks/>}/>
              <Route path="/tasks/:id" element={<TaskInfo/>}/>

              <Route path="/record" element={<Record/>}/>
              <Route path="/record/:id" element={<TaskInfo/>}/>
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default MainLayout;
