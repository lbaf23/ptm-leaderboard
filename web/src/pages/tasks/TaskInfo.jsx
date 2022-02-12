import React, {useEffect} from "react";
import {PageHeader} from "antd";
import { useLocation, useMatch, useParams } from "react-router-dom";


function TaskInfo() {
  const params = useParams();

  useEffect(()=>{
    console.log(params)
  },[])
  return (
    <div
      style={{
        backgroundColor: 'white',
        padding: '20px'
      }}
    >
      SA
    </div>
  )
}

export default TaskInfo;