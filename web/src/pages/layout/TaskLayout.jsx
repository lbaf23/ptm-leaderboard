import React, {useEffect, useState} from "react";
import {Layout, PageHeader, Affix, Button} from 'antd';
import {Route, Routes, Link, Outlet} from 'react-router-dom';
import {LoginOutlined, MenuUnfoldOutlined, MenuFoldOutlined} from "@ant-design/icons";
import SiderBar from "./component/SiderBar";


import './tasklayout.css'

const {Content, Sider} = Layout;
const PUBLIC_URL = process.env.PUBLIC_URL

function TaskLayout() {
  const [collapsed, setCollapsed] = useState(false)

  useEffect(()=>{

  }, [])


  const onCollapse = () => {
    setCollapsed(!collapsed)
  }

  return (
    <div className="task-layout">
      <PageHeader
        onBack={() => {window.history.back()}}
        title={"Tasks"}
        subTitle=""
      />
      <Layout >
        <Affix offsetTop={10}>
          <div>
            <Sider
              theme="light"
              collapsible
              trigger={null}
              collapsed={collapsed}
              breakpoint="lg"
            >
              <SiderBar />
            </Sider>
            <div className="trigger" onClick={onCollapse}>
                {collapsed? <MenuUnfoldOutlined className="trigger-icon"/> : <MenuFoldOutlined className="trigger-icon"/>}
            </div>
          </div>
        </Affix>
        <Content className="task-content">
          <Outlet/>
        </Content>
      </Layout>
    </div>
  )
}

export default TaskLayout;
