import {Button, Table} from "antd";
import React, {useEffect, useState} from "react";
import {ArrowRightOutlined} from "@ant-design/icons"
import {Link} from "react-router-dom";

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Metric',
    dataIndex: 'metric',
    key: 'metric'
  },
  {
    title: 'More Info',
    dataIndex: 'id',
    key: 'more info',
    render: id => (
      <Link to={id}>
        <Button type="link" icon={<ArrowRightOutlined />} size="large" />
      </Link>
    )
  }
]

function Tasks() {
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([])
  useEffect(()=>{
    // TODO get task list
    setTasks([
      {id: '1', name: 'T1: Pre-Trained Models are unsafe', metric: 'Accuracy'},
      {id: '2', name: 'T1: Pre-Trained Models are unsafe', metric: 'Accuracy'},
      {id: '3', name: 'T1: Pre-Trained Models are unsafe', metric: 'Accuracy'},
      {id: '4', name: 'T1: Pre-Trained Models are unsafe', metric: 'Accuracy'},
      {id: '1', name: 'T1: Pre-Trained Models are unsafe', metric: 'Accuracy'},
      {id: '2', name: 'T1: Pre-Trained Models are unsafe', metric: 'Accuracy'},
      {id: '3', name: 'T1: Pre-Trained Models are unsafe', metric: 'Accuracy'},
      {id: '4', name: 'T1: Pre-Trained Models are unsafe', metric: 'Accuracy'},
      {id: '1', name: 'T1: Pre-Trained Models are unsafe', metric: 'Accuracy'},
      {id: '2', name: 'T1: Pre-Trained Models are unsafe', metric: 'Accuracy'},
      {id: '3', name: 'T1: Pre-Trained Models are unsafe', metric: 'Accuracy'},
      {id: '4', name: 'T1: Pre-Trained Models are unsafe', metric: 'Accuracy'},
      {id: '1', name: 'T1: Pre-Trained Models are unsafe', metric: 'Accuracy'},
      {id: '2', name: 'T1: Pre-Trained Models are unsafe', metric: 'Accuracy'},
      {id: '3', name: 'T1: Pre-Trained Models are unsafe', metric: 'Accuracy'},
      {id: '4', name: 'T1: Pre-Trained Models are unsafe', metric: 'Accuracy'},
      {id: '1', name: 'T1: Pre-Trained Models are unsafe', metric: 'Accuracy'},
      {id: '2', name: 'T1: Pre-Trained Models are unsafe', metric: 'Accuracy'},
      {id: '3', name: 'T1: Pre-Trained Models are unsafe', metric: 'Accuracy'},
      {id: '4', name: 'T1: Pre-Trained Models are unsafe', metric: 'Accuracy'},
      {id: '1', name: 'T1: Pre-Trained Models are unsafe', metric: 'Accuracy'},
      {id: '2', name: 'T1: Pre-Trained Models are unsafe', metric: 'Accuracy'},
      {id: '3', name: 'T1: Pre-Trained Models are unsafe', metric: 'Accuracy'},
      {id: '4', name: 'T1: Pre-Trained Models are unsafe', metric: 'Accuracy'},
    ])
    setLoading(false);
  },[])
  return (
    <div>
      <p style={{fontSize: '20px', textAlign: 'center', fontWeight: 'bold'}}>Tasks</p>
      <Table
        dataSource={tasks}
        columns={columns}
        loading={loading}
      />
    </div>
  )
}

export default Tasks;