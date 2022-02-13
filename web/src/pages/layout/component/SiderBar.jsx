import React, {useEffect, useState} from "react";
import {Menu} from "antd"
import {FileTextOutlined, SendOutlined, TrophyOutlined, UserOutlined} from "@ant-design/icons";
import {Link, useLocation} from "react-router-dom";

import './siderbar.css'

const PUBLIC_URL = process.env.PUBLIC_URL

function SiderBar() {
  const [selected, setSelected] = useState('task')
  const path = useLocation().pathname.split('/')

  useEffect(() => {
    if (path.includes('rank')) {
      setSelected('rank')
    } else if (path.includes('submit')) {
      setSelected('submit')
    } else if (path.includes('record')) {
      setSelected('record')
    }
  }, [])

  const changeMenuItem = (e) => {
    setSelected(e.key)
  }

  return (
    <Menu
      mode="inline"
      theme="light"
      onClick={changeMenuItem}
      selectedKeys={[selected]}
    >
      <Menu.Item
        key="task"
        icon={<FileTextOutlined style={{fontSize: '18px'}}/>}
      >
        <Link to={`${PUBLIC_URL}/tasks/sa`}>
          <span className="sider-title">Task</span>
        </Link>
      </Menu.Item>
      <Menu.Item
        key="rank"
        icon={<TrophyOutlined style={{fontSize: '18px'}}/>}>
        <Link to={`${PUBLIC_URL}/tasks/sa/rank`}>
          <span className="sider-title">Rank</span>
        </Link>
      </Menu.Item>
      <Menu.Item
        key="submit"
        icon={<SendOutlined style={{fontSize: '18px'}}/>}
      >
        <Link to={`${PUBLIC_URL}/tasks/sa/submit`}>
          <span className="sider-title">Submit</span>
        </Link>
      </Menu.Item>
      <Menu.Item
        key="record"
        icon={<UserOutlined style={{fontSize: '18px'}}/>}>
        <Link to={`${PUBLIC_URL}/tasks/sa/record`}>
          <span className="sider-title">Record</span>
        </Link>
      </Menu.Item>
    </Menu>
  )
}

export default SiderBar;
