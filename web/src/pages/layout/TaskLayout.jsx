import React, {useEffect, useState} from "react";
import {Affix, Layout, PageHeader} from 'antd';
import {Outlet, useNavigate} from 'react-router-dom';
import {MenuFoldOutlined, MenuUnfoldOutlined} from "@ant-design/icons";
import SiderBar from "./component/SiderBar";


import './tasklayout.css'

const {Content, Sider} = Layout;
const PUBLIC_URL = process.env.PUBLIC_URL

function TaskLayout() {
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {

  }, [])


  const onCollapse = () => {
    setCollapsed(!collapsed)
  }
  const navigate = useNavigate()

  return (
    <div className="task-layout">
      <PageHeader
        onBack={() => {
          navigate(`${PUBLIC_URL}/tasks`)
        }}
        title={"Tasks"}
        subTitle=""
      />
      <Layout>
        <Affix offsetTop={10}>
          <div>
            <Sider
              theme="light"
              collapsible
              trigger={null}
              collapsed={collapsed}
              breakpoint="lg"
            >
              <SiderBar/>
            </Sider>
            <div className="trigger" onClick={onCollapse}>
              {collapsed ? <MenuUnfoldOutlined className="trigger-icon"/> :
                <MenuFoldOutlined className="trigger-icon"/>}
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
