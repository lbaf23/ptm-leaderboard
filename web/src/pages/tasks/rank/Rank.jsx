import React, {useEffect, useState} from "react";
import {Button, Card, Table} from "antd";
import {Link} from "react-router-dom";
import {ArrowRightOutlined} from "@ant-design/icons";
import { tab } from "@testing-library/user-event/dist/tab";
import RankList from "./component/RankList";

function Rank() {
  useEffect(() => {
  }, [])

  return (
    <Card
      bordered={false}
      hoverable
    >
      <p style={{fontSize: '20px', textAlign: 'center', fontWeight: 'bold'}}>Rank</p>
      <RankList />
    </Card>
  )
}

export default Rank;
