import React, { Component } from 'react'
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getAllZahteviKategorije } from "../../redux/actions/zahtevKategorijeActions";
import ZahtevListItem from "./zahtevListItem";
import "../../style/admin-components/list-item.scss";

class Zahtevi extends Component {
    componentDidMount() {
        this.props.getAllZahteviKategorije();
    }

    render() {
        const { zahteviKategorije, loading } = this.props.zahteviKategorije;
        let listOfZahtevi;

        if (zahteviKategorije === null || loading) {
            listOfZahtevi = <img alt="slika" src="http://icon-library.com/images/spinner-icon-gif/spinner-icon-gif-24.jpg" style={{ height: '150px' }}></img>
        }
        else if (zahteviKategorije.length > 0) {
            listOfZahtevi = zahteviKategorije.map(zahtev => (
                <ZahtevListItem key={zahtev._id} zahtev={zahtev} />
            ))
        }
        else {
            listOfZahtevi = <h1 style={{ color: 'rgb(31,41,68)' }}>Trenutno nema zahteva za kategoriju...</h1>
        }

        return (
            <div className="list-container">
                {listOfZahtevi}
            </div>
        )
    }
}

Zahtevi.propTypes = {
    getAllZahteviKategorije: PropTypes.func.isRequired,
    zahteviKategorije: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    zahteviKategorije: state.zahteviKategorije
});

export default connect(mapStateToProps, { getAllZahteviKategorije })(Zahtevi);