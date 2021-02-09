import React, { Component } from 'react'
import PropTypes from "prop-types";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { acceptZahtevById, declineZahtevById } from "../../../redux/actions/zahtevActions";

import "../../../style/login/login.scss";
import "../../../style/popUpAlert.scss";

class AcceptOrDeclineForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messageRepairman: '',
            user: '',
            id: '',
            clicked: '',
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

    componentDidMount() {
        console.log(this.props.location);
        this.setState({
            user: this.props.location.user,
            id: this.props.location.id,
            clicked: this.props.location.clicked
        })

    }

    onSubmit(id, clicked) {

        const poruka = { messageRepairman: this.state.messageRepairman }

        clicked === "accept" ? this.props.acceptZahtevById(id, poruka, this.props.history) : this.props.declineZahtevById(id, poruka, this.props.history);
        this.props.history.push('/repairman/newreq');
        window.location.reload(true);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const errors = this.props.errors;

        return (
            <div className='pozadina animated fadeIn'>
                <div
                    className='login animated fadeIn'
                    style={{
                        maxWidth: '450px',
                        marginTop: '5%',
                        boxShadow: '00px 30px 150px 10px rgba(0,0,0,0.7),0px 0px 0px 20px rgba(71,90,121,1)'
                    }}>
                    <Link to="/repairman/newreq">
                        <img
                            className="close"
                            alt="slika"
                            src={require("../../../assets/icons/close.png")}
                            style={{
                                marginLeft: '390px',
                                height: '30px',
                            }}
                        ></img>
                    </Link>
                    <h1 className="popuptext" style={{ marginBottom: '0px' }}>Pošaljite poruku korisniku {this.state.user}</h1>
                    <form className="forma login-forma" style={{ background: 'rgb(245,245,245)' }} >

                        <div>
                            <input
                                type="text"
                                name="messageRepairman"
                                className={classnames('login-input', { 'login-input-invalid': errors.userMessage })}
                                placeholder="Poruka"
                                value={this.state.messageRepairman}
                                onChange={this.onChange}
                                style={{ height: '80px' }}
                            />
                            {errors.userMessage && (<label className="errorlabel">{errors.userMessage}</label>)}
                        </div>

                        <button
                            type="button"
                            name="submit"
                            onClick={() => this.onSubmit(this.state.id, this.state.clicked)}
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

AcceptOrDeclineForm.propTypes = {
    acceptZahtevById: PropTypes.func.isRequired,
    declineZahtevById: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    errors: state.errors
})

export default connect(mapStateToProps, { acceptZahtevById, declineZahtevById })(withRouter(AcceptOrDeclineForm));


