import {useEffect, useState} from "react";
import {Button, Spin, Result} from "antd";
import {useLocation, useSearchParams} from "react-router-dom";


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
    <div style={{textAlign: 'center'}}>
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
    </div>
  )

}

export default Callback
