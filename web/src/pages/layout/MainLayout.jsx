import React, { useEffect, useState } from "react";
import {BackTop, Layout, Menu} from 'antd';
import {Route, Routes, Link, useLocation, useSearchParams} from 'react-router-dom';
import {LoginOutlined, HddOutlined, HomeOutlined, UserOutlined,EllipsisOutlined} from "@ant-design/icons";
import Home from '../home/Home';
import Submit from '../tasks/submit/Submit';
import Rank from "../tasks/rank/Rank";
import Tasks from "../tasks/Tasks";
import TaskInfo from "../tasks/TaskInfo";
import RankInfo from "../tasks/rank/RankInfo";
import Record from "../tasks/record/Record";

import FooterBar from "./component/FooterBar";
import TaskLayout from "./TaskLayout";

import './mainlayout.css'


const PUBLIC_URL = process.env.PUBLIC_URL

const { Header, Content, Footer } = Layout;


function MainLayout() {
  const [selected, setSelected] = useState('')
  const path = useLocation().pathname.split('/')
  const params = useSearchParams()

  useEffect(()=>{
    if (path.includes('tasks')) {
      setSelected('tasks')
    }
  }, [])

  const handleMenuChange = (e) => {
    setSelected(e.key)
  }

    return (
      <Layout className="main-layout">
        <BackTop />
        <Header className="header" >
          <span className="logo">
            <a href={PUBLIC_URL}>PTMA</a>
          </span>
          <Menu
            triggerSubMenuAction="click"
            theme="light"
            mode="horizontal"
            overflowedIndicator={<EllipsisOutlined style={{fontSize: '20px'}} />}
            className="menu"
            selectedKeys={[selected]}
            onClick={handleMenuChange}
          >
            <Menu.Item key='' icon={<HomeOutlined style={{fontSize: '18px'}}/>} >
              <Link to={PUBLIC_URL}>
                <span className="header-title">Home</span>
              </Link>
            </Menu.Item>
            <Menu.Item
              key='tasks'
              icon={<HddOutlined style={{fontSize: '18px'}}/>} >
              <Link to={`${PUBLIC_URL}/tasks`}>
                <span className="header-title">Tasks</span>
              </Link>
            </Menu.Item>
            <Menu.Item key='login' icon={<LoginOutlined style={{fontSize: '18px'}} />}>
              <span className="header-title">Login</span>
            </Menu.Item>
            <Menu.Item key='account' icon={<UserOutlined style={{fontSize: '18px'}}/>}>
              <span className="header-title">Account</span>
            </Menu.Item>
          </Menu>
        </Header>
            <Content
              className="content"
              
            >
              <Routes>
                <Route index element={<Home/>}/>

                <Route exact path={`${PUBLIC_URL}`} element={<Home/>}/>
                <Route exact path={`${PUBLIC_URL}/tasks`} element={<Tasks/>}/>
                <Route path={`${PUBLIC_URL}/tasks/:id`} element={<TaskLayout/>}>
                  <Route index element={<TaskInfo/>}/>

                  <Route exact path="submit" element={<Submit/>}/>
                  
                  <Route exact path="rank" element={<Rank/>}/>
                  <Route path="rank/:id" element={<RankInfo/>}/>

                  <Route path="record" element={<Record/>}/>
                  <Route path="record/:id" element={<TaskInfo/>}/>
                </Route>
              </Routes>
            </Content>
            <Footer>
              <FooterBar />
            </Footer>
        </Layout>
    )
}

export default MainLayout;
