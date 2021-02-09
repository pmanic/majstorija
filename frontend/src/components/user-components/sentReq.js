import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";

import ReqItemUser from "./reqItemUser";
import { getAllSentUserZahtevi } from "../../redux/actions/zahtevActions";
import { getRepairmanProfiles } from "../../redux/actions/profileActions";

class SentReq extends Component {
    componentDidMount() {
        this.props.getAllSentUserZahtevi();
        this.props.getRepairmanProfiles();
    }

    render() {
        const { zahtevi, loading } = this.props.zahtevi;
        const { profiles } = this.props.profile;
        let listOfReq;
        let repairman;

        if (zahtevi === null || profiles === null || loading) {
            listOfReq = <img alt="slika" src="http://icon-library.com/images/spinner-icon-gif/spinner-icon-gif-24.jpg" style={{ height: '150px' }}></img>
        }
        else if (zahtevi.length > 0) {
            listOfReq = zahtevi.map(zahtev => {
                repairman = this.props.profile.profiles.find(profile => profile.repairman === zahtev.repairman);
                return <ReqItemUser zahtev={zahtev} repairman={repairman} />
            })
        }
        else {
            listOfReq = <h1>Trenutno nema poslatih zahteva...</h1>
        }

        return (
            <div style={{ margin: 'auto', width: '100%' }}>
                <div className="naslov"><h1>Zahtevi na čekanju</h1></div>
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
    getAllSentUserZahtevi: PropTypes.func.isRequired,
    getRepairmanProfiles: PropTypes.func.isRequired,
    zahtevi: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    zahtevi: state.zahtevi,
    profile: state.profile
});

export default connect(mapStateToProps, { getAllSentUserZahtevi, getRepairmanProfiles })(SentReq);
