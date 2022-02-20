import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Divider, Drawer, Pagination, Tag, Card} from "antd";

import RankBackend from "../../../../backend/RankBackend";

const {Table} = require("antd");


function RankList(obj) {
  const params = useParams()

  const [ranks, setRanks] = useState([])
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [total, setTotal] = useState(20)
  const [loading, setLoading] = useState(true)

  const [showD, setShowD] = useState(false)
  const [item, setItem] = useState({result: []})

  useEffect(() => {
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
  }, [])

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
      <Pagination style={{marginTop: '20px', float: 'right'}} current={page} total={total} pageSize={pageSize}/>
      <Drawer title={<div style={{fontSize: '26px'}}>Score:&nbsp;&nbsp;{item.score}</div>} visible={showD} onClose={closeD}>
        <div>
          <div style={{fontSize: '18px', fontWeight: '500'}}>
            <span>{item.userName}</span>
            <Divider type="vertical" style={{borderWidth: '2px', height: '25px', borderColor: '#c9c9c9'}}/>
            <span>{item.modelName}</span>
          </div>

          <Table
            dataSource={item.result}
            columns={[
              {title: 'transformation', dataIndex: 'trans', key: 'trans'},
              {title: 'score', dataIndex: 'score', key: 'score'}
            ]}
            pagination={false}
            style={{overflow: 'auto', marginTop: '20px'}}
          />
        </div>
      </Drawer>
    </>
  )
}

export default RankList
