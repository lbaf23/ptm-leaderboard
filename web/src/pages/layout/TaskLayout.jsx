import React, {useState} from "react";
import {Layout, PageHeader, Affix} from 'antd';
import {Route, Routes, Link, Outlet} from 'react-router-dom';
import {LoginOutlined} from "@ant-design/icons";
import Home from '../home/Home';
import Submit from '../submit/Submit';
import SiderBar from "./component/SiderBar";
import Rank from "../rank/Rank";
import Tasks from "../tasks/Tasks";
import TaskInfo from "../tasks/TaskInfo";
import RankInfo from "../rank/RankInfo";
import Record from "../record/Record";

import './tasklayout.css'

const {Content, Sider} = Layout;
const PUBLIC_URL = process.env.PUBLIC_URL

class TaskLayout extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false
        }
    }

  onCollapse = () => {
    this.setState((prev)=>({
      collapsed: !prev.collapsed
    }))
  }
  render(){
    return (
      <div>
        <PageHeader
          onBack={() => {window.history.back()}}
          title={"Tasks"}
          subTitle={"SA"}
        />
        <Layout >
          <Affix offsetTop={10}>
            <Sider
                theme="light"
                collapsedWidth="0"
                onCollapse={this.onCollapse}
                breakpoint="lg"
              >
                <SiderBar />
              </Sider>
            </Affix>
            <Content className="content">
              <Outlet/>
            </Content>
          </Layout>
      </div>
    )
  }
}

export default TaskLayout;
