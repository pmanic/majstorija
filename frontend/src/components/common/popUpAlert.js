import React, { Component } from 'react'
import PropTypes from "prop-types";
import classnames from "classnames";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { deleteUser, deleteRepairman, deleteRepairmanById, deleteUserById } from "../../redux/actions/profileActions";


import "../../style/login/login.scss";
import "../../style/popUpAlert.scss";

class PopUpAlert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        }
    }

    componentWillReceieveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    onDelete(role, admin, id) {
        if (role === "majstor") {
            if (admin === true) {
                this.props.deleteRepairmanById(id);
                window.location.reload();
                this.props.history.push("/admin/listofrepairmans");
            }
            else {
                this.props.deleteRepairman();
                this.props.history.push("/");
            }
        }
        else {
            if (admin === true) {
                this.props.deleteUserById(id);
                window.location.reload();
                this.props.history.push("/admin/listofusers");
            }
            else {
                this.props.deleteUser();
                this.props.history.push("/");
            }
        }
    }

    render() {

        return (
            <div className={classnames({ 'hidePopUp': !this.props.show }, { 'pozadina animated fadeIn': this.props.show })}>
                <div
                    className={classnames({ 'hidePopUp': !this.props.show }, { 'login animated fadeIn': this.props.show })}
                    style={{
                        width: '300px',
                        marginTop: '15%',
                        boxShadow: '0px 30px 150px 10px rgba(0,0,0,0.7),0px 0px 0px 20px rgba(211,100,98,1)'
                    }}>
                    <img
                        className="close"
                        alt="slika"
                        src={require("../../assets/icons/close.png")}
                        style={{
                            marginLeft: '240px',
                            height: '25px',
                        }}
                        onClick={this.props.close}
                    ></img>
                    <h2 className="popuptext">{this.props.naslov}</h2>
                    <button className="profile-button" onClick={() => this.onDelete(this.props.role, this.props.admin, this.props.id)}></button>
                </div>
            </div>
        )
    }
}

PopUpAlert.propTypes = {
    deleteRepairman: PropTypes.func.isRequired,
    deleteRepairmanById: PropTypes.func.isRequired,
    deleteUser: PropTypes.func.isRequired,
    deleteUserById: PropTypes.func.isRequired
}

export default connect(null, { deleteUser, deleteUserById, deleteRepairman, deleteRepairmanById })(withRouter(PopUpAlert));


