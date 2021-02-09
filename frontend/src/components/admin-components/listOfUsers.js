import React, { Component } from 'react'
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getUserProfiles } from "../../redux/actions/profileActions";
import ListItem from "./listItem";
import "../../style/admin-components/list-item.scss";

class ListOfUsers extends Component {
    componentDidMount() {
        this.props.getUserProfiles();
    }

    render() {
        const { profiles, loading } = this.props.profile;
        let listOfUsers;

        if (profiles === null || loading) {
            listOfUsers = <img alt="slika" src="http://icon-library.com/images/spinner-icon-gif/spinner-icon-gif-24.jpg" style={{ height: '150px' }}></img>
        }
        else if (profiles.length > 0) {
            listOfUsers = profiles.map(profile => (
                <ListItem key={profile._id} id={profile.user} profile={profile} />
            ))
        }
        else {
            listOfUsers = <h1 style={{ color: 'rgb(31,41,68)' }}>Trenutno nema registrovanih korisnika...</h1>
        }

        return (
            <div className="list-container">
                {listOfUsers}
            </div>
        )
    }
}

ListOfUsers.propTypes = {
    getUserProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps, { getUserProfiles })(ListOfUsers);