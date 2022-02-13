import React, {useEffect, useState} from "react";
import {PageHeader} from "antd";

function RecordInfo() {
  const [title, setTitle] = useState('')

  useEffect(() => {
    setTitle('title')
  }, [])

  return (
    <div>
      <PageHeader
        title={title}
      />
    </div>
  )
}

export default RecordInfo;
