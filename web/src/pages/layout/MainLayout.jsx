import React, {useEffect, useState} from "react";
import {BackTop, Layout, Menu, Dropdown, Avatar} from 'antd';
import {Link, Route, Routes, useLocation, useSearchParams} from 'react-router-dom';
import {
  EllipsisOutlined,
  HddOutlined,
  HomeOutlined,
  LoginOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserOutlined
} from "@ant-design/icons";
import Home from '../home/Home';
import Submit from '../tasks/submit/Submit';
import Rank from "../tasks/rank/Rank";
import Tasks from "../tasks/Tasks";
import TaskInfo from "../tasks/TaskInfo";
import RankInfo from "../tasks/rank/RankInfo";
import Record from "../tasks/record/Record";

import FooterBar from "./component/FooterBar";
import TaskLayout from "./TaskLayout";
import Callback from "../Auth/Callback"

import Auth from '../Auth/Auth'

import './mainlayout.css'
import AuthBackend from "../../backend/AuthBackend";


const PUBLIC_URL = process.env.PUBLIC_URL

const {Header, Content, Footer} = Layout;


function MainLayout() {
  const [selected, setSelected] = useState('')
  const [account ,setAccount] = useState(null)

  const path = useLocation().pathname.split('/')
  const params = useSearchParams()

  useEffect(() => {
    if (path.includes('tasks')) {
      setSelected('tasks')
    }
  }, [])

  const handleMenuChange = (e) => {
    setSelected(e.key)
  }

  const handleMenuClick = (e) => {
    if (e.key === 'account') {
      window.open(Auth.getMyProfileUrl(account))
    } else if (e.key === 'logout') {
      AuthBackend.logout()
        .then((res)=>{
          if (res.data.code === 200) {
            setAccount(null)
          }
        })
        .catch((e) => {
          console.log(e)
        })
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
        <Link to={PUBLIC_URL}>
          <span className="header-title">Home</span>
        </Link>
      </Menu.Item>
      <Menu.Item
        key='tasks'
        icon={<HddOutlined style={{fontSize: '18px'}}/>}>
        <Link to={`${PUBLIC_URL}/tasks`}>
          <span className="header-title">Tasks</span>
        </Link>
      </Menu.Item>
{/*      <Menu.Item key='login' icon={<LoginOutlined style={{fontSize: '18px'}}/>}>
        <span className="header-title">Login</span>
      </Menu.Item>
      <Menu.Item key='account' icon={<UserOutlined style={{fontSize: '18px'}}/>}>
        <span className="header-title">Account</span>
      </Menu.Item>*/}
    </Menu>
  )

  const accountMenu = (
    <Menu style={{width: '150px', padding: '5px'}} onClick={handleMenuClick}>
      <Menu.Item key='account'>
        <SettingOutlined/>&nbsp;&nbsp;
        account
      </Menu.Item>
      <Menu.Item key='logout'>
        <LogoutOutlined/>&nbsp;&nbsp;
        logout
      </Menu.Item>
    </Menu>
  )

  return (
    <Layout className="main-layout">
      <BackTop/>
      <Header className="header">
        <div className="logo">
          <a href={PUBLIC_URL}>PTMA</a>
        </div>


        {mainMenu}
        <div>
          {account === null
            ?
            <a href={Auth.getAuthorizeUrl()}>
              login
            </a>
            :
            <Dropdown overlay={accountMenu} placement="bottomRight" trigger="click">
              <div style={{cursor: 'pointer'}}>
                {/*<Avatar size="large" src={account.avatar} />&nbsp;*/}
                <span>{account.name}</span>
              </div>
            </Dropdown>
          }
        </div>

      </Header>
      <Content className="main-content">
        <Routes>
          <Route index element={<Home/>}/>

          <Route exact path={`${PUBLIC_URL}/callback`} element={<Callback />}/>

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
      <Footer className="footer">
        <FooterBar/>
      </Footer>
    </Layout>
  )
}

export default MainLayout;
