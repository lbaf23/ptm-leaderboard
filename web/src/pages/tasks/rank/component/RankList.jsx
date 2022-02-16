import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import RankBackend from "../../../../backend/RankBackend";

const { Table } = require("antd");



function RankList(obj) {
    const params = useParams()

    const [ranks, setRanks] = useState([
        {userName: 'user2', modelName: 'mmm', score: 92, result: '90,91,92'},
        {userName: 'user1', modelName: 'mmm', score: 91, result: '90,91,92'},
        {userName: 'user3', modelName: 'mmm', score: 90.8, result: '90,91,92'},
        {userName: 'user4', modelName: 'mmm', score: 90.6, result: '90,91,92'},
        {userName: 'user5', modelName: 'mmm', score: 90.4, result: '90,91,92'},
        {userName: 'user6', modelName: 'mmm', score: 90.3, result: '90,91,92'},
        {userName: 'user7', modelName: 'mmm', score: 90.1, result: '90,91,92'}
    ])
    const [page, setPage] = useState(0)
    const [pageSize, setPageSize] = useState(20)
    const [total, setTotal] = useState(20)
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        RankBackend.getRankList(params.id, page, pageSize)
        .then(res=>{
            setLoading(false);
            if (res.data.code === 200) {
                setRanks(res.data.ranks)
                setTotal(res.data.count)
            }
        })
        .catch(err=>{})
    }, [])

    const tableColumns = () => {
        const columns = [
          {
            title: 'Rank',
            key: 'rank',
            render: (text, record, index) => {
              return `${page * pageSize + index + 1}`
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
        return columns
      }

    return (
    <>
        <Table
            dataSource={ranks}
            columns={tableColumns()}
            loading={loading}
            pagination={false}
            style={{overflow: 'auto'}}
      />
    </>
    )
}

export default RankList