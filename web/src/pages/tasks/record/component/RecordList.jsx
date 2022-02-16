import {Button, Drawer, Pagination, Table, Tag} from "antd";
import {DownloadOutlined} from "@ant-design/icons"
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import RecordBackend from "../../../../backend/RecordBackend";

import utils from '../../../utils/Utils'
import StatusTag from "./StatusTag";

function RecordList() {
  const params = useParams()

  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [total, setTotal] = useState(100)

  const [loading, setLoading] = useState(true)

  const [showInfo, setShowInfo] = useState(false)
  const [records, setRecords] = useState([])

  const [orderBy, setOrderBy] = useState('started_at')
  const [orderType, setOrderType] = useState('desc')

  const [item, setItem] = useState({})

  useEffect(() => {
    RecordBackend.getRecordList(params.id, page, pageSize, orderBy, orderType)
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

  const stopPop = (e) => {
    e.stopPropagation()
  }

  const columns = [
    {
      title: 'Score',
      dataIndex: 'score',
      key: 'score',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (item) => (
        <StatusTag status={item}/>
      )
    },
    {
      title: 'Start Time',
      dataIndex: 'startedAt',
      key: 'startedAt',
      render: (time) => (
        <div>{utils.TimeFilter(time)}</div>
      )
    },
    {
      title: 'Running Time',
      dataIndex: 'runningTime',
      key: 'runningTime',
      render: (time) => (
        <div>{utils.TimeFilter(time)}</div>
      )
    },
    {
      title: 'Model Name',
      dataIndex: 'modelName',
      key: 'modelName',
    },
    {
      title: 'File',
      dataIndex: 'fileUrl',
      key: 'fileUrl',
      render: (item) => (
        <a href={item} onClick={stopPop}><Button type="link" icon={<DownloadOutlined />} /></a>
      )
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
        <div style={{fontSize: '26px'}}>
          Score:&nbsp;&nbsp;{item.loading ? "-" : <>{item.score}</>}
          <span style={{float: 'right'}}>
            <StatusTag status={item.status} />
          </span>
        </div>
      } visible={showInfo} onClose={handleClose}>
        <div>SubmitTime:&nbsp;&nbsp;{item.createdAt}</div>
        <div>FinishedTime:&nbsp;&nbsp;{item.finishedAt}</div>
      </Drawer>
    </>
  )
}

export default RecordList
