import logo from '../assets/logo.svg'
import './index.css'
import './loaders.css'

function Loading() {
  return (
    <div
      style={{
        width: '100wh',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f1f2f5'
      }}
    >
      <div style={{textAlign: 'center'}}>
        <img src={logo} alt={"loading"}/>
        <div style={{marginTop: '40px'}}>
          <div className="ball-pulse-sync">
            <div className="ball"/>
            <div className="ball"/>
            <div className="ball"/>
            <div className="ball"/>
            <div className="ball"/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Loading
