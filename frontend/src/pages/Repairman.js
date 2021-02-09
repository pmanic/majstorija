import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../redux/actions/authActions";
import {
  clearCurrentProfile,
  getCurrentRepairmanProfile,
  getCurrentRepairmanNotifications,
} from "../redux/actions/profileActions";
import { Route, Link, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import classnames from "classnames";

import PrivateRoute from "../components/common/PrivateRoute";
import Planer from "../components/repairman-components/planer";

import DrawerBurgerButton from "../components/toolbar/drawerBurgerButton";
import editRepairmanProfile from "../components/repairman-components/profil/editRepairmanProfile";
import NewZahtev from "../components/repairman-components/zahtevi/newZahtevList";
import ArchivedZahtev from "../components/repairman-components/zahtevi/archivedZahtevList";
import AcceptedZahtev from "../components/repairman-components/zahtevi/acceptedZahtevList";
import RatingList from "../components/repairman-components/ratingList";

import NotificationsList from "../components/repairman-components/notifications/notificationsList";
import "../style/User.scss";

class Repairman extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    if (
      !this.props.auth.isAuthenticated ||
      this.props.auth.role !== "majstor"
    ) {
      this.props.history.push("/autherror");
    } else {
      this.props.getCurrentRepairmanProfile();
      this.props.getCurrentRepairmanNotifications();
    }
  }

  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
    this.props.history.push("/");
  }

  getNotifications() {
    console.log(this.props);
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    const trenutniUrl = window.location.href;

    const authLink = (
      <div className="user-page">
        <div className="user-page-container">
          <div className="side-navbar">
            {this.props.auth.user.gender === "M" ? (
              <img
                className="avatar"
                alt="slika"
                src={require("../assets/icons/repairman.png")}
              ></img>
            ) : (
              <img
                className="avatar"
                alt="slika"
                src={require("../assets/icons/repairman-female.png")}
              ></img>
            )}
            <Link
              to={`/repairman/repairmanprofile/${this.props.auth.user.username}`}
            >
              <img
                className="edit"
                alt="slika"
                src={require("../assets/icons/lookprofile.png")}
                style={{ marginLeft: "-115px", height: "23px" }}
              ></img>
            </Link>
            <Link to="/repairman/editprofile">
              <img
                className="edit"
                alt="slika"
                src={require("../assets/icons/edit.png")}
              ></img>
            </Link>
            <div className="user-name-container">
              <b name="user-name" className="user-name">
                {this.props.auth.user.username}
              </b>
              <p name="user-type" className="user-type">
                Majstor
              </p>
            </div>
            <nav className="user-navbar">
              <ul>
                <li>
                  <Link to="/repairman/newreq">
                    <div
                      className={classnames("menubutton", {
                        clicked:
                          trenutniUrl ===
                          "http://localhost:3000/repairman/newreq",
                      })}
                    >
                      <img
                        alt="slika"
                        className="navicon"
                        src={require("../assets/icons/new.png")}
                      ></img>
                      Novi zahtevi
                    </div>
                  </Link>
                  <Link to="/repairman/acceptedreq">
                    <div
                      className={classnames("menubutton", {
                        clicked:
                          trenutniUrl ===
                          "http://localhost:3000/repairman/acceptedreq",
                      })}
                    >
                      <img
                        className="navicon"
                        alt="slika"
                        src={require("../assets/icons/done.png")}
                      ></img>
                      Prihvaćeni zahtevi
                    </div>
                  </Link>
                  <Link to="/repairman/archivedreq">
                    <div
                      className={classnames("menubutton", {
                        clicked:
                          trenutniUrl ===
                          "http://localhost:3000/repairman/archivedreq",
                      })}
                    >
                      <img
                        className="navicon"
                        alt="slika"
                        src={require("../assets/icons/history.png")}
                      ></img>
                      Arhivirani zahtevi
                    </div>
                  </Link>
                  <Link to="/repairman/rating">
                    <div
                      className={classnames("menubutton", {
                        clicked:
                          trenutniUrl ===
                          "http://localhost:3000/repairman/rating",
                      })}
                    >
                      <img
                        className="navicon"
                        alt="slika"
                        src={require("../assets/icons/grade.png")}
                      ></img>
                      Ocene
                    </div>
                  </Link>
                  <Link to="/repairman/planer">
                    <div
                      className={classnames("menubutton", {
                        clicked:
                          trenutniUrl ===
                          "http://localhost:3000/repairman/planer",
                      })}
                    >
                      <img
                        className="navicon"
                        alt="slika"
                        src={require("../assets/icons/calendar.png")}
                      ></img>
                      Planer
                    </div>
                  </Link>
                  <button
                    onClick={this.onLogoutClick.bind(this)}
                    className="logout-button"
                  >
                    Odjavite se
                  </button>
                </li>
              </ul>
            </nav>
          </div>
          <div className="top-navbar">
            <DrawerBurgerButton
              click={this.props.drawerClickHandler}
            ></DrawerBurgerButton>
            <div className="spacer"></div>
            <div className="user-name-container">
              <p name="user-name" className="user-name">
                {this.props.auth.user.username}
              </p>
            </div>
            {this.props.auth.user.gender === "M" ? (
              <img
                className="avatar"
                alt="slika"
                src={require("../assets/icons/repairman.png")}
              ></img>
            ) : (
              <img
                className="avatar"
                alt="slika"
                src={require("../assets/icons/repairman-female.png")}
              ></img>
            )}
            <Link to="/repairman/editprofile">
              <img
                className="edit"
                alt="slika"
                src={require("../assets/icons/edit.png")}
              ></img>
            </Link>
            <Link
              to={`/repairman/repairmanprofile/${this.props.auth.user.username}`}
            >
              <img
                className="edit"
                alt="slika"
                onClick={this.clickedHandler}
                src={require("../assets/icons/lookprofile.png")}
                style={{ height: "23px" }}
              ></img>
            </Link>
          </div>
          <div className="main-container">
            
            <NotificationsList></NotificationsList>
            <Route
              path="/repairman/"
              exact
              render={() => (
                <div
                  className="animated fadeIn"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100vh",
                  }}
                >
                  <h1
                    style={{
                      color: "rgba(31, 41, 68,1)",
                      fontSize: "45px",
                    }}
                  >
                    Dobrodošli nazad {this.props.auth.user.username}!
                  </h1>
                  <img
                    className="logo"
                    alt="slika"
                    style={{ height: "60px" }}
                    src={require("../assets/logo.png")}
                  ></img>
                </div>
              )}
            ></Route>
            <Switch>
              <PrivateRoute
                path="/repairman/editprofile"
                component={editRepairmanProfile}
              />
              <PrivateRoute path="/repairman/newreq" component={NewZahtev} />
              <PrivateRoute
                path="/repairman/archivedreq"
                component={ArchivedZahtev}
              />
              <PrivateRoute
                path="/repairman/acceptedreq"
                component={AcceptedZahtev}
              />
              <PrivateRoute path="/repairman/rating" component={RatingList} />
              <PrivateRoute path="/repairman/planer" component={Planer} />
            </Switch>
          </div>
        </div>
      </div>
    );

    return <div>{isAuthenticated ? authLink : this.componentDidMount()}</div>;
  }
}

Repairman.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  getCurrentRepairmanProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, {
  logoutUser,
  clearCurrentProfile,
  getCurrentRepairmanProfile,
  getCurrentRepairmanNotifications,
})(withRouter(Repairman));
