import React, {useEffect, useState} from "react";
import {PageHeader} from "antd";

function RankInfo() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  useEffect(()=>{
    let params = window.location.pathname.split("/");
    let id = params[2];
    // TODO get rank more info
    console.log(id)
    setTitle("title")
    setDate("2020-1-1")
  }, [])
  return (
    <>
      <PageHeader
        onBack={() => {window.history.back()}}
        title={title}
        subTitle={date}
      />
      <div
        style={{
          backgroundColor: 'white',
          padding: '20px',
        }}
      >
        more info
      </div>
    </>
  )
}

export default RankInfo;