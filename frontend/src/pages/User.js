import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../redux/actions/authActions";
import { clearCurrentProfile, getCurrentUserProfile } from "../redux/actions/profileActions";
import { getAllKategorije } from "../redux/actions/categoriesActions";
import { Route, Link, Switch } from "react-router-dom";
import classnames from "classnames";
import PropTypes from "prop-types";

import PrivateRoute from "../components/common/PrivateRoute";

import SearchRepairman from "../components/user-components/searchRepairman";
import HistoryOfConnections from "../components/user-components/historyOfConnections";
import AcceptedReq from "../components/user-components/acceptedReq";
import DeclinedReq from "../components/user-components/declinedReq";
import SentReq from "../components/user-components/sentReq";
import editUserProfile from "../components/user-components/editUserProfile";
import DrawerBurgerButton from "../components/toolbar/drawerBurgerButton";

import "../style/User.scss";

class User extends Component {
    constructor() {
        super();
        this.state = {
        };
    }

    componentDidMount() {
        if (!this.props.auth.isAuthenticated || this.props.auth.role !== 'korisnik') {
            this.props.history.push("/autherror");
        }
        else {
            this.props.getCurrentUserProfile();
            this.props.getAllKategorije();
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
                        {this.props.auth.user.gender === "M" ? <img className="avatar" alt="slika" src={require("../assets/icons/user.png")}></img> : <img className="avatar" alt="slika" src={require("../assets/icons/user-female.png")}></img>}
                        <Link to="/user/editprofile"><img className="edit" alt="slika" src={require("../assets/icons/edit.png")}></img></Link>
                        <div className="user-name-container">
                            <b name="user-name" className="user-name">{this.props.auth.user.username}</b>
                            <p name="user-type" className="user-type">korisnik</p>
                        </div>
                        <nav className="user-navbar">
                            <ul>
                                <li>
                                    <Link to="/user/search"><div className={classnames('menubutton', { 'clicked': trenutniUrl === "http://localhost:3000/user/search" })}><img alt="slika" className="navicon" src={require("../assets/icons/search.png")}></img>Pretražite majstora</div></Link>
                                    <Link to="/user/history"><div className={classnames('menubutton', { 'clicked': trenutniUrl === "http://localhost:3000/user/history" })}><img alt="slika" className="navicon" src={require("../assets/icons/history.png")}></img>Istorija konekcija</div></Link>
                                    <Link to="/user/accepted"><div className={classnames('menubutton', { 'clicked': trenutniUrl === "http://localhost:3000/user/accepted" })}><img alt="slika" className="navicon" src={require("../assets/icons/done.png")}></img>Odobreni zahtevi</div></Link>
                                    <Link to="/user/declined"><div className={classnames('menubutton', { 'clicked': trenutniUrl === "http://localhost:3000/user/declined" })}><img alt="slika" className="navicon" src={require("../assets/icons/close.png")}></img>Odbijeni zahtevi</div></Link>
                                    <Link to="/user/sent"><div className={classnames('menubutton', { 'clicked': trenutniUrl === "http://localhost:3000/user/sent" })}><img alt="slika" className="navicon" src={require("../assets/icons/wait.png")}></img>Zahtevi na čekanju</div></Link>
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
                        <img className="avatar" alt="slika" src={require("../assets/icons/user.png")}></img>
                        <img className="edit" alt="slika" src={require("../assets/icons/edit.png")}></img>


                    </div>
                    <div className="main-container">
                        <Route path="/user/" exact render={() =>
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
                            <PrivateRoute path="/user/search" component={SearchRepairman} />
                            <PrivateRoute path="/user/history" component={HistoryOfConnections} />
                            <PrivateRoute path="/user/accepted" component={AcceptedReq} />
                            <PrivateRoute path="/user/declined" component={DeclinedReq} />
                            <PrivateRoute path="/user/editprofile" component={editUserProfile} />
                            <PrivateRoute path="/user/sent" component={SentReq} />
                        </Switch>
                    </div>
                </div>
            </div>
        );

        return (
            <div>
                {isAuthenticated ? authLink : this.componentDidMount()}
            </div>
        );
    }
}

User.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    getCurrentUserProfile: PropTypes.func.isRequired,
    getAllKategorije: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile
})


export default connect(mapStateToProps, { logoutUser, clearCurrentProfile, getCurrentUserProfile, getAllKategorije })(withRouter(User));

