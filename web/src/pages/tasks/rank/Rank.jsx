import React, {useEffect} from "react";
import {Card} from "antd";
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
      <RankList/>
    </Card>
  )
}

export default Rank;
