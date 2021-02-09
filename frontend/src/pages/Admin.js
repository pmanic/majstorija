import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../redux/actions/authActions";
import { Route, Link, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import classnames from "classnames";

import PrivateRoute from "../components/common/PrivateRoute";

import { clearCurrentProfile } from "../redux/actions/profileActions";
import Zahtevi from "../components/admin-components/zahtevi";
import ListOfUsers from "../components/admin-components/listOfUsers";
import ListOfRepairmans from "../components/admin-components/listofRepairmans";
import AllConnections from "../components/admin-components/allConnections";
import DrawerBurgerButton from "../components/toolbar/drawerBurgerButton";
import "../style/User.scss";

class Admin extends Component {
    state = {
    };

    componentDidMount() {
        if (!this.props.auth.isAuthenticated || this.props.auth.role !== 'admin') {
            this.props.history.push("/autherror");
        }
        else {
            //this.props.getCurrentProfile();
        }
    }

    onLogoutClick(e) {
        e.preventDefault();
        this.props.clearCurrentProfile();
        this.props.logoutUser();
        this.props.history.push("/");
    }

    render() {
        const { isAuthenticated } = this.props.auth;
        const trenutniUrl = window.location.href;

        const authLink = (
            <div className="user-page">
                <div className="user-page-container">
                    <div className="side-navbar">
                        <img className="avatar" alt="slika" src={require("../assets/icons/admin.png")}></img>
                        <div className="user-name-container">
                            <b name="user-name" className="user-name">{this.props.auth.user.username}</b>
                            <p name="user-type" className="user-type">Administrator</p>
                        </div>
                        <nav className="user-navbar">
                            <ul>
                                <li>
                                    <Link to="/admin/listofusers"><div className={classnames('menubutton', { 'clicked': trenutniUrl === "http://localhost:3000/admin/listofusers" })}><img alt="slika" className="navicon" src={require("../assets/icons/list.png")}></img>Lista korisnika</div></Link>
                                    <Link to="/admin/listofrepairmans"> <div className={classnames('menubutton', { 'clicked': trenutniUrl === "http://localhost:3000/admin/listofrepairmans" })}><img alt="slika" className="navicon" src={require("../assets/icons/list.png")}></img>Lista majstora</div></Link>
                                    <Link to="/admin/allconnections"> <div className={classnames('menubutton', { 'clicked': trenutniUrl === "http://localhost:3000/admin/allconnections" })}><img alt="slika" className="navicon" src={require("../assets/icons/handshake.png")}></img>Konekcije</div></Link>
                                    <Link to="/admin/zahtevi"><div className={classnames('menubutton', { 'clicked': trenutniUrl === "http://localhost:3000/admin/zahtevi" })}><img alt="slika" className="navicon" src={require("../assets/icons/request.png")}></img>Zahtevi</div></Link>
                                    <button onClick={this.onLogoutClick.bind(this)} className="logout-button">Odjavite se</button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div className="top-navbar">
                        <DrawerBurgerButton click={this.props.drawerClickHandler}></DrawerBurgerButton>
                        <div className="spacer"></div>
                        <div className="user-name-container">
                            <p name="user-name" className="user-name">{this.props.auth.user.username}</p>
                        </div>
                        <img className="avatar" alt="slika" src={require("../assets/icons/admin.png")}></img>
                    </div>
                    <div className="main-container">
                        <Route path="/admin/" exact render={() =>
                            <div
                                className='animated fadeIn'
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: '100vh'
                                }}>
                                <h1
                                    style={{
                                        color: 'rgba(31, 41, 68,1)',
                                        fontSize: '45px'
                                    }}>
                                    Dobrodošli nazad {this.props.auth.user.username}!
                                        </h1>
                                <img
                                    className="logo"
                                    alt="slika"
                                    style={{ height: '60px' }}
                                    src={require("../assets/logo.png")}>
                                </img>
                            </div>}
                        ></Route>
                        <Switch>
                            <PrivateRoute path="/admin/listofusers" component={ListOfUsers} />
                            <PrivateRoute path="/admin/listofrepairmans" component={ListOfRepairmans} />
                            <PrivateRoute path="/admin/allconnections" component={AllConnections} />
                            <PrivateRoute path="/admin/zahtevi" component={Zahtevi} />
                        </Switch>
                    </div>
                </div >
            </div >
        )

        return (
            <div>
                {isAuthenticated ? authLink : this.componentDidMount()}
            </div>
        );
    }
}

Admin.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(withRouter(Admin));