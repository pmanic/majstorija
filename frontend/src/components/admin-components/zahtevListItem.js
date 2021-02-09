import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { acceptZahtevById, declineZahtevById } from "../../redux/actions/zahtevKategorijeActions";
import "../../style/admin-components/list-item.scss";
import "../../style/admin-components/zahtevListItem.scss";

class ZahtevListItem extends Component {

    onAccept = (id) => {
        this.props.acceptZahtevById(id, this.props.history);
        window.location.reload();
    }

    onDecline = (id) => {
        this.props.declineZahtevById(id, this.props.history);
        window.location.reload();
    }

    render() {
        return (
            <div className='listItem-holder'>
                <div className='ZahtevListItem animated fadeIn'>
                    <div className='ZahtevListItem-avatar'>
                        <img className="avatar" alt="slika" src={require("../../assets/kljuc.png")} style={{ height: '20px' }}></img>
                    </div>
                    <div className='ZahtevListItem-info'>
                        <h4>Majstor: {this.props.zahtev.repairmanUsername}</h4>
                        <h2>{this.props.zahtev.categoryTitle}</h2>
                    </div>
                    <div className="ZahtevListItem-confirm">
                        <div className="accept" onClick={() => this.onAccept(this.props.zahtev._id)}>
                            <img className="avatar" alt="slika" src={require("../../assets/icons/done.png")} style={{ height: '35px' }}></img>
                        </div>
                        <div className="decline" onClick={() => this.onDecline(this.props.zahtev._id)}>
                            <img className="avatar" alt="slika" src={require("../../assets/icons/close.png")} style={{ height: '32px' }}></img>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

ZahtevListItem.propTypes = {
    acceptZahtevById: PropTypes.func.isRequired,
    declineZahtevById: PropTypes.func.isRequired
}

export default connect(null, { acceptZahtevById, declineZahtevById })(ZahtevListItem);
