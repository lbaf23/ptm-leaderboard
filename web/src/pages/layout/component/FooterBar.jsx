import React from "react";
import { Link } from "react-router-dom"

import './footerbar.css'

function FooterBar() {
  return (
    <div className="footer-bar">
      <span className="title">PTM-Leaderboard</span>
      <span className="right">
        <span className="right-span">
          <a href="https://github.com/lbaf23/ptm-leaderboard">About</a>
        </span>
        <span className="right-span">
          <a href="https://github.com/lbaf23/ptm-leaderboard">GitHub</a>
        </span>
      </span>
    </div>
  )
}

export default FooterBar
