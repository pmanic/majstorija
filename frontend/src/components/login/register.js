import React, { Component } from 'react';
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import classnames from "classnames";
import { registerUser, registerRepairman } from "../../redux/actions/authActions";
import { getAllKategorije } from "../../redux/actions/categoriesActions";

import Toolbar from "../toolbar/toolbar";
import Header from "../header/header";
import About from "../about/about";
import Footer from "../footer/footer";
import "../../style/login/login.scss";
import "../../style/login/register.scss";

class Register extends Component {
    constructor() {
        super();
        this.state = {
            tipMajstor: false,
            username: '',
            password: '',
            email: '',
            name: '',
            surname: '',
            role: '',
            category: '',
            hourbill: '',
            city: '',
            adress: '',
            number: '',
            gender: '',
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        this.props.getAllKategorije();

        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/user");
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
            name: this.state.name,
            surname: this.state.surname,
            city: this.state.city,
            adress: this.state.adress,
            number: this.state.number,
            gender: this.state.gender,
            role: this.state.role
        }
        const newRepairman = {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
            name: this.state.name,
            surname: this.state.surname,
            category: this.state.category,
            hourbill: this.state.hourbill,
            city: this.state.city,
            adress: this.state.adress,
            number: this.state.number,
            gender: this.state.gender,
            role: this.state.role,
        }

        if (newRepairman.category === '') { newRepairman.category = 'Bez kategorije' }

        if (this.state.role === 'korisnik') {
            this.props.registerUser(newUser, this.props.history);
        }
        else if (this.state.role === 'majstor') {
            this.props.registerRepairman(newRepairman, this.props.history);
        }
        else {
            this.props.registerUser(newUser, this.props.history);
        }
    }

    majstorHandler = () => {
        this.setState({ tipMajstor: true });
    }

    majstorHandler2 = () => {
        this.setState({ tipMajstor: false });
    }

    closeBackgroudScroll = () => {
        document.body.style.overflow = 'hidden';
    }

    render() {
        const { errors } = this.state;

        let kategorija;
        let satnica;
        if (this.state.tipMajstor) {
            kategorija = ([
                <div className="kategorija">
                    <label className="label">Kategorija:</label>
                    <select
                        type="select"
                        name="category"
                        className="select-input"
                        placeholder="Kategorija"
                        value={this.state.category}
                        onChange={this.onChange}
                    >
                        <option defaultvalue="Bez kategorije">Bez kategorije</option>
                        {this.props.kategorije.kategorije.map(kategorija => {
                            return <option value={kategorija.categoryTitle}>{kategorija.categoryTitle}</option>
                        })}
                    </select>
                </div>
            ]);
            satnica = ([
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <input
                        type="number"
                        name="hourbill"
                        className={classnames('login-input', { 'login-input-invalid': errors.hourbill })}
                        placeholder="Satnica (€)"
                        value={this.state.hourbill}
                        onChange={this.onChange}
                    />
                    {errors.hourbill && (<label className="errorlabel">{errors.hourbill}</label>)}
                </div>
            ]);
        }
        this.closeBackgroudScroll();
        return (
            <div>
                <Toolbar></Toolbar>
                <Header></Header>
                <About></About>
                <Footer></Footer>
                <div className="pozadina">
                    <form className="login animated slideInUp" onSubmit={this.onSubmit}>
                        <Link to="/">
                            <img
                                className="close"
                                alt="slika"
                                src={require("../../assets/icons/close.png")}
                                onClick={this.props.close}
                            ></img>
                        </Link>
                        <div className="login-naslov">
                            <h1>Registrujte se</h1>
                            <div className="linija" style={{ marginBottom: '40px' }}></div>
                        </div>
                        <div className="login-forma">

                            {/* ----------------------------------------------USERNAME------------------------------------------ */}
                            <input
                                type="text"
                                name="username"
                                className={classnames('login-input', { 'login-input-invalid': errors.username })}
                                placeholder="Korisničko ime"
                                value={this.state.username}
                                onChange={this.onChange}
                            />
                            {errors.username && (<label className="errorlabel">{errors.username}</label>)}


                            {/* ----------------------------------------------PASSWORD------------------------------------------ */}
                            <input
                                type="password"
                                name="password"
                                className={classnames('login-input', { 'login-input-invalid': errors.password })}
                                placeholder="Šifra"
                                value={this.state.password}
                                onChange={this.onChange}
                            />
                            {errors.password && (<label className="errorlabel">{errors.password}</label>)}


                            {/* ----------------------------------------------EMAIL------------------------------------------ */}
                            <input
                                type="text"
                                name="email"
                                className={classnames('login-input', { 'login-input-invalid': errors.email })}
                                placeholder="E-mail"
                                value={this.state.email}
                                onChange={this.onChange}
                            />
                            {errors.email && (<label className="errorlabel">{errors.email}</label>)}

                            {/* ----------------------------------------------GENDER------------------------------------------ */}
                            <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '-15px' }}>
                                <label className="tip label">Pol:</label>
                                <input
                                    type="radio"
                                    name="gender"
                                    className="radio-input"
                                    value="M"
                                    onChange={this.onChange}
                                />
                                <label className="label">Muško</label>
                                <input
                                    type="radio"
                                    name="gender"
                                    className="radio-input"
                                    value="Ž"
                                    onChange={this.onChange}
                                />
                                <label className="label">Žensko</label>
                            </div>
                            {errors.gender && (<label className="errorlabel">{errors.gender}</label>)}


                            {/* ----------------------------------------------NAME------------------------------------------ */}
                            <input
                                type="text"
                                name="name"
                                className={classnames('login-input', { 'login-input-invalid': errors.name })}
                                placeholder="Ime"
                                value={this.state.name}
                                onChange={this.onChange}
                            />
                            {errors.name && (<label className="errorlabel">{errors.name}</label>)}


                            {/* ----------------------------------------------SURNAME------------------------------------------ */}
                            <input
                                type="text"
                                name="surname"
                                className={classnames('login-input', { 'login-input-invalid': errors.surname })}
                                placeholder="Prezime"
                                value={this.state.surname}
                                onChange={this.onChange}
                            />
                            {errors.surname && (<label className="errorlabel">{errors.surname}</label>)}


                            {/* ----------------------------------------------TYPEOFUSER------------------------------------------ */}
                            <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '-15px' }}>
                                <label className="tip label">Tip:</label>
                                <input
                                    type="radio"
                                    name="role"
                                    className="radio-input"
                                    onClick={this.majstorHandler2}
                                    value="korisnik"
                                    onChange={this.onChange}
                                />
                                <label className="label">Korisnik</label>
                                <input
                                    type="radio"
                                    name="role"
                                    className="radio-input"
                                    onClick={this.majstorHandler}
                                    value="majstor"
                                    onChange={this.onChange}
                                />
                                <label className="label">Majstor</label>
                            </div>
                            {errors.role && (<label className="errorlabel">{errors.role}</label>)}
                            {kategorija}
                            {satnica}


                            {/* ----------------------------------------------CITY------------------------------------------ */}
                            <input
                                type="text"
                                name="city"
                                className={classnames('login-input', { 'login-input-invalid': errors.city })}
                                placeholder="Grad"
                                value={this.state.city}
                                onChange={this.onChange}
                            />
                            {errors.city && (<label className="errorlabel">{errors.city}</label>)}


                            {/* ----------------------------------------------ADRESS------------------------------------------ */}
                            <input
                                type="text"
                                name="adress"
                                className={classnames('login-input', { 'login-input-invalid': errors.adress })}
                                placeholder="Adresa"
                                value={this.state.adress}
                                onChange={this.onChange}
                            />
                            {errors.adress && (<label className="errorlabel">{errors.adress}</label>)}


                            {/* ----------------------------------------------NUMBER------------------------------------------ */}
                            <input
                                type="number"
                                name="number"
                                className={classnames('login-input', { 'login-input-invalid': errors.adress })}
                                placeholder="Broj telefona"
                                value={this.state.number}
                                onChange={this.onChange}
                            />
                            {errors.number && (<label className="errorlabel">{errors.number}</label>)}


                            <button
                                name="submit"
                                type="submit"
                                className="login-button"
                                style={{ marginTop: '10px', marginBottom: '20px' }}>
                                Registruj se</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

Register.propTypes = {
    registerRepairman: PropTypes.func.isRequired,
    registerUser: PropTypes.func.isRequired,
    getAllKategorije: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    kategorije: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
    kategorije: state.kategorije
})

export default connect(mapStateToProps, { registerUser, registerRepairman, getAllKategorije })(withRouter(Register));