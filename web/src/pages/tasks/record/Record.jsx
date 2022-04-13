import {Card, Divider} from "antd";
import React, {forwardRef, useEffect, useRef} from "react"
import RecordList from "./component/RecordList";
import RecordChart from "./component/RecordChart";
import {useParams} from "react-router-dom";
import userEvent from "@testing-library/user-event";

const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL

function Record(obj) {
  const params = useParams()

  const rlist = React.createRef();
  const rchart = useRef(null)

  let e = null;

  useEffect(()=>{
    const path = `${params.id}-${obj.account.id}`
    e =  new EventSource(`${REACT_APP_BASE_URL}/events/${path}`);
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
