import {Card, Table} from "antd";
import React, {useEffect, useState} from "react"
import RecordList from "./component/RecordList";



function Record() {

  return (
    <Card
      bordered={false}
      hoverable
    >
      <p style={{fontSize: '20px', textAlign: 'center', fontWeight: 'bold'}}>My Record</p>
      <RecordList />
    </Card>
  )
}

export default Record;
