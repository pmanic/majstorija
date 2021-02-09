import React, { Component } from 'react'
import PropTypes from "prop-types";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { rateZahtev } from "../../redux/actions/zahtevActions";

import "../../style/login/login.scss";
import "../../style/popUpAlert.scss";

class RateZahtev extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ocena: "",
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
        const rate = this.state.ocena;

        this.props.rateZahtev(this.props.match.params.handle, rate, this.props.history);
    }

    onButtonClick(e) {
        e.preventDefault();

        this.setState({ ocena: e.target.value });
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const errors = this.props.errors;
        console.log(this.state.ocena);
        return (
            <div className='pozadina animated fadeIn'>
                <div
                    className='login animated fadeIn'
                    style={{
                        width: '450px',
                        marginTop: '5%',
                        boxShadow: '00px 30px 150px 10px rgba(0,0,0,0.7),0px 0px 0px 20px rgba(71,90,121,1)'
                    }}>
                    <Link to="/user/history">
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
                    <h1 className="popuptext" style={{ marginBottom: '0px' }}>Ocenite zahtev</h1>
                    <div className="buttonsHolder">
                        <button className={classnames('button', { 'clickedButton': (this.state.ocena === "1") })} name="ocena" value="1" onClick={e => this.onButtonClick(e)}>1</button>
                        <button className={classnames('button', { 'clickedButton': (this.state.ocena === "2") })} name="ocena" value="2" onClick={e => this.onButtonClick(e)} > 2</button>
                        <button className={classnames('button', { 'clickedButton': (this.state.ocena === "3") })} name="ocena" value="3" onClick={e => this.onButtonClick(e)} > 3</button>
                        <button className={classnames('button', { 'clickedButton': (this.state.ocena === "4") })} name="ocena" value="4" onClick={e => this.onButtonClick(e)} > 4</button>
                        <button className={classnames('button', { 'clickedButton': (this.state.ocena === "5") })} name="ocena" value="5" onClick={e => this.onButtonClick(e)} > 5</button>
                    </div>
                    {errors.rate && (<label className="errorlabel">{errors.rate}</label>)}
                    <button
                        name="submit"
                        type="submit"
                        onClick={this.onSubmit}
                        className={classnames('profile-button', { 'profile-button-invalid': (errors.rate) })}
                        style={{ marginBottom: '20px' }}
                    >
                    </button>

                </div>
            </div>
        )
    }
}

RateZahtev.propTypes = {
    rateZahtev: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    errors: state.errors
})

export default connect(mapStateToProps, { rateZahtev })(withRouter(RateZahtev));


