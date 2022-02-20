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
  const [drawerLoading, setDrawerLoading] = useState(false)

  const [records, setRecords] = useState([])

  const [orderBy, setOrderBy] = useState('submitted_at')
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
      title: 'Submit',
      dataIndex: 'submittedAt',
      key: 'submittedAt',
      render: (time) => (
        <>{utils.TimeFilter(time)}</>
      )
    },
    {
      title: 'Running Time',
      dataIndex: 'runningTime',
      key: 'runningTime',
      render: (time, item) => (
        <>{time}&nbsp;s</>
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
    setShowInfo(true)
    setDrawerLoading(true)
    RecordBackend.getRecord(item.id)
    .then(res=>{
      let i = res.data.record;
      if (typeof(i.result) == "string") {
        i.result = JSON.parse(i.result)
      }
      setItem(i)
      setDrawerLoading(false)
    })
      .catch(err=>{})
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
          Score:&nbsp;&nbsp;{item.score}
          <span style={{float: 'right'}}>
            <StatusTag status={item.status} />
          </span>
        </div>
      } visible={showInfo} onClose={handleClose} >
        <h2>{item.modelName}</h2>
        <div>Start Time:&nbsp;&nbsp;{utils.TimeFilter(item.startedAt)}</div>

        <div>Finished Time:&nbsp;&nbsp;{utils.TimeFilter(item.finishedAt)}</div>
        <div>Running Time:&nbsp;{item.runningTime}&nbsp;s</div>

        <a href={item.fileUrl}><Button icon={<DownloadOutlined />}>Download File</Button></a>
        {item.status === 'succeed' ?
          <>
            <div>Result:</div>
            <Table
              dataSource={item.result}
              columns={[
                {title: 'transformation', dataIndex: 'trans', key: 'trans'},
                {title: 'score', dataIndex: 'score', key: 'score'}
              ]}
              pagination={false}
              style={{overflow: 'auto', marginTop: '20px'}}
            />
          </> : null
        }
        <div>message:&nbsp;{item.message}</div>
      </Drawer>
    </>
  )
}

export default RecordList
