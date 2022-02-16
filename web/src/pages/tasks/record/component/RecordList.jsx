import {Drawer, Pagination, Table, Tag} from "antd";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import RecordBackend from "../../../../backend/RecordBackend";

import utils from '../../../utils/Utils'

function RecordList() {
  const params = useParams()

  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [total, setTotal] = useState(100)

  const [loading, setLoading] = useState(true)

  const [showInfo, setShowInfo] = useState(false)
  const [records, setRecords] = useState([])

  const [item, setItem] = useState({})

  useEffect(() => {
    RecordBackend.getRecordList(params.id, page, pageSize)
      .then(res => {
        setLoading(false)
        if (res.data.code === 200) {
          setTotal(res.data.total)
          setRecords(res.data.records)
        }
      })
      .catch(err => {
      })
  }, [])

  const columns = [
    {
      title: 'Time',
      dataIndex: 'createdAt',
      key: 'time',
      render: (time) => (
        <div>{utils.TimeFilter(time)}</div>
      )
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
    },

    {
      title: 'File',
      dataIndex: 'file',
      key: 'file',
    },
  ]

  const handleClick = (item) => {
    setItem(item)
    setShowInfo(true)
    console.log(item)
  }

  const handleClose = () => {
    setShowInfo(false)
    setItem({})
  }

  return (
    <>
      <Table
        dataSource={records}
        columns={columns}
        loading={loading}
        pagination={false}
        style={{overflow: 'auto'}}
        onRow={item=>{
          return {
            onClick: e => handleClick(item)
          }
        }}
      />
      <Pagination style={{marginTop: '20px', float: 'right'}} current={page} total={total} pageSize={pageSize}/>
      <Drawer title={
        <div style={{fontSize: '30px'}}>
          Score:&nbsp;&nbsp;{item.score}
          <Tag>finished</Tag>
        </div>
      } visible={showInfo} onClose={handleClose}>
        <div>SubmitTime:&nbsp;&nbsp;{item.createdAt}</div>
        <div>FinishedTime:&nbsp;&nbsp;{item.finishedAt}</div>
      </Drawer>
    </>
  )
}

export default RecordList
