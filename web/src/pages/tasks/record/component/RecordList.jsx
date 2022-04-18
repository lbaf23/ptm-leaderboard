import {Button, Col, Divider, Drawer, Pagination, Row, Table} from "antd";
import {DownloadOutlined, LinkOutlined} from "@ant-design/icons"
import {useEffect, useImperativeHandle, useState} from "react";
import {useParams} from "react-router-dom";

import RecordBackend from "../../../../backend/RecordBackend";
import utils from '../../../utils/Utils'
import StatusTag from "./StatusTag";
import AttackResult from "../../component/AttackResult";


function RecordList(props) {
  const params = useParams()

  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState(100)

  const [loading, setLoading] = useState(true)

  const [showDrawer, setShowDrawer] = useState(false)
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
    if(showDrawer) {
      updateInfo(item.id)
    }
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
      render: (value, item) => (
        <>
          {item.status === 'pending' || item.status === 'running' || item.status === 'loading' ?
            <>---</>
            :
            <>{value}</>
          }
        </>
      )
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
        <>
          {item.status === 'pending' || item.status === 'running' || item.status === 'loading' ?
            <>---</>
            :
            <>{time}&nbsp;s</>
          }
        </>
      )
    },
    {
      title: 'Model Name',
      dataIndex: 'modelName',
      key: 'modelName',
    },
    {
      title: 'Link',
      dataIndex: 'fileUrl',
      key: 'fileUrl',
      render: (value, item) => (
        <>
          {item.mode === 'file' ?
            <a href={value} onClick={stopPop}><Button type="link" icon={<DownloadOutlined/>}/></a>
            :
            <a href={`https://huggingface.co/${value}`} onClick={stopPop}><Button type="link" icon={<LinkOutlined/>}/></a>
          }
        </>
      )
    },
  ]

  const handleClick = (item) => {
    setShowDrawer(true)
    updateInfo(item.id)
  }

  const updateInfo = (id) => {
    setDrawerLoading(true)
    RecordBackend.getRecord(id)
      .then(res=>{
        setDrawerLoading(false)
        let i = res.data.record;
        i.result = JSON.parse(i.result)
        setItem(i)
      })
      .catch(err=>{})
  }



  const handleClose = () => {
    setShowDrawer(false)
    setItem({})
  }

  return (
    <>
      <div>
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
      </div>

      <div>
        <Drawer
          title={
            <div style={{fontSize: '26px'}}>
              Score:&nbsp;&nbsp;
              {item.status === 'pending' || item.status === 'running' || item.status === 'loading' ?
                <>---</> : <>{item.score}</>
              }
              <span style={{float: 'right'}}>
                <StatusTag status={item.status} />
              </span>
            </div>
          }
          visible={showDrawer} onClose={handleClose}
          size="large"
        >
          <div>
            <div>
              <span style={{fontSize: '20px', fontWeight: '500'}}>{item.modelName}</span>
              <span style={{marginLeft: '20px'}}>
                {item.mode === 'file' ?
                  <a href={item.fileUrl}><Button icon={<DownloadOutlined />}>Download File</Button></a>
                  :
                  <a href={`https://huggingface.co/${item.fileUrl}`}><Button icon={<LinkOutlined />}>Go to Hugging Face Model</Button></a>
                }
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
                <div>
                  {item.status === 'pending' || item.status === 'loading' ?
                    <>---</>
                    :
                    <>{utils.TimeFilter(item.startedAt)}</>
                  }
                </div>
                <div>
                  {item.status === 'pending' || item.status === 'loading' || item.status === 'running' ?
                    <>---</>
                    :
                    <>{utils.TimeFilter(item.finishedAt)}</>
                  }
                </div>
                <div>
                  {item.status === 'pending' || item.status === 'loading' || item.status === 'running' ?
                    <>---</>
                    :
                    <>{item.runningTime} &nbsp;s</>
                  }
                </div>
              </Col>
            </Row>

            {item.status === 'succeed' ?
              <>
                <Divider>Attack Result</Divider>
                <AttackResult item={item}  />
              </> : null
            }

            <Divider>Message</Divider>
            <div style={{padding: '10px', backgroundColor: '#efefef'}}>{item.message}</div>
          </div>
        </Drawer>
      </div>
    </>
  )
}

export default RecordList
