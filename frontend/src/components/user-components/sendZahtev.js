import React, { Component } from 'react'
import PropTypes from "prop-types";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { sendZahtev } from "../../redux/actions/zahtevActions";
import moment from "moment";

import "../../style/login/login.scss";
import "../../style/popUpAlert.scss";

class SendZahtev extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scheduledDate: '',
            scheduledFrom: '',
            scheduledTo: '',
            userMessage: '',
            errors: {}
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceieveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    onSubmit(e) {
        e.preventDefault();

        const zahtevData = {
            scheduledDate: this.state.scheduledDate,
            scheduledFrom: this.state.scheduledFrom,
            scheduledTo: this.state.scheduledTo,
            userMessage: this.state.userMessage
        }

        this.props.sendZahtev(this.props.match.params.handle, zahtevData, this.props.history);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const errors = this.props.errors;
        const today = moment().format('YYYY-MM-DD');

        return (
            <div className='pozadina animated fadeIn'>
                <div
                    className='login animated fadeIn'
                    style={{
                        maxWidth: '450px',
                        marginTop: '5%',
                        boxShadow: '00px 30px 150px 10px rgba(0,0,0,0.7),0px 0px 0px 20px rgba(71,90,121,1)'
                    }}>
                    <Link to="/user/search">
                        <img
                            className="close"
                            alt="slika"
                            src={require("../../assets/icons/close.png")}
                            style={{
                                marginLeft: '390px',
                                height: '30px',
                            }}
                        ></img>
                    </Link>
                    <h1 className="popuptext" style={{ marginBottom: '0px' }}>Zahtev za popravku majstoru {this.props.match.params.handle}</h1>
                    <form className="forma login-forma" style={{ background: 'rgb(245,245,245)' }} onSubmit={this.onSubmit}>
                        <div>
                            <label>Zakažite datum:</label>
                            <input
                                type="date"
                                name="scheduledDate"
                                min={today}
                                className={classnames('profile-input', { 'profile-input-invalid': errors.scheduledDate })}
                                value={this.state.scheduledDate || ""}
                                onChange={this.onChange}
                            />
                            {errors.scheduledDate && (<label className="errorlabel">{errors.scheduledDate}</label>)}
                        </div>
                        <div>
                            <label>Zakažite od:</label>
                            <input
                                type="time"
                                name="scheduledFrom"
                                className={classnames('profile-input', { 'profile-input-invalid': errors.scheduledFrom })}
                                value={this.state.scheduledFrom || ""}
                                onChange={this.onChange}
                            />
                            {errors.scheduledFrom && (<label className="errorlabel">{errors.scheduledFrom}</label>)}
                        </div>
                        <div>
                            <label>Zakažite do:</label>
                            <input
                                type="time"
                                name="scheduledTo"
                                className={classnames('profile-input', { 'profile-input-invalid': errors.scheduledTo })}
                                value={this.state.scheduledTo || ""}
                                onChange={this.onChange}
                            />
                            {errors.scheduledTo && (<label className="errorlabel">{errors.scheduledTo}</label>)}
                        </div>
                        <div>
                            <label>Ukratko opišite vaš problem:</label>
                            <input
                                type="text"
                                name="userMessage"
                                className={classnames('login-input', { 'login-input-invalid': errors.userMessage })}
                                placeholder="Opis problema"
                                value={this.state.userMessage}
                                onChange={this.onChange}
                                style={{ height: '80px' }}
                            />
                            {errors.userMessage && (<label className="errorlabel">{errors.userMessage}</label>)}
                        </div>

                        <button
                            name="submit"
                            type="submit"
                            className={classnames('profile-button', { 'profile-button-invalid': (errors.scheduledDate || errors.scheduledFrom || errors.scheduledTo || errors.userMessage) })}
                            style={{ marginBottom: '20px' }}
                        >
                        </button>
                    </form>

                </div>
            </div>
        )
    }
}

SendZahtev.propTypes = {
    sendZahtev: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    errors: state.errors
})

export default connect(mapStateToProps, { sendZahtev })(withRouter(SendZahtev));


