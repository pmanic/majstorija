import React, { Component } from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  //   loginUser,
  //   loginRepairman,
  //   loginAdmin,
  logMeIn,
} from "../../redux/actions/authActions";

import Toolbar from "../toolbar/toolbar";
import Header from "../header/header";
import About from "../about/about";
import Footer from "../footer/footer";
import "../../style/login/login.scss";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (
      this.props.auth.isAuthenticated &&
      this.props.auth.role === "korisnik"
    ) {
      this.props.history.push("/user");
    } else if (
      this.props.auth.isAuthenticated &&
      this.props.auth.role === "majstor"
    ) {
      this.props.history.push("/repairman");
    } else if (
      this.props.auth.isAuthenticated &&
      this.props.auth.role === "admin"
    ) {
      this.props.history.push("/admin");
    }
  }

  componentWillReceiveProps(nextProps) {
    //Check if user is authenticated
    if (nextProps.auth.isAuthenticated && nextProps.auth.role === "korisnik") {
      this.props.history.push("/user");
    } else if (
      nextProps.auth.isAuthenticated &&
      nextProps.auth.role === "majstor"
    ) {
      this.props.history.push("/repairman");
    } else if (
      nextProps.auth.isAuthenticated &&
      nextProps.auth.role === "admin"
    ) {
      this.props.history.push("/admin");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const userData = {
      username: this.state.username,
      password: this.state.password,
    };

    //this.props.loginUser(userData); // Ovo ce pozvati action loginUser
    //this.props.loginRepairman(userData);
    //this.props.loginAdmin(userData);
    this.props.logMeIn(userData);
  }

  closeBackgroudScroll = () => {
    document.body.style.overflow = "hidden";
  };

  render() {
    const { errors } = this.state;

    this.closeBackgroudScroll();
    return (
      <div>
        <Toolbar></Toolbar>
        <Header></Header>
        <About></About>
        <Footer></Footer>

        <div className="pozadina">
          <div className="login animated slideInUp">
            <Link to="/">
              <img
                className="close"
                alt="slika"
                src={require("../../assets/icons/close.png")}
              ></img>
            </Link>
            <div className="login-naslov">
              <h1>Prijavite se</h1>
              <div className="linija"></div>
            </div>
            <form className="login-forma" onSubmit={this.onSubmit}>
              <input
                type="text"
                name="username"
                className={classnames("login-input", {
                  "login-input-invalid": errors.username,
                })}
                placeholder="Korisničko ime"
                value={this.state.username}
                onChange={this.onChange}
              />
              {errors.username && (
                <label className="errorlabel">{errors.username}</label>
              )}

              <input
                type="password"
                name="password"
                className={classnames("login-input", {
                  "login-input-invalid": errors.password,
                })}
                placeholder="Lozinka"
                value={this.state.password}
                onChange={this.onChange}
              />
              {errors.password && (
                <label className="errorlabel">{errors.password}</label>
              )}

              <button name="submit" type="submit" className="login-button">
                Prijavite se
              </button>

              <label>
                Nemate nalog? <Link to="/register">Registrujte se</Link>
              </label>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  //loginUser: PropTypes.func.isRequired,
  //loginRepairman: PropTypes.func.isRequired,
  //loginAdmin: PropTypes.func.isRequired,
  logMeIn: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, {
  //loginUser,
  //loginRepairman,
  //loginAdmin,
  logMeIn,
})(Login); //loginUser je funkcija iz actions
