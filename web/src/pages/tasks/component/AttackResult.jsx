import Tips from "./Tips";
import ReactJson from "react-json-view";
import ReactEcharts from "echarts-for-react";
import {useEffect, useState} from "react";

import saMd from "../../../assets/result/sa.md";

function AttackResult(props) {
  const [md, setMd] = useState('')
  const [option, setOption] = useState({})
  useEffect(()=>{
    initMd()
    initChart()
  }, [])

  const initMd = () => {
    fetch(saMd)
      .then(res=>res.text()).then((text)=>{
      setMd(text)
    })
  }

  const initChart = () => {
    let indicator = []
    let value = []
    for (let j=0; j<props.item.result.length; j++) {
      indicator.push({name: props.item.result[j]["attacker"], max: 100})
      value.push(100 - props.item.result[j]["result"]["Attack Success Rate"]*100)
    }

    setOption({
      title: {},
      tooltip: {},
      radar: {
        indicator: indicator
      },
      series: [
        {
          name: '',
          type: 'radar',
          data: [
            {
              value: value,
              name: 'Score'
            }
          ]
        }
      ]
    })
  }

  return (
    <>
      <Tips md={md} />
      <br/>
      <ReactJson
        name={false}
        src={props.item.result}
        displayDataTypes={false}
      />
      <ReactEcharts option={option} style={{height: '400px'}}/>
    </>
  )
}

export default AttackResult
