import React, {useEffect, useState} from "react";
import {Affix, Layout, PageHeader} from 'antd';
import {Outlet, useNavigate} from 'react-router-dom';
import {LeftOutlined, RightOutlined} from "@ant-design/icons";
import SiderBar from "./component/SiderBar";


import './tasklayout.css'

const {Content, Sider} = Layout;
const PUBLIC_URL = process.env.PUBLIC_URL

function TaskLayout(obj) {
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    return destroy;
  }, [])

  const destroy = () => {
  }

  const onCollapse = () => {
    setCollapsed(!collapsed)
  }
  const navigate = useNavigate()

  return (
    <div className="task-layout">
      <PageHeader
        onBack={() => {
          navigate(`${PUBLIC_URL}/home/tasks`)
        }}
        title={"Tasks"}
        subTitle=""
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
          <Outlet/>
        </Content>
      </Layout>
    </div>
  )
}

export default TaskLayout;
