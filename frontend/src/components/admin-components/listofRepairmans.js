import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getRepairmanProfiles } from "../../redux/actions/profileActions";
import ListItem from "./listItem";
import "../../style/admin-components/list-item.scss";

class ListOfRepairmans extends Component {
    componentDidMount() {
        this.props.getRepairmanProfiles();
    }

    render() {
        const { profiles, loading } = this.props.profile;
        let listOfRepairmans;

        if (profiles === null || loading) {
            listOfRepairmans = <img alt="slika" src="http://icon-library.com/images/spinner-icon-gif/spinner-icon-gif-24.jpg" style={{ height: '150px' }}></img>
        }
        else if (profiles.length > 0) {
            listOfRepairmans = profiles.map(profile => (
                <ListItem key={profile._id} id={profile.repairman} profile={profile} />
            ))
        }
        else {
            listOfRepairmans = <h1 style={{ color: 'rgb(31,41,68)' }}>Trenutno nema registrovanih majstora...</h1>
        }

        return (
            <div className="list-container">
                {listOfRepairmans}
            </div>
        )
    }
}

ListOfRepairmans.propTypes = {
    getRepairmanProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps, { getRepairmanProfiles })(ListOfRepairmans);
