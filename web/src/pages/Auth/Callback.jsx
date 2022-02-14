import {useEffect, useState} from "react";
import {Button, Spin, Result, Card} from "antd";
import {useLocation, useSearchParams} from "react-router-dom";

import './callback.css'
import AuthBackend from "../../backend/AuthBackend";

const PUBLIC_URL = process.env.PUBLIC_URL

function Callback() {
  const [params] = useSearchParams()
  const [msg, setMsg] = useState('');

  useEffect(()=>{
    login();
  }, [])

  const login = () => {
    const code = params.get('code')
    const state = params.get("state")
    AuthBackend.login(code, state)
    .then((res)=>{
      if(res.data.code === 200) {
        window.location.href = `${PUBLIC_URL}/home`
      } else {
        setMsg(res.data.message);
      }
    })
    .catch(err=>{
      console.log(err)
    })
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
