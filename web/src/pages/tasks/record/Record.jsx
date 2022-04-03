import {Card, Divider} from "antd";
import React from "react"
import RecordList from "./component/RecordList";
import RecordChart from "./component/RecordChart";


function Record() {

  return (
    <Card
      bordered={false}
      hoverable
    >
      <p style={{fontSize: '20px', textAlign: 'center', fontWeight: 'bold'}}>My Record</p>
      <RecordList/>
      <RecordChart/>
    </Card>
  )
}

export default Record;
