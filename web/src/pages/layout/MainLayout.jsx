import React from "react";
import {BackTop, Divider, Layout, Menu} from 'antd';
import {Route, Routes, Link} from 'react-router-dom';
import {LoginOutlined, HddOutlined, HomeOutlined, UserOutlined,EllipsisOutlined} from "@ant-design/icons";
import Home from '../home/Home';
import Submit from '../submit/Submit';
import Rank from "../rank/Rank";
import Tasks from "../tasks/Tasks";
import TaskInfo from "../tasks/TaskInfo";
import RankInfo from "../rank/RankInfo";
import Record from "../record/Record";

import './mainlayout.css'
import FooterBar from "./component/FooterBar";
import TaskLayout from "./TaskLayout";

const PUBLIC_URL = process.env.PUBLIC_URL

const { Header, Content, Footer } = Layout;


class MainLayout extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render(){
    return (
      <Layout style={{minHeight: "100vh"}}>
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
          >
            <Menu.Item key='1' icon={<HomeOutlined className="header-icon"/>}>
              <Link to={PUBLIC_URL}>
                <span className="header-title">Home</span>
              </Link>
            </Menu.Item>
            <Menu.Item
              key='2'
              icon={<HddOutlined className="header-icon" />} >
              <Link to={`${PUBLIC_URL}/tasks`}>
                <span className="header-title">Tasks</span>
              </Link>
            </Menu.Item>
            <Menu.Item key='3' icon={<LoginOutlined className="header-icon" />}>
              <span className="header-title">Login</span>
            </Menu.Item>
            <Menu.Item key='4' icon={<UserOutlined className="header-icon"/>}>
              <span className="header-title">Account</span>
            </Menu.Item>
          </Menu>
        </Header>
            <Content
              style={{
                padding: '20px',
              }}
            >
              <Routes>
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
}

export default MainLayout;
