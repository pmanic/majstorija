import React from 'react';
import DrawerBurgerButton from "./drawerBurgerButton";
import "../../style/toolbar/toolbar.scss";
import { Link } from "react-router-dom";

class toolbar extends React.Component {
    render() {
        return (
            <header className="toolbar">
                <nav className="toolbar-nav">
                    <div><DrawerBurgerButton click={this.props.drawerClickHandler} /></div>
                    <div className="toolbar-background"></div>
                    <div className="spacer1"></div>
                    <div><img className="toolbar-logo" src={require("../../assets/logo.png")} alt="logo"></img></div>
                    <div className="spacer"></div>
                    <div className="toolbar-nav-items">
                        <ul>
                            <li><Link to="/login"><button className="b1">Prijavite se</button></Link></li>
                            <li><Link to="/register"><button className="b2">Registrujte se</button></Link></li>
                        </ul>
                    </div>
                </nav>
            </header>
        );
    }
}

export default toolbar;

