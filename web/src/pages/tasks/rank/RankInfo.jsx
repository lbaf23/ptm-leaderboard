import React, {useEffect, useState} from "react";
import {Card} from "antd";

function RankInfo() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  useEffect(() => {
    let params = window.location.pathname.split("/");
    let id = params[2];
    // TODO get rank more info
    console.log(id)
    setTitle("title")
    setDate("2020-1-1")
  }, [])

  return (
    <Card>
      INFO
    </Card>
  )
}

export default RankInfo;
