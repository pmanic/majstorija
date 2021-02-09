import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { withRouter } from "react-router-dom";

import { archiveZahtevById, acceptZahtevById, declineZahtevById } from "../../../redux/actions/zahtevActions";

import "../../../style/repairman-components/reqItemRepairman.scss";

class ReqItemUser extends Component {

    archiveZahtevById(id) {
        this.props.archiveZahtevById(id);
        window.location.reload(true);
    }

    render() {
        const user = this.props.user;
        const dateSent = new Date(this.props.zahtev.dateSent);
        const year = dateSent.getFullYear();
        const month = dateSent.getMonth();
        const day = dateSent.getDate();

        const dateScheduled = new Date(this.props.zahtev.scheduledDate);
        const scheduledYear = dateScheduled.getFullYear();
        const scheduledMonth = dateScheduled.getMonth();
        const scheduledDay = dateScheduled.getDate();

        let listItem;

        if (this.props.profile === null || user === null || typeof user === "undefined") {
            listItem = <img alt="slika" src="http://icon-library.com/images/spinner-icon-gif/spinner-icon-gif-24.jpg" style={{ height: '150px' }}></img>;
        }
        else if (this.props.profile.profiles && user.gender !== null) {
            listItem = (
                < div className='listItemRepairman animated fadeIn' >
                    <div className='listItem-avatar'>
                        {user.gender === "M" ? <img className="avatar" alt="slika" src={require("../../../assets/icons/user.png")}></img> : <img className="avatar" alt="slika" src={require("../../../assets/icons/user-female.png")}></img>}
                        <h3>{user.username}</h3>
                    </div>
                    <div className='listItem-info'>
                        <div className="ime">
                            <h1>{day + "/" + month + "/" + year}</h1>
                            <div style={{ display: 'flex', flexDirection: 'row', fontSize: '17px', margin: '0 auto 0 auto' }}>
                                <strong>Zakazani datum:</strong><p>{scheduledDay + "/" + scheduledMonth + "/" + scheduledYear}</p>
                                <strong>Od:</strong><p>{this.props.zahtev.scheduledFrom}</p>
                                <strong>Do:</strong><p>{this.props.zahtev.scheduledTo}</p>
                            </div>
                        </div>
                        <div style={{ width: '100%', height: '1px', backgroundColor: 'rgb(216, 216, 216)' }}></div>
                        <div className="ostaloinfo">
                            <img className="avatar" alt="slika" src={require("../../../assets/icons/spot.png")} style={{ height: '20px' }}></img>
                            <p>{user.city}</p>
                            <img className="avatar" alt="slika" src={require("../../../assets/icons/city.png")} style={{ height: '20px' }}></img>
                            <p>{user.adress}</p>
                            <img className="avatar" alt="slika" src={require("../../../assets/icons/phone.png")} style={{ height: '20px' }}></img>
                            <p>{user.number}</p>
                        </div>
                    </div>
                    {
                        (this.props.zahtev.archived)
                            ?
                            (
                                <div className="listItem-contact">
                                    <div className="archive">
                                    </div>
                                </div>
                            )
                            :
                            (
                                (this.props.zahtev.accepted || this.props.zahtev.declined)
                                    ?
                                    (
                                        <div className="listItem-contact">
                                            <div className="archive" onClick={() => this.archiveZahtevById(this.props.zahtev._id)}>
                                                <img className="avatar" alt="slika" src={require("../../../assets/icons/done.png")} style={{ height: '35px' }}></img>
                                            </div>
                                        </div>
                                    )
                                    :
                                    (
                                        <div className="listItem-contact">
                                            <Link to={{ pathname: "/repairman/newreq/acceptordecline", id: this.props.zahtev._id, clicked: "accept", user: user.username }}>
                                                <div className="accept">
                                                    <img className="avatar" alt="slika" src={require("../../../assets/icons/done.png")} style={{ height: '35px' }}></img>
                                                </div>
                                            </Link>
                                            <Link to={{ pathname: "/repairman/newreq/acceptordecline", id: this.props.zahtev._id, clicked: "declined", user: user.username }}>
                                                <div className="decline">
                                                    <img className="avatar" alt="slika" src={require("../../../assets/icons/close.png")} style={{ height: '32px' }}></img>
                                                </div>
                                            </Link>
                                        </div>
                                    )
                            )
                    }

                    <div className="message">
                        <h3 style={{ fontStyle: 'italic' }}>"{this.props.zahtev.messageUser}"</h3>
                    </div>
                </div >
            )
        }

        return (
            <div>{listItem}</div>
        )
    }
}

ReqItemUser.propTypes = {
    archiveZahtevById: PropTypes.func.isRequired,
    acceptZahtevById: PropTypes.func.isRequired,
    declineZahtevById: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    profile: state.profile
})

export default connect(mapStateToProps, { archiveZahtevById, acceptZahtevById, declineZahtevById })(withRouter(ReqItemUser));