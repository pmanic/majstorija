import React from 'react';
import "../../style/header/header.scss";

class Header extends React.Component {
    render() {
        return (
            <div className="header">
                <div className="header-pic">
                    <img className="header-pic" alt="slika" src={require("../../assets/slika3.jpg")}></img>
                </div>
                <div className="header-tekst">
                    <h1>Dobrodošli na portal Majstorija</h1>
                    <h3>Klikni i popravi - na probleme zaboravi</h3>
                    <div className="animated bounce delay-1s infinite slower">
                        <a href="#about">
                            <img className="double-arrow" alt="slika" src={require("../../assets/doublearrow.png")} style={{ width: "64px" }}></img>
                        </a>
                    </div>
                </div>

            </div>
        );
    }
}

export default Header;