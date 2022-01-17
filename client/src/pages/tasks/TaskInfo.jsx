import React, {useEffect} from "react";
import {PageHeader} from "antd";


function TaskInfo() {
  useEffect(()=>{
    let path = window.location.pathname.split("/")
    let id = path[2];
    // TODO get task(id) more info
    console.log(id)
  }, [])

  return (
    <>
      <PageHeader
        onBack={() => {window.history.back()}}
        title={"title"}
        subTitle={"2020-1-2"}
      />
      <div
        style={{
          backgroundColor: 'white',
          padding: '20px'
        }}
      >
        more info
      </div>
    </>
  )
}

export default TaskInfo;