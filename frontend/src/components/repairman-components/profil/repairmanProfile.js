import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from 'react-moment';

import { getRepairmanProfileByHandle, deleteExperience, deleteEducation } from "../../../redux/actions/profileActions";
import "../../../style/repairman-components/repairmanProfile.scss";
import "../../../style/login/login.scss";
import "../../../style/popUpAlert.scss";

class RepairmanProfile extends Component {

    componentWillReceiveProps(nextProps) {
        if (nextProps.profile.profile === null) {
        }
    }

    componentDidMount() {
        if (this.props.match.params.handle) {
            this.props.getRepairmanProfileByHandle(this.props.match.params.handle);
        }
    }

    onDeleteExperienceClick(id) {
        this.props.deleteExperience(id);
    }

    onDeleteEducationClick(id) {
        this.props.deleteEducation(id);
    }

    render() {
        const { profile, loading } = this.props.profile;
        let profileContent;
        let expContent;
        let educContent;
        let linkBasedOnRole;
        let contactButton;
        let deleteEducOrExp;

        if (profile === null || loading) {
            profileContent = <img alt="slika" src="http://icon-library.com/images/spinner-icon-gif/spinner-icon-gif-24.jpg" style={{ height: '150px' }}></img>

        }
        else {
            if (profile.username !== this.props.match.params.handle) {
                expContent = <img alt="slika" src="http://icon-library.com/images/spinner-icon-gif/spinner-icon-gif-24.jpg" style={{ height: '150px' }}></img>
                educContent = <img alt="slika" src="http://icon-library.com/images/spinner-icon-gif/spinner-icon-gif-24.jpg" style={{ height: '150px' }}></img>
            }
            else {
                if (this.props.auth.role === "majstor") {
                    linkBasedOnRole = "/repairman";
                    contactButton = null;
                }
                else if (this.props.auth.role === "korisnik") {
                    linkBasedOnRole = "/user/search";
                    contactButton = <Link to={`/user/search/sendrequest/${this.props.match.params.handle}`}><div type="submit" className="hireRepairman"><h1>Angažujte majstora</h1></div></Link>
                }
                else {
                    linkBasedOnRole = "/";
                    contactButton = null;
                }
                expContent = profile.experience.map(exp => (
                    <li key={exp._id} className="iskustvoContainer">
                        {this.props.auth.role === "majstor" ? deleteEducOrExp = (<img alt="slika" src={require("../../../assets/icons/remove.png")} onClick={this.onDeleteExperienceClick.bind(this, exp._id)} style={{ height: '25px', marginLeft: '165px', marginTop: '10px', marginBottom: '-20px' }}></img>) : deleteEducOrExp = null}
                        <h4>{exp.company}</h4>
                        <p>
                            <strong>Pozicija:</strong> {exp.position}
                        </p>
                        <p>
                            {exp.location === '' ? null : (
                                <span>
                                    <strong>Kompanija: </strong> {exp.company}
                                </span>
                            )}
                        </p>
                        <p>
                            {exp.years === '' ? null : (
                                <span>
                                    <strong>Godina na poziciji: </strong> {exp.years}
                                </span>
                            )}
                        </p>
                        <p>
                            {exp.currentJob === false ?
                                (
                                    <span>
                                        <strong>Aktuelno: </strong> Ne
                                    </span>
                                )
                                :
                                (
                                    <span>
                                        <strong>Aktuelno: </strong> Da
                                    </span>
                                )}
                        </p>
                        <p>
                            {exp.descriptionJob === '' ? null : (
                                <span>
                                    <strong>Opis: </strong> {exp.descriptionJob}
                                </span>
                            )}
                        </p>
                    </li>
                ));
                educContent = profile.education.map(educ => (
                    <li key={educ._id} className="iskustvoContainer">
                        {this.props.auth.role === "majstor" ? deleteEducOrExp = (<img alt="slika" src={require("../../../assets/icons/remove.png")} onClick={this.onDeleteEducationClick.bind(this, educ._id)} style={{ height: '25px', marginLeft: '165px', marginTop: '10px', marginBottom: '-20px' }}></img>) : deleteEducOrExp = null}
                        <h4>{educ.school}</h4>
                        <p>
                            <Moment format="YYYY/MM/DD">{educ.from}</Moment> -
                        {educ.to === null ? (
                                ' Now'
                            ) : (
                                    <Moment format="YYYY/MM/DD">{educ.to}</Moment>
                                )}
                        </p>
                        <p>
                            <strong>Diploma:</strong> {educ.degree}
                        </p>
                        <p>
                            {educ.current === false ?
                                (
                                    <span>
                                        <strong>Aktuelno: </strong> Ne
                                    </span>
                                )
                                :
                                (
                                    <span>
                                        <strong>Aktuelno: </strong> Da
                                    </span>
                                )}
                        </p>
                        <p>
                            {educ.description === '' ? null : (
                                <span>
                                    <strong>Opis: </strong> {educ.description}
                                </span>
                            )}
                        </p>
                    </li>
                ));
            }
            profileContent = (
                <div className="profile-container">
                    <div className="profile-header">
                        <Link to={linkBasedOnRole}>
                            <img
                                className="close"
                                alt="slika"
                                src={require("../../../assets/icons/close.png")}
                                style={{
                                    marginLeft: '450px',
                                    zIndex: 999,
                                    height: '32px',
                                }}
                            ></img>
                        </Link>
                        {profile.gender === "M" ? <img className="avatar" alt="slika" src={require("../../../assets/icons/repairman.png")}></img> : <img className="avatar" alt="slika" src={require("../../../assets/icons/repairman-female.png")}></img>}
                    </div>
                    <div className="profile-ime">
                        <h1>{profile.name + " " + profile.surname}</h1>
                        <h2>{profile.category}</h2>
                    </div>
                    <div className="info">
                        <div className="satnicaiocena">
                            <div className="satnica">
                                <img style={{ height: '40px' }} alt="slika" src={require("../../../assets/icons/euro.png")}></img>
                                <h1>{profile.hourbill + "€"}</h1>
                            </div>
                            <div className="ocena">
                                <img style={{ height: '30px' }} alt="slika" src={require("../../../assets/icons/star.png")}></img>
                                <h1>{profile.rating}</h1>
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <div className="osnovno">
                                <h2>Osnovne informacije</h2>
                                <p><strong>Ime:</strong> {profile.name}</p>
                                <p><strong>Prezime:</strong> {profile.surname}</p>
                                <p><strong>Profesija: </strong>{profile.category}</p>
                                <p><strong>Satnica:</strong> {profile.hourbill}</p>
                                <p><strong>Grad:</strong> {profile.city}</p>
                                <p><strong>Adresa:</strong> {profile.adress}</p>
                                <p><strong>Broj:</strong> {profile.number}</p>
                            </div>
                            <div className="iskustvoiedukacija">
                                <div className="iskustvo">
                                    <h2>Radno iskustvo</h2>
                                    {expContent}
                                </div>
                                <div className="edukacija">
                                    <h2>Edukacija</h2>
                                    {educContent}
                                </div>
                            </div>
                        </div>
                    </div>
                    {contactButton}
                </div>
            )
        }


        return (
            <div className='pozadina animated fadeIn'>
                <div className='login animated fadeIn'
                    style={{
                        maxWidth: '600px',
                        marginTop: '5%',
                        height: 'fit-content',
                        overflow: 'hidden',
                        boxShadow: '0px 30px 150px 10px rgba(0,0,0,0.7),0px 0px 0px 20px rgba(71,90,121,1)'
                    }}>
                    {profileContent}
                </div>
            </div>
        )
    }
}

RepairmanProfile.propTypes = {
    getRepairmanProfileByHandle: PropTypes.func.isRequired,
    deleteExperience: PropTypes.func.isRequired,
    deleteEducation: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStateToProps, { getRepairmanProfileByHandle, deleteExperience, deleteEducation })(RepairmanProfile);