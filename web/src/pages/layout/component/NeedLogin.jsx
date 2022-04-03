import {Card} from "antd"

import "./needlogin.css"


function NeedLogin(obj) {
  return (
    <div className="need-login">
      <div className="title">
        Please Login First
      </div>
      <div onClick={obj.userLogin} className="login">
        L O G I N
      </div>
    </div>
  )
}

export default NeedLogin
