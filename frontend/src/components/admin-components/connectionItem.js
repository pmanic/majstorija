import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import "../../style/admin-components/reqItemAdmin.scss";

class ConnectionItem extends Component {

    archiveZahtevById(id) {
        this.props.archiveZahtevById(id);
        window.location.reload(true);
    }

    render() {
        const dateSent = new Date(this.props.zahtev.dateSent);
        const year = dateSent.getFullYear();
        const month = dateSent.getMonth();
        const day = dateSent.getDate();

        const dateScheduled = new Date(this.props.zahtev.scheduledDate);
        const scheduledYear = dateScheduled.getFullYear();
        const scheduledMonth = dateScheduled.getMonth();
        const scheduledDay = dateScheduled.getDate();

        return (
            <div className='listItemAdmin animated fadeIn'>
                <div className='listItem-avatar'>
                    {/* {user.gender === "M" ? <img className="avatar" alt="slika" src={require("../../assets/icons/user.png")}></img> : <img className="avatar" alt="slika" src={require("../../assets/icons/user-female.png")}></img>} */}
                    <h3>Majstor:</h3>
                    <h3>{this.props.zahtev.repairmanUsername}</h3>
                </div>
                <div className='listItem-info'>
                    <div className="ime">
                        <h1 style={{ color: 'rgb(211,100,98)' }}>{day + "/" + month + "/" + year}</h1>
                        <div style={{ display: 'flex', flexDirection: 'row', fontSize: '17px', margin: '0 auto 0 auto' }}>
                            <strong>Zakazani datum:</strong><p>{scheduledDay + "/" + scheduledMonth + "/" + scheduledYear}</p>
                            <strong>Od:</strong><p>{this.props.zahtev.scheduledFrom}</p>
                            <strong>Do:</strong><p>{this.props.zahtev.scheduledTo}</p>
                        </div>
                    </div>
                    <div style={{ width: '100%', height: '1px', backgroundColor: 'rgb(216, 216, 216)' }}></div>
                    <div className="ostaloinfo">
                        <strong>Odobren:</strong> {this.props.zahtev.accepted ? <p>Da</p> : <p>Ne</p>}
                        <strong>Odbijen:</strong> {this.props.zahtev.declined ? <p>Da</p> : <p>Ne</p>}
                        <strong>Završen:</strong> {this.props.zahtev.archived ? <p>Da</p> : <p>Ne</p>}
                    </div>
                </div>
                <div className='avataruser'>
                    {/* {repairman.gender === "M" ? <img className="avatar" alt="slika" src={require("../../assets/icons/repairman.png")}></img> : <img className="avatar" alt="slika" src={require("../../assets/icons/repairman-female.png")}></img>} */}
                    <h3>Korisnik:</h3>
                    <h3>{this.props.zahtev.userUsername}</h3>
                </div>

                <div className="message">
                    <div style={{ display: 'flex', flexDirection: 'row' }}><h3>Korisnik:</h3><h3 style={{ fontStyle: 'italic' }}>"{this.props.zahtev.messageUser}"</h3></div>
                    <div style={{ display: 'flex', flexDirection: 'row' }}><h3>Majstor:</h3><h3 style={{ fontStyle: 'italic' }}>"{this.props.zahtev.messageRepairman}"</h3></div>
                </div>
            </div >

        )
    }
}

ConnectionItem.propTypes = {

}

const mapStateToProps = (state) => ({
    profile: state.profile
})

export default connect(mapStateToProps, {})(withRouter(ConnectionItem));