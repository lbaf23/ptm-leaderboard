import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Divider, Drawer, Pagination, Table, Col, Row} from "antd";

import RankBackend from "../../../../backend/RankBackend";
import AttackResult from "../../component/AttackResult";


function RankList(props) {
  const params = useParams()

  const [ranks, setRanks] = useState([])
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [orderBy, setOrderBy] = useState('submitted_at')
  const [orderType, setOrderType] = useState('desc')
  const [total, setTotal] = useState(20)
  const [loading, setLoading] = useState(true)

  const [showD, setShowD] = useState(false)
  const [item, setItem] = useState({result: []})

  useEffect(() => {
    getRanks(page, pageSize, orderBy, orderType)
  }, [])

  const getRanks = (page, pageSize, orderBy, orderType) => {
    RankBackend.getRankList(params.id, page, pageSize)
      .then(res => {
        setLoading(false);
        if (res.data.code === 200) {
          setRanks(res.data.ranks)
          setTotal(res.data.total)
        }
      })
      .catch(err => {
      })
  }

  const changePage = (page, pageSize) => {
    setPage(page)
    setPageSize(pageSize)
    getRanks(page, pageSize, orderBy, orderType);
  }

  const handleClick = (item) => {
    let i = item;
    if (typeof(i.result) == "string") {
      i.result = JSON.parse(i.result)
    }
    setItem(i)
    setShowD(true)
  }

  const closeD = () => {
    setShowD(false)
    setItem({result: []})
  }

  const columns = [
    {
      title: 'Rank',
      key: 'rank',
      render: (text, record, index) => {
        return `${(page-1) * pageSize + index + 1}`
      }
    },
    {
      title: 'Name',
      dataIndex: 'userName',
      key: 'name',
    },
    {
      title: 'Model',
      dataIndex: 'modelName',
      key: 'model',
    },
    {
      title: 'Score',
      dataIndex: 'score',
      key: 'score',
    }
  ]

  return (
    <>
      <Table
        dataSource={ranks}
        columns={columns}
        loading={loading}
        pagination={false}
        style={{overflow: 'auto'}}
        onRow={item => {
          return {
            onClick: e => handleClick(item)
          }
        }}
      />
      <Pagination
        style={{marginTop: '20px', float: 'right'}}
        current={page}
        total={total}
        pageSize={pageSize}
        onChange={changePage}
      />
      <Drawer
        title={<div style={{fontSize: '26px'}}>Score:&nbsp;&nbsp;{item.score}</div>}
        visible={showD}
        onClose={closeD}
        size="large"
      >
        <div>
          <Row>
            <Col span={12}>
              <div>User Name:</div>
              <div>Model Name:</div>
            </Col>
            <Col span={12}>
              <div>{item.userName}</div>
              <div>{item.modelName}</div>
            </Col>
          </Row>
          <Divider>Attack Result</Divider>
          <AttackResult item={item} />
        </div>
      </Drawer>
    </>
  )
}

export default RankList
