import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getAllZahtevi } from "../../redux/actions/zahtevActions";
import ConnectionItem from "./connectionItem";

class AllConnections extends Component {
    componentDidMount() {
        this.props.getAllZahtevi();
    }

    render() {
        const { zahtevi, loading } = this.props.zahtevi;
        let listOfReq;

        if (zahtevi === null || loading) {
            listOfReq = <img alt="slika" src="http://icon-library.com/images/spinner-icon-gif/spinner-icon-gif-24.jpg" style={{ height: '150px' }}></img>
        }
        else if (zahtevi.length > 0) {
            listOfReq = zahtevi.map(zahtev => {
                return <ConnectionItem key={zahtev._id} zahtev={zahtev} />
            })
        }
        else {
            listOfReq = <h1>Trenutno nema konekcija...</h1>
        }

        return (
            <div style={{ margin: 'auto', width: '100%' }}>
                <div className="naslov"><h1>Lista svih zahteva</h1></div>
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

AllConnections.propTypes = {
    getAllZahtevi: PropTypes.func.isRequired,
    zahtevi: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    zahtevi: state.zahtevi,
    profile: state.profile
});

export default connect(mapStateToProps, { getAllZahtevi })(AllConnections);
