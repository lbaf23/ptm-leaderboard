import {Card} from "antd";
import React from "react"
import RecordList from "./component/RecordList";


function Record() {

  return (
    <Card
      bordered={false}
      hoverable
    >
      <p style={{fontSize: '20px', textAlign: 'center', fontWeight: 'bold'}}>My Record</p>
      <RecordList/>
    </Card>
  )
}

export default Record;
