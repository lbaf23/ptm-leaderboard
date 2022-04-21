import { Card } from "antd";
import React, {useEffect, useRef} from "react"
import {useParams} from "react-router-dom";


import RecordList from "./component/RecordList";
import RecordChart from "./component/RecordChart";

const REACT_APP_SEND_URL = process.env.REACT_APP_SEND_URL

let e = null;

function Record(obj) {
  const params = useParams()

  const rlist = useRef(null)
  const rchart = useRef(null)

  useEffect(()=>{
    const path = `${params.id}-${obj.account.id}`
    e =  new EventSource(`${REACT_APP_SEND_URL}/events/${path}`);
    e.onmessage = function (event){
      rlist.current.update()
      rchart.current.update()
    }
    return leave
  }, [])

  const leave = () => {
    e.close()
  }

  return (
    <Card
      bordered={false}
      hoverable
    >
      <p style={{fontSize: '20px', textAlign: 'center', fontWeight: 'bold'}}>My Record</p>
      <RecordList onRef={rlist}/>
      <RecordChart onRef={rchart}/>
    </Card>
  )
}

export default Record;
