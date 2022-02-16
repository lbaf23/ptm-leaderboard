import {Table} from "antd";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import RecordBackend from "../../../../backend/RecordBackend";


function RecordList() {
  const params = useParams()

  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(20)
  const [total, setTotal] = useState(100)

  const [loading, setLoading] = useState(true)

  const [records, setRecords] = useState([])

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

  const handleClick = (e) => {
    console.log(e)
  }

  return (
    <>
      <Table
        dataSource={records}
        columns={columns}
        loading={loading}
        pagination={false}
        style={{overflow: 'auto'}}
        onClick={handleClick}
      />
    </>
  )
}

export default RecordList
