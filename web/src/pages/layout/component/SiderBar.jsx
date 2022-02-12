import React, {useEffect, useState} from "react";
import {Menu} from "antd"
import {HddOutlined,SendOutlined,TrophyOutlined, HomeOutlined,UserOutlined} from "@ant-design/icons";
import { Link } from "react-router-dom";

const PUBLIC_URL = process.env.PUBLIC_URL

class SiderBar extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      selected: 'task'
    }
  }

  changeMenuItem = (e) => {
    this.setState({
      selected: e.key
    })
  }

  render(){
    const {selected} = this.state
    return (
      <Menu
        mode="inline"
        theme="light"
        style={{fontSize: '18px'}}
        onClick={this.changeMenuItem}
        selectedKeys={[selected]}
      >
        <Menu.Item
          key="task"
          icon={<HddOutlined style={{fontSize: '20px'}}/>}
        >
          <Link to={`${PUBLIC_URL}/tasks/sa`}>
            Task
          </Link>
        </Menu.Item>
        <Menu.Item
          key="rank"
          icon={<TrophyOutlined style={{fontSize: '20px'}} />} >
          <Link to={`${PUBLIC_URL}/tasks/sa/rank`}>
            Rank
          </Link>
        </Menu.Item>
        <Menu.Item
          key="submit"
          icon={<SendOutlined style={{fontSize: '20px'}}/>}
        >
          <Link to={`${PUBLIC_URL}/tasks/sa/submit`}>
            Submit
          </Link>
        </Menu.Item>
        <Menu.Item
          key="record"
          icon={<UserOutlined style={{fontSize: '20px'}} />} >
          <Link to={`${PUBLIC_URL}/tasks/sa/record`}>
            Record
          </Link>
        </Menu.Item>
      </Menu>
    )
  }
}

export default SiderBar;