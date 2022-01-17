import React, {useEffect, useState} from "react";
import {Menu} from "antd"
import {HddOutlined,SendOutlined,TrophyOutlined, HomeOutlined,UserOutlined} from "@ant-design/icons";
import { Link } from "react-router-dom";

const base_url = process.env.PUBLIC_URL

function SiderBar() {
  const [selected, setSelected] = useState('')
  useEffect(()=>{
    let p = window.location.pathname.split("/")
    if (p.length > 3) {
      setSelected(p[3])
    } else {
      setSelected('')
    }
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
        <Link to={`${base_url}`}>
          Home
        </Link>
      </Menu.Item>
      <Menu.Item
        key="submit"
        icon={<SendOutlined style={{fontSize: '20px'}}/>}
      >
        <Link to={`${base_url}/submit`}>
          Submit
        </Link>
      </Menu.Item>
      <Menu.Item
        key="rank"
        icon={<TrophyOutlined style={{fontSize: '20px'}} />} >
        <Link to={`${base_url}/rank`}>
          Rank
        </Link>
      </Menu.Item>
      <Menu.Item
        key="tasks"
        icon={<HddOutlined style={{fontSize: '20px'}} />} >
        <Link to={`${base_url}/tasks`}>
          Tasks
        </Link>
      </Menu.Item>
      <Menu.Item
        key="record"
        icon={<UserOutlined style={{fontSize: '20px'}} />} >
        <Link to={`${base_url}/record`}>
          Record
        </Link>
      </Menu.Item>
    </Menu>
  )
}

export default SiderBar;