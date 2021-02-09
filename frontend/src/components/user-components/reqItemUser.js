import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import classnames from "classnames";

import { archiveZahtevById } from "../../redux/actions/zahtevActions";
import { getRepairmanProfileByHandle } from "../../redux/actions/profileActions";

import "../../style/user-components/reqItemUser.scss";

class ReqItemUser extends Component {

    archiveZahtevById(id) {
        this.props.archiveZahtevById(id);
        window.location.reload(true);
    }

    render() {
        const { loading, profiles } = this.props.profile;
        const repairman = this.props.repairman;
        const dateSent = new Date(this.props.zahtev.dateSent);
        const year = dateSent.getFullYear();
        const month = dateSent.getMonth();
        const day = dateSent.getDate();
        let itemUser;

        if (profiles === null || loading || this.props.profile.loading || this.props.profile === null || typeof repairman === "undefined") {
            itemUser = <div></div>
        }
        else if (this.props.profile.profiles && repairman.gender !== null) {
            itemUser = (
                <div className={classnames('listItemUser animated fadeIn', { 'noMessage': !this.props.zahtev.messageRepairman })} >
                    <div className='listItem-avatar'>
                        {repairman.gender === "M" ? <img className="avatar" alt="slika" src={require("../../assets/icons/repairman.png")}></img> : <img className="avatar" alt="slika" src={require("../../assets/icons/repairman-female.png")}></img>}
                        <h3>{repairman.username}</h3>
                    </div>
                    <div className='listItem-info'>
                        <div className="ime">
                            <h1>{day + "/" + month + "/" + year}</h1>
                            <h3 style={{ fontStyle: 'italic' }}>"{this.props.zahtev.messageUser}"</h3>
                        </div>
                        <div style={{ width: '100%', height: '1px', backgroundColor: 'rgb(216, 216, 216)' }}></div>
                        <div className="ostaloinfo">
                            <strong>Odobren:</strong> {this.props.zahtev.accepted ? <p>Da</p> : <p>Ne</p>}
                            <strong>Odbijen:</strong> {this.props.zahtev.declined ? <p>Da</p> : <p>Ne</p>}
                            <strong>Završen:</strong> {this.props.zahtev.archived ? <p>Da</p> : <p>Ne</p>}
                        </div>
                    </div>
                    {
                        (this.props.zahtev.archived)
                            ?
                            (
                                <div className="listItem-contact">
                                    {
                                        (this.props.zahtev.rateRepairman)
                                            ?
                                            (
                                                <div className="archive" style={{ display: 'flex', flexDirection: 'column' }}>
                                                    <img className="avatar" alt="slika" src={require("../../assets/icons/graded.png")} style={{ height: '35px' }}></img>
                                                    <h2 style={{ color: 'rgb(255,220,100)' }}>{this.props.zahtev.rate}</h2>
                                                </div>
                                            )
                                            :
                                            (
                                                <Link to={`/user/history/raterequest/${this.props.zahtev._id}`}>
                                                    <div className="archive">
                                                        <img className="avatar  notgraded" alt="slika" src={require("../../assets/icons/grade.png")} style={{ height: '35px' }}></img>
                                                    </div>
                                                </Link>
                                            )
                                    }
                                </div>
                            )
                            :
                            (
                                (this.props.zahtev.accepted || this.props.zahtev.declined)
                                    ?
                                    (
                                        <div className="listItem-contact">
                                            <div className="archive" onClick={() => this.archiveZahtevById(this.props.zahtev._id)}>
                                                <img className="avatar" alt="slika" src={require("../../assets/icons/done.png")} style={{ height: '35px' }}></img>
                                            </div>
                                        </div>
                                    )
                                    :
                                    (
                                        <div className="listItem-contact">
                                            <div className="archive">
                                            </div>
                                        </div>
                                    )
                            )
                    }
                    {
                        (this.props.zahtev.messageRepairman)
                            ?
                            (
                                <div className="message">
                                    <h3 style={{ fontStyle: 'italic' }}>"{this.props.zahtev.messageRepairman}"</h3>
                                </div>
                            )
                            :
                            (
                                <div></div>
                            )
                    }
                </ div >
            )
        }
        return (
            itemUser
        )
    }
}

ReqItemUser.propTypes = {
    getRepairmanProfileByHandle: PropTypes.func.isRequired,
    archiveZahtevById: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    profile: state.profile
})

export default connect(mapStateToProps, { getRepairmanProfileByHandle, archiveZahtevById })(ReqItemUser);