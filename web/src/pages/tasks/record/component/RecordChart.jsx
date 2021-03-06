import ReactEcharts from 'echarts-for-react';
import {useEffect, useImperativeHandle, useState} from "react";
import {useParams} from "react-router-dom";

import RecordBackend from "../../../../backend/RecordBackend";


function RecordChart(props) {
  const params = useParams()

  const [loading, setLoading] = useState(false)
  const [option, setOption] = useState({})

  useEffect(()=>{
    getRecordData();
  }, [])

  useImperativeHandle(props.onRef, () => ({
    update: getRecordData
  }))

  const getRecordData = () => {
    RecordBackend.getRecordData(params.id )
      .then(res=>{
        if(res.data.code === 200) {
          let value = []
          for(let i=0; i<res.data.data.length; i++){
            value[i] = i;
          }
          initChart(value, res.data.data)
        }
      })
      .catch(e=>{})
  }

  const initChart = (value, data) => {
    setOption({
      title: {
        text: 'History Score'
      },
      tooltip: {},
      xAxis: {
        data: [],
      },
      yAxis: {},
      series: [
        {
          name: 'score',
          type: 'line',
          data: data,
          smooth: true
        }
      ]
    })
  }

  return (
    <div style={{marginTop: '100px'}}>
      <ReactEcharts option={option} style={{height: '400px'}}/>
    </div>
  )
}

export default RecordChart
