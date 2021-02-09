import React, { Component } from 'react';
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux"
import { withRouter } from "react-router-dom";
import { getCurrentUserProfile, updateUserProfile } from "../../redux/actions/profileActions";

import PopUpAlert from "../common/popUpAlert";
import "../../style/user-components/userProfile.scss";


class editUserProfile extends Component {
    constructor() {
        super();
        this.state = {
            password: '',
            city: '',
            adress: '',
            number: '',
            showAlert: false,
            errors: {}
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    };

    componentWillReceieveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    componentDidMount() {
        this.props.getCurrentUserProfile();
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const profileData = {
            password: this.state.password,
            city: this.state.city,
            adress: this.state.adress,
            number: this.state.number,
        }

        this.props.updateUserProfile(profileData, this.props.history);
    }

    alertHandler = () => {
        this.setState((prevState) => {
            return { showAlert: !prevState.showAlert };
        });
    }

    render() {
        const errors = this.props.errors;

        return (
            <div className="userprofile-container animated fadeIn" style={{ justifyContent: 'center', maxWidth: '600px' }}>
                <div className="naslov"><h1>Ažurirajte svoj profil</h1></div>
                <div className="leftcontainer" style={{ marginTop: '150px', backgroundColor: 'rgb(221, 221, 221)', overflow: 'hidden', borderRadius: '30px' }}>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative'
                        }}>
                        <img
                            style={{
                                height:
                                    '40px',
                                left: '0',
                                marginLeft: '20px',
                                position: 'absolute'
                            }}
                            alt="slika"
                            src={require("../../assets/icons/info.png")}>
                        </img>
                        <h1>Osnovne informacije</h1>
                    </div>
                    <div className="linija"></div>
                    <form className="forma" onSubmit={this.onSubmit} style={{ borderBottomLeftRadius: '30px', borderBottomRightRadius: '30px' }}>
                        <div>
                            <label>Nova sifra:</label>
                            <input
                                type="password"
                                name="password"
                                className={classnames('profile-input', { 'profile-input-invalid': errors.password })}
                                value={this.state.password}
                                onChange={this.onChange}
                            />
                            {errors.password && (<label className="errorlabel">{errors.password}</label>)}
                        </div>
                        <div>
                            <label>Grad:</label>
                            <input
                                type="text"
                                name="city"
                                className={classnames('profile-input', { 'profile-input-invalid': errors.city })}
                                value={this.state.city}
                                onChange={this.onChange}
                            />
                            {errors.city && (<label className="errorlabel">{errors.city}</label>)}
                        </div>
                        <div>
                            <label>Adresa:</label>
                            <input
                                type="text"
                                name="adress"
                                className={classnames('profile-input', { 'profile-input-invalid': errors.adress })}
                                value={this.state.adress}
                                onChange={this.onChange}
                            />
                            {errors.city && (<label className="errorlabel">{errors.adress}</label>)}
                        </div>
                        <div>
                            <label>Broj:</label>
                            <input
                                type="number"
                                name="number"
                                className={classnames('profile-input', { 'profile-input-invalid': errors.number })}
                                value={this.state.number}
                                onChange={this.onChange}
                            />
                            {errors.number && (<label className="errorlabel">{errors.number}</label>)}
                        </div>
                        <button
                            name="submit"
                            type="submit"
                            className="profile-button"
                        ></button>
                        <button
                            type="button"
                            className="profile-delete-button"
                            onClick={this.alertHandler}
                        >Obrišite profil</button>
                    </form>
                </div>
                <PopUpAlert
                    show={this.state.showAlert}
                    naslov="Da li ste sigurni da želite obrisati vaš profil?"
                    role={this.props.auth.role}
                    close={this.alertHandler}
                ></PopUpAlert>
            </div >
        );
    }
}

editUserProfile.propTypes = {
    getCurrentUserProfile: PropTypes.func.isRequired,
    updateUserProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    profile: state.profile,
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps, { getCurrentUserProfile, updateUserProfile })(withRouter(editUserProfile));