import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";

import ReqItemUser from "./reqItemUser";
import { getAllDeclinedUserZahtevi } from "../../redux/actions/zahtevActions";
import { getRepairmanProfiles } from "../../redux/actions/profileActions";

class DeclinedReq extends Component {
    componentDidMount() {
        this.props.getAllDeclinedUserZahtevi();
        this.props.getRepairmanProfiles();
    }

    render() {
        const { zahtevi, loading } = this.props.zahtevi;
        const { profiles } = this.props.profile;
        let listOfReq;
        let repairman;

        if (zahtevi === null || profiles === null || loading || this.props.profile.loading || this.props.profile === null) {
            listOfReq = <img alt="slika" src="http://icon-library.com/images/spinner-icon-gif/spinner-icon-gif-24.jpg" style={{ height: '150px' }}></img>
        }
        else if (zahtevi.length > 0) {
            listOfReq = zahtevi.map(zahtev => {
                repairman = this.props.profile.profiles.find(profile => profile.repairman === zahtev.repairman);
                return <ReqItemUser zahtev={zahtev} repairman={repairman} />
            })
        }
        else {
            listOfReq = <h1 style={{ color: 'rgb(31,41,68)' }}>Trenutno nema odbijenih zahteva...</h1>
        }

        return (
            <div style={{ margin: 'auto', width: '100%' }}>
                <div className="naslov" ><h1>Odbijeni zahtevi</h1></div>
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

DeclinedReq.propTypes = {
    getAllDeclinedUserZahtevi: PropTypes.func.isRequired,
    getRepairmanProfiles: PropTypes.func.isRequired,
    zahtevi: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    zahtevi: state.zahtevi,
    profile: state.profile
});

export default connect(mapStateToProps, { getRepairmanProfiles, getAllDeclinedUserZahtevi })(DeclinedReq);
