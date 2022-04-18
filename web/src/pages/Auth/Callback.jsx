import {useEffect} from "react";
import {message} from "antd";
import {useSearchParams} from "react-router-dom";

import './callback.css'
import AuthBackend from "../../backend/AuthBackend";
import Loading from "../Loading";

const PUBLIC_URL = process.env.PUBLIC_URL

function Callback() {
  const [params] = useSearchParams()

  useEffect(()=>{
    login();
  }, [])

  const login = () => {
    const code = params.get('code')
    const state = params.get("state")
    AuthBackend.login(code, state)
    .then((res)=>{
      if(res.data.code === 200) {
        localStorage.setItem("token", res.data.account.accessToken)
        const url = localStorage.getItem("url")
        if (url === "" || url === undefined || url === null) {
          window.location.href = `${PUBLIC_URL}/home`
        } else {
          window.location.href = url
        }
      } else {
        message.error(res.data.message);
      }
    })
    .catch(err=>{
      console.log(err)
    })
  }
  return (
    <Loading />
  )

}

export default Callback
