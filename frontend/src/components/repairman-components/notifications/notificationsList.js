import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";

import NotificationItem from "./notificationItem";
import { getAllRepairmanNotifications } from "../../../redux/actions/notificationActions";

class NotificationsLIst extends Component {
    componentDidMount() {
        this.props.getAllRepairmanNotifications();
    }

    render() {
        let listOfNotifications;

        if (this.props.notifications.notifications === null || this.props.notifications.loading || this.props.notifications === 'undefined') {
            listOfNotifications = <div></div>
        }
        else if(this.props.notifications) {
            listOfNotifications = this.props.notifications.notifications.map(notification => (
                <NotificationItem key={notification._id} notification={notification} />
            ))
        }

        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    maxWidth: '250px',
                    height:'fit-content',
                    position:'absolute',
                    bottom:'10px',
                    right:'10px'
                }}>
                {listOfNotifications}
            </div>
        )
    }
}

NotificationsLIst.propTypes = {
    getAllRepairmanNotifications: PropTypes.func.isRequired,
    notifications: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    notifications: state.notifications
});

export default connect(mapStateToProps, { getAllRepairmanNotifications})(NotificationsLIst );
