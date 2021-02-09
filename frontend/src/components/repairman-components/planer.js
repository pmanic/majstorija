import React, { Component } from 'react';
import PropTypes from "prop-types";
import Calendar from 'react-calendar';
import { connect } from "react-redux";
import { getCurrentRepairmanProfile } from "../../redux/actions/profileActions";
import { getAllAcceptedRepairmanZahtevi } from "../../redux/actions/zahtevActions";

import "../../style/repairman-components/planer/calendar.scss";
import "../../style/repairman-components/planer/planer.scss"

class Planer extends Component {
    state = {
        date: new Date(),
        day: '',
        month: '',
        year: '',
        chosenDate: ''
    }

    componentDidMount() {
        this.props.getCurrentRepairmanProfile();
        this.props.getAllAcceptedRepairmanZahtevi();
    }

    dayHandler = (date) => {
        this.setState({
            day: date.getDate(),
            month: date.getMonth(),
            year: date.getFullYear()
        });
    }

    setChosenDate = (date) => {
        this.setState({
            chosenDate: date
        })
    }

    formatDate = (date) => {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [day, month, year].join('/');
    }

    onChange = date => this.setState({ date })

    render() {
        const { zahtevi, loading } = this.props.zahtevi;
        let calendarContainer;
        let pomocna = new Array;
        let scheduledRepairs = new Array;
        let scheduledRepair;

        if (zahtevi === null || loading) {
            calendarContainer = <img alt="slika" src="http://icon-library.com/images/spinner-icon-gif/spinner-icon-gif-24.jpg" style={{ height: '150px' }}></img>
        }
        else {
            zahtevi.forEach(zahtev => {
                if (this.formatDate(this.state.chosenDate) === (this.formatDate(zahtev.scheduledDate))) {

                    scheduledRepairs.push(zahtev);
                }
            })

            scheduledRepair = scheduledRepairs.map(zahtev => {
                if (this.formatDate(zahtev.scheduledDate) === (this.formatDate(this.state.date))) {
                    return <div className="scheduled-repair animated fadeIn ">
                        <div className="scheduled-repair-div"></div>
                        <div className="scheduled-repair-clock"><p>{zahtev.scheduledFrom + "-" + zahtev.scheduledTo}</p></div>
                        <div className="scheduled-repair-info">
                            <div className="row"><img className="avatar" alt="slika" src={require("../../assets/icons/lookprofile.png")} style={{ height: '25px' }}></img><strong>{zahtev.userUsername}</strong></div>
                            <div className="row"></div>
                            <div className="row"></div>
                        </div>
                        <div className="scheduled-repair-message"><p>"{zahtev.messageUser}"</p></div>
                    </div>
                }
            })

            calendarContainer = (
                <div className="calendarHolder animated fadeIn">
                    <Calendar
                        onChange={this.onChange}
                        onClickDay={(date) => { this.dayHandler(date); this.setChosenDate(date) }}
                        value={this.state.date}
                        tileClassName={({ date }) => {
                            zahtevi.map(zahtev => {
                                if (this.formatDate(zahtev.scheduledDate) === this.formatDate(date)) {
                                    pomocna.push(this.formatDate(zahtev.scheduledDate));
                                }
                                else {
                                    return false;
                                }
                            })
                            if (pomocna.includes(this.formatDate(date))) {
                                return 'scheduled-date';
                            }
                            else {
                                return null;
                            }
                        }}
                    />
                    <div className="pickedday">
                        <h1>{this.formatDate(this.state.date)}</h1>
                        <div className="scheduled-repair-container">
                            {(scheduledRepair.length === 0) ? <h2>Nemate zakazanih popravki za ovaj dan</h2>
                                : scheduledRepair}
                        </div>
                    </div>
                </div >
            )


        }

        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 'auto', width: '100%' }}> {calendarContainer}</div>
        );
    }
}

Planer.propTypes = {
    getCurrentRepairmanProfile: PropTypes.func.isRequired,
    getAllAcceptedRepairmanZahtevi: PropTypes.func.isRequired,
    zahtevi: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile,
    zahtevi: state.zahtevi
})

export default connect(mapStateToProps, { getCurrentRepairmanProfile, getAllAcceptedRepairmanZahtevi })(Planer);

