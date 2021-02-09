import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";

import ListItem from "./listItem";
import { getRepairmansOnDuty } from "../../../redux/actions/profileActions";

class ListOfProfiles extends Component {
    componentDidMount() {
        this.props.getRepairmansOnDuty();
    }

    render() {
        const { profiles, loading } = this.props.profile;
        let listOfItems;

        if (profiles === null || loading) {
            listOfItems = <img alt="slika" src="http://icon-library.com/images/spinner-icon-gif/spinner-icon-gif-24.jpg" style={{ height: '150px' }}></img>
        }
        else if (profiles.length > 0) {
            listOfItems = profiles.map(profile => (
                <ListItem key={profile._id} profile={profile} />
            ))
        }
        else {
            listOfItems = <h1 style={{ color: 'rgb(31,41,68)' }}>Nema registrovanih majstora</h1>
        }

        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%',
                    marginTop: '50px'
                }}>
                {listOfItems}
            </div>
        )
    }
}

ListOfProfiles.propTypes = {
    getRepairmansOnDuty: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps, { getRepairmansOnDuty })(ListOfProfiles);
