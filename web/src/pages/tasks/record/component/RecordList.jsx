import {Button, Divider, Drawer, Pagination, Table, Tag, Row, Col} from "antd";
import {DownloadOutlined,ReloadOutlined} from "@ant-design/icons"
import {useEffect, useImperativeHandle, useState} from "react";
import {useParams} from "react-router-dom";
import ReactJson from 'react-json-view'

import RecordBackend from "../../../../backend/RecordBackend";

import utils from '../../../utils/Utils'
import StatusTag from "./StatusTag";

function RecordList(props) {
  const params = useParams()

  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState(100)

  const [loading, setLoading] = useState(true)

  const [showInfo, setShowInfo] = useState(false)
  const [drawerLoading, setDrawerLoading] = useState(false)

  const [records, setRecords] = useState([])

  const [orderBy, setOrderBy] = useState('submitted_at')
  const [orderType, setOrderType] = useState('desc')

  const [item, setItem] = useState({})

  useEffect(() => {
    update()
  }, [])

  useImperativeHandle(props.onRef, () => ({
    update: update
  }))

  const update = () => {
    getRecords(page, pageSize, orderBy, orderType)
  }

  const getRecords = (page, pageSize, orderBy, orderType) => {
    setLoading(true)
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
  }

  const changePage = (page, pageSize) => {
    setPage(page)
    setPageSize(pageSize)
    getRecords(page, pageSize, orderBy, orderType);
  }

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
      <Pagination
        style={{marginTop: '20px', float: 'right'}}
        current={page}
        total={total}
        pageSize={pageSize}
        onChange={changePage}
      />

      <Drawer
        title={
          <div style={{fontSize: '26px'}}>
            Score:&nbsp;&nbsp;{item.score}
            <span style={{float: 'right'}}>
              <StatusTag status={item.status} />
            </span>
          </div>
        }
        visible={showInfo} onClose={handleClose}
        size="large"
      >

        <div>
          <span style={{fontSize: '20px', fontWeight: '500'}}>{item.modelName}</span>
          <span style={{marginLeft: '20px'}}>
            <a href={item.fileUrl}><Button icon={<DownloadOutlined />}>Download File</Button></a>
          </span>
        </div>

        <Divider>Time</Divider>

        <Row>
          <Col span={12}>
            <div>Submitted At</div>
            <div>Started At</div>
            <div>Finished At</div>
            <div>Running Time</div>
          </Col>
          <Col span={12}>
            <div>{utils.TimeFilter(item.submittedAt)}</div>
            <div>{utils.TimeFilter(item.startedAt)}</div>
            <div>{utils.TimeFilter(item.finishedAt)}</div>
            <div>{item.runningTime}&nbsp;s</div>
          </Col>
        </Row>

        <Divider>Attack Result</Divider>
        <ReactJson name={false} src={item.result} />

        <Divider>Message</Divider>
        <div style={{padding: '10px', backgroundColor: '#efefef'}}>{item.message}</div>
      </Drawer>
    </>
  )
}

export default RecordList
