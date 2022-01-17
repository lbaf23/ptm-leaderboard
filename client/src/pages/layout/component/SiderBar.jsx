import React, {useEffect, useState} from "react";
import {Menu} from "antd"
import {HddOutlined,SendOutlined,TrophyOutlined, HomeOutlined,UserOutlined} from "@ant-design/icons";
import { Link } from "react-router-dom";

function SiderBar() {
  const [selected, setSelected] = useState('home')
  useEffect(()=>{
    let p = window.location.pathname.split("/")
    setSelected(p[1])
  },[])
  const changeMenuItem = (e) => {
    setSelected(e.key)
  }

  return (
    <Menu
      mode="inline"
      theme="dark"
      style={{fontSize: '18px'}}
      onClick={changeMenuItem}
      selectedKeys={[selected]}
    >
      <Menu.Item
        key=""
        icon={<HomeOutlined style={{fontSize: '20px'}}/>}
      >
        <Link to="/">
          Home
        </Link>
      </Menu.Item>
      <Menu.Item
        key="submit"
        icon={<SendOutlined style={{fontSize: '20px'}}/>}
      >
        <Link to="/submit">
          Submit
        </Link>
      </Menu.Item>
      <Menu.Item
        key="rank"
        icon={<TrophyOutlined style={{fontSize: '20px'}} />} >
        <Link to="/rank">
          Rank
        </Link>
      </Menu.Item>
      <Menu.Item
        key="tasks"
        icon={<HddOutlined style={{fontSize: '20px'}} />} >
        <Link to="tasks">
          Tasks
        </Link>
      </Menu.Item>
      <Menu.Item
        key="record"
        icon={<UserOutlined style={{fontSize: '20px'}} />} >
        <Link to="record">
          Record
        </Link>
      </Menu.Item>
    </Menu>
  )
}

export default SiderBar;