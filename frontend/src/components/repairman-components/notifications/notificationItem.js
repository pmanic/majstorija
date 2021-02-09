import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import {  notificationSeen } from "../../../redux/actions/notificationActions";

import "../../../style/repairman-components/notifications.scss";

class NotificationItem extends Component {

    onHover = (id) => {
        this.props.notificationSeen(id,this.props.history);
    }

    render() {

        return (
            <div className="notificationContainer" onMouseOver={()=>this.onHover(this.props.notification._id)}>
                <img className="avatar" alt="slika" src={require("../../../assets/icons/notification.png")} style={{ height: '40px' }}></img>
                <div className="notificationText">
                    <strong>Imate novi zahtev</strong>
                    <p>Zahtev za popravku od strane korisnika {this.props.notification.usernameKorisnika}</p>
                </div>
            </div >
        )
    }
}

NotificationItem.propTypes = {
    notificationSeen: PropTypes.func.isRequired
}

export default connect(null, { notificationSeen})(withRouter(NotificationItem));