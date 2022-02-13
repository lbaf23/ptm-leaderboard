import {useEffect, useState} from "react";
import {Button, Spin, Result, Card} from "antd";
import {useLocation, useSearchParams} from "react-router-dom";

import './callback.css'

function Callback() {
  const search = useSearchParams()
  const [msg, setMsg] = useState('');

  useEffect(()=>{
    login();
  }, [])

  const login = () => {
    console.log(search)

  }
  return (
    <div className="callback">
      <Card hoverable className="card">
        <div className="title">PTM-Leaderboard</div>
        {
          (msg === '') ? (
            <Spin size="large" tip="登录中..." style={{paddingTop: "10%"}}/>
          ) : (
            <div style={{display: "inline"}}>
              <Result
                status="error"
                title="登录失败"
                subTitle={msg}
                extra={[
                  <Button type="primary" key="details">
                    信息
                  </Button>,
                  <Button key="help">帮助</Button>,
                ]}
              >
              </Result>
            </div>
          )
        }
      </Card>
    </div>
  )

}

export default Callback
