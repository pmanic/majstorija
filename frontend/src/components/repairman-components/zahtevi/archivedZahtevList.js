import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";

import ReqItemRepairman from "./reqItemRepairman";
import { getAllArchivedRepairmanZahtevi } from "../../../redux/actions/zahtevActions";
import { getUserProfiles } from "../../../redux/actions/profileActions";

class SentReq extends Component {
    componentDidMount() {
        this.props.getAllArchivedRepairmanZahtevi();
        this.props.getUserProfiles();
    }

    render() {
        const { zahtevi, loading } = this.props.zahtevi;
        const { profiles } = this.props.profile;
        let listOfReq;
        let user;

        if (zahtevi === null || profiles === null || loading || this.props.profile.loading || this.props.profile === null) {
            listOfReq = <img alt="slika" src="http://icon-library.com/images/spinner-icon-gif/spinner-icon-gif-24.jpg" style={{ height: '150px' }}></img>
        }
        else if (zahtevi.length > 0) {
            listOfReq = zahtevi.map(zahtev => {
                user = this.props.profile.profiles.find(profile => profile.user === zahtev.user);
                return <ReqItemRepairman key={zahtev._id} zahtev={zahtev} user={user} />
            })
        }
        else {
            listOfReq = <h1 style={{color:'rgb(31, 41, 68,1)'}}>Trenutno nema arhiviranih zahteva...</h1>
        }

        return (
            <div style={{ margin: 'auto', width: '100%' }}>
                <div className="naslov"><h1>Arhivirani zahtevi</h1></div>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                        marginTop: '150px'
                    }}>
                    {listOfReq}
                </div>
            </div>
        )
    }
}

SentReq.propTypes = {
    getAllArchivedRepairmanZahtevi: PropTypes.func.isRequired,
    getUserProfiles: PropTypes.func.isRequired,
    zahtevi: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    zahtevi: state.zahtevi,
    profile: state.profile
});

export default connect(mapStateToProps, { getAllArchivedRepairmanZahtevi, getUserProfiles })(SentReq);
