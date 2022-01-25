import {Button, Card, Space} from "antd";
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
      {id: '1', title: 'Aspect-Based Sentiment Analysis', metric: 'Accuracy'},
      {id: '2', title: 'Coreference Resolution', metric: 'Accuracy'},
      {id: '3', title: 'Dependency Parsing', metric: 'Accuracy'},
      {id: '4', title: 'Machine Reading Comprehension', metric: 'Accuracy'},
    ])
    setLoading(false);
  },[])
  return (
    <div>
      <p style={{fontSize: '20px', textAlign: 'center', fontWeight: 'bold'}}>Tasks</p>
      {tasks.map((item, index) => (
        <Link to={item.id}>
          <Card
            loading={loading}
            title={item.title}
            hoverable
            style={{
              marginTop: '20px'
            }}
          >
          </Card>
        </Link>
      ))}
    </div>
  )
}

export default Tasks;