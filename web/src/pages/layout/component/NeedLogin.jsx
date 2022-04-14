import {Card} from "antd"

import "./needlogin.css"


function NeedLogin(obj) {
  return (
    <div className="need-login">
      <div onClick={obj.userLogin} className="login">
        L&nbsp;&nbsp;
        O&nbsp;&nbsp;
        G&nbsp;&nbsp;
        I&nbsp;&nbsp;
        N
      </div>
    </div>
  )
}

export default NeedLogin
