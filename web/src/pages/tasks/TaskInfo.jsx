import React, {useEffect, useState} from "react";
import {Button, Card, Divider} from "antd";
import {DownloadOutlined} from '@ant-design/icons'
import {useParams} from "react-router-dom";

import './taskinfo.css'
import TaskBackend from "../../backend/TaskBackend";
import DataSetBackend from "../../backend/DataSetBackend";


function TaskInfo() {
  const params = useParams();
  const [loading, setLoading] = useState(true)
  const [task, setTask] = useState({})
  const [dataSet, setDataSet] = useState([])

  useEffect(() => {
    TaskBackend.getTask(params.id)
    .then(res=>{
      setLoading(false)
      if(res.data.code === 200) {
        setTask(res.data.task)
      }
    })
    .catch(err=>{})
  }, [params.id])

  useEffect(()=>{
    DataSetBackend.getTaskDataSets(params.id)
    .then(res=>{
      if(res.data.code === 200) {
        setDataSet(res.data.datasets)
      }
    })
    .catch(err=>{})
  }, [params.id])

  return (
    <Card hoverable className="task-card" loading={loading}>
      <div className="task-title">{task.title}</div>
      <div className="task-description">{task.description}</div>
      <div className="dataset">DataSet</div>
      {
        dataSet.map((item, index) => (
          <div className="dataset-card" key={index}>
            <Divider orientation="left">
              <span className="dataset-title">{item.title}</span>
            </Divider>

            <div className="dataset-description">{item.description}</div>

            <div className="dataset-trans">Get transformed dataset</div>

            <div className="trans">
              {item.transformations.map((subItem, subIndex) => (
                <div className="trans-card" key={subIndex}>
                  <span className="trans-title">{subItem.title}</span>
                  <span className="download-bt">
                    <Button type="link" icon={<DownloadOutlined style={{fontSize: '18px'}}/>}/>
                  </span>
                </div>
              ))}
            </div>

          </div>
        ))
      }
    </Card>
  )
}

export default TaskInfo;
