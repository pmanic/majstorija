import React, { Component } from 'react';
import "../../style/footer/footer.scss";

class Footer extends Component {
    render() {
        return (
            <div className="footer-container">
                <div className="naslov"><h1>Majstorija spaja ljude</h1></div>
                <img className="footer-pic" alt="slika" src={require("../../assets/grad.jpg")}></img>
                <div className="footer">
                    <p className="tekst">Copyright 2020 © Mystore. All Rights Reserved</p>
                    <img className="footer-logo" alt="slika" src={require("../../assets/logo.png")}></img>
                </div>
            </div>
        );
    }
}

export default Footer;