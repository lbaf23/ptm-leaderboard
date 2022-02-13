import {Card, Table} from "antd";
import React, {useEffect, useState} from "react"

function Record() {
  const columns = [
    {
      title: 'Time',
      dataIndex: 'submitTime',
      key: 'submitTime',
    },
    {
      title: 'Task',
      dataIndex: 'task',
      key: 'task',
    },
    {
      title: 'Model',
      dataIndex: 'model',
      key: 'model',
    },
  ]

  const [loading, setLoading] = useState(true)
  const [records, setRecords] = useState([])
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(20);

  useEffect(() => {
    setLoading(false);
    setRecords([
      {task: 't1', model: 'bert', submitTime: '2020-1-12'},
      {task: 't1', model: 'bert', submitTime: '2020-1-11'},
      {task: 't1', model: 'bert', submitTime: '2020-1-10'},
      {task: 't1', model: 'bert', submitTime: '2020-1-9'},
      {task: 't1', model: 'bert', submitTime: '2020-1-8'},
      {task: 't1', model: 'bert', submitTime: '2020-1-7'},
      {task: 't1', model: 'bert', submitTime: '2020-1-6'},
      {task: 't1', model: 'bert', submitTime: '2020-1-5'},
      {task: 't1', model: 'bert', submitTime: '2020-1-4'},
      {task: 't1', model: 'bert', submitTime: '2020-1-3'},
      {task: 't1', model: 'bert', submitTime: '2020-1-2'},
      {task: 't1', model: 'bert', submitTime: '2020-1-1'},
      {task: 't1', model: 'bert', submitTime: '2020-1-1'},
      {task: 't1', model: 'bert', submitTime: '2020-1-1'},
      {task: 't1', model: 'bert', submitTime: '2020-1-1'},
      {task: 't1', model: 'bert', submitTime: '2020-1-1'},
      {task: 't1', model: 'bert', submitTime: '2020-1-1'},
      {task: 't1', model: 'bert', submitTime: '2020-1-1'},
      {task: 't1', model: 'bert', submitTime: '2020-1-1'},
      {task: 't1', model: 'bert', submitTime: '2020-1-1'},
    ])
  }, [])

  return (
    <Card
      bordered={false}
      hoverable
    >
      <p style={{fontSize: '20px', textAlign: 'center', fontWeight: 'bold'}}>My Record</p>
      <Table
        columns={columns}
        dataSource={records}
        loading={loading}
        pagination={false}
      />
    </Card>
  )
}

export default Record;
