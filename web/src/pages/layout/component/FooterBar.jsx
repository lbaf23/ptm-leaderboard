import React from "react";

import './footerbar.css'

class FooterBar extends React.PureComponent {
    render(){
        return (
            <div className="footer-bar">
                <span className="title">PTM-Leaderboard</span>
                <span className="right">
                    <span className="right-span">About</span>
                    <span className="right-span">Contact</span>
                </span>
            </div>
        )
    }
}

export default FooterBar