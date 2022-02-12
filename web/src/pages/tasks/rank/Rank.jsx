import React, {useEffect, useState} from "react";
import {Button, Table, Card} from "antd";
import {Link} from "react-router-dom";
import {ArrowRightOutlined} from "@ant-design/icons";

function Rank() {
  const columns = [
    {
      title: 'Rank',
      key: 'rank',
      render: (text, record, index) => {
        return `${page*pageSize + index +1}`
      }
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Model',
      dataIndex: 'model',
      key: 'model'
    },
    {
      title: 'Score',
      dataIndex: 'score',
      key: 'score'
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

  const [loading ,setLoading] = useState(true)
  const [rank, setRank] = useState([])
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(20);

  useEffect(()=>{
    setLoading(false)
    setRank([
      {id: '1', name: 'lbaf23', model: 'bert', score: '90.1'},
      {id: '1', name: 'lbaf23', model: 'bert', score: '90.1'},
      {id: '1', name: 'lbaf23', model: 'bert', score: '90.1'},
      {id: '1', name: 'lbaf23', model: 'bert', score: '90.1'},
      {id: '1', name: 'lbaf23', model: 'bert', score: '90.1'},
      {id: '1', name: 'lbaf23', model: 'bert', score: '90.1'},
      {id: '1', name: 'lbaf23', model: 'bert', score: '90.1'},
      {id: '1', name: 'lbaf23', model: 'bert', score: '90.1'},
      {id: '1', name: 'lbaf23', model: 'bert', score: '90.1'},
      {id: '1', name: 'lbaf23', model: 'bert', score: '90.1'},
      {id: '1', name: 'lbaf23', model: 'bert', score: '90.1'},
      {id: '1', name: 'lbaf23', model: 'bert', score: '90.1'},
      {id: '1', name: 'lbaf23', model: 'bert', score: '90.1'},
      {id: '1', name: 'lbaf23', model: 'bert', score: '90.1'},
      {id: '1', name: 'lbaf23', model: 'bert', score: '90.1'},
      {id: '1', name: 'lbaf23', model: 'bert', score: '90.1'},
      {id: '1', name: 'lbaf23', model: 'bert', score: '90.1'},
    ])
  }, [])
  
  return (
    <Card
      bordered={false}
      hoverable
    >
      <p style={{fontSize: '20px', textAlign: 'center', fontWeight: 'bold'}}>Rank</p>
      <Table
        dataSource={rank}
        columns={columns}
        loading={loading}
        pagination={false}
      />
    </Card>
  )
}

export default Rank;