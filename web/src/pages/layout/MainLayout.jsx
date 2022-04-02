import React, {useEffect, useState} from "react";
import {BackTop, Layout, Menu, Dropdown, Avatar, Row, Col} from 'antd';
import {Link, Route, Routes, useLocation} from 'react-router-dom';
import {
  EllipsisOutlined,
  HddOutlined,
  HomeOutlined,
  LoginOutlined,
  LogoutOutlined,
  SettingOutlined
} from "@ant-design/icons";

import FooterBar from "./component/FooterBar";
import TaskLayout from "./TaskLayout";

import {getAuthorizeUrl, getMyProfileUrl} from '../auth/Auth'

import './mainlayout.css'
import AuthBackend from "../../backend/AuthBackend";
import Home from "../home/Home";
import Tasks from "../tasks/Tasks";
import TaskInfo from "../tasks/TaskInfo";
import Submit from "../tasks/submit/Submit";
import Rank from "../tasks/rank/Rank";
import Record from "../tasks/record/Record";
import NeedLogin from "./component/NeedLogin";


const PUBLIC_URL = process.env.PUBLIC_URL

const {Header, Content, Footer} = Layout;


function MainLayout() {
  const [selected, setSelected] = useState('')
  const [account ,setAccount] = useState(null)

  const path = useLocation().pathname.split('/')

  useEffect(() => {
    if (path.includes('tasks')) {
      setSelected('tasks')
    }
    AuthBackend.getAccount()
    .then(res=>{
      if(res.data.code === 200) {
        setAccount(res.data.account)
      }
    })
    .catch(err=>{
      console.log(err)
    })
  }, [])

  const handleMenuChange = (e) => {
    setSelected(e.key)
  }

  const handleMenuClick = (e) => {
    if (e.key === 'account') {
      window.open(getMyProfileUrl(account))
    } else if (e.key === 'logout') {
      localStorage.setItem("token", "")
      AuthBackend.logout()
        .then((res)=>{
          if (res.data.code === 200) {
            window.location.reload()
          }
        })
        .catch((e) => {
          console.log(e)
        })
    }
  }

  const userLogin = () => {
    const url = window.location.href
    localStorage.setItem("url", url)
    window.location.href = getAuthorizeUrl()
  }

  const renderComponentIfLogin = (component) => {
    if(account === null) {
      return <NeedLogin userLogin={userLogin}/>
    } else {
      return component
    }
  }

  const mainMenu = (
    <Menu
      triggerSubMenuAction="click"
      theme="light"
      mode="horizontal"
      overflowedIndicator={<EllipsisOutlined style={{fontSize: '20px'}}/>}
      className="main-menu"
      selectedKeys={[selected]}
      onClick={handleMenuChange}
    >
      <Menu.Item key='' icon={<HomeOutlined style={{fontSize: '18px'}}/>}>
        <Link to="">
          <span className="header-title">Home</span>
        </Link>
      </Menu.Item>
      <Menu.Item
        key='tasks'
        icon={<HddOutlined style={{fontSize: '18px'}}/>}>
        <Link to="tasks">
          <span className="header-title">Tasks</span>
        </Link>
      </Menu.Item>
    </Menu>
  )

  const accountMenu = (
    <Menu style={{width: '150px', padding: '5px'}} onClick={handleMenuClick}>
      <Menu.Item key='account' icon={<SettingOutlined/>}>
        Account
      </Menu.Item>
      <Menu.Item key='logout' icon={<LogoutOutlined/>}>
        Logout
      </Menu.Item>
    </Menu>
  )

  return (
    <Layout className="main-layout">
      <BackTop/>
      <Header className="header">
        <Row wrap={false} justify="space-between">
          <Col flex="200px">
            <div className="logo">
              <a href={`${PUBLIC_URL}/home`}>PTMA</a>
            </div>
          </Col>
          <Col flex="auto">
            {mainMenu}
          </Col>
          <Col flex="auto">
            {account === null
              ?
              <div onClick={userLogin} className="login">
                <LoginOutlined/>
                <span style={{marginLeft: '10px'}}>Login</span>
              </div>
              :
              <Dropdown overlay={accountMenu} placement="bottomRight" trigger="click">
                <div style={{cursor: 'pointer', float: 'right'}}>
                  <Avatar src={account.avatar} />
                  <span style={{fontSize: '16px', marginLeft: '5px'}}>{account.name}</span>
                </div>
              </Dropdown>
            }
          </Col>
        </Row>
      </Header>
      <Content className="main-content">

        <Routes>
          <Route index element={<Home/>} />
          <Route path="tasks" element={<Tasks/>}/>
          <Route path="tasks/:id" element={<TaskLayout/>}>
            <Route index element={<TaskInfo/>}/>
            <Route exact path="rank" element={<Rank/>}/>

            <Route exact path="submit" element={renderComponentIfLogin(<Submit account={account}/>)}/>
            <Route path="record" element={renderComponentIfLogin(<Record/>)}/>
          </Route>
        </Routes>

      </Content>
      <Footer className="footer">
        <FooterBar/>
      </Footer>
    </Layout>
  )
}

export default MainLayout;
