import React, { Component } from 'react';
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getCurrentRepairmanProfile, updateRepairmanProfile, addEducation, addExperience, changeDuty } from "../../../redux/actions/profileActions";
import { sendZahtev } from "../../../redux/actions/zahtevKategorijeActions";

import PopUpAlert from "../../common/popUpAlert";
import "../../../style/user-components/userProfile.scss";

class editRepairmanProfile extends Component {
    constructor() {
        super();
        this.state = {
            password: '',
            city: '',
            adress: '',
            number: '',
            hourbill: '',
            website: '',
            bio: '',

            school: '',
            degree: '',
            from: '',
            to: '',
            current: false,
            description: '',

            position: '',
            company: '',
            years: '',
            currentJob: false,
            descriptionJob: '',

            categoryTitle: '',

            showAlert: false,
            showForm: false,
            showForm2: false,
            showForm3: false,
            showForm4: false,
            errors: {}
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onSubmitEducation = this.onSubmitEducation.bind(this);
        this.onSubmitExperience = this.onSubmitExperience.bind(this);
    };

    componentWillReceieveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    componentDidMount() {
        this.props.getCurrentRepairmanProfile();
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const profileData = {
            password: this.state.password,
            city: this.state.city,
            adress: this.state.adress,
            number: this.state.number,
            hourbill: this.state.hourbill,
            website: this.state.website,
            bio: this.state.bio,
        }

        this.props.updateRepairmanProfile(profileData, this.props.history);
    }

    onSubmitEducation(e) {
        e.preventDefault();

        const educData = {
            school: this.state.school,
            degree: this.state.degree,
            from: this.state.from,
            to: this.state.to,
            current: this.state.current,
            description: this.state.description
        }

        this.props.addEducation(educData, this.props.history);
    }

    onSubmitExperience(e) {
        e.preventDefault();

        const expData = {
            company: this.state.company,
            position: this.state.position,
            years: this.state.years,
            currentJob: this.state.currentJob,
            descriptionJob: this.state.descriptionJob
        }

        this.props.addExperience(expData, this.props.history);
    }

    onChangeDuty = (handle) => {
        this.props.changeDuty(handle);
        window.location.reload();
    }

    onSendZahtev = () => {
        const categoryTitle = this.state.categoryTitle;
        this.props.sendZahtev(categoryTitle, this.props.history);
    }

    alertHandler = () => {
        this.setState((prevState) => {
            return { showAlert: !prevState.showAlert };
        });
    }

    formHandler = () => {
        this.setState((prevState) => {
            return { showForm: !prevState.showForm };
        });
    }

    formHandler2 = () => {
        this.setState((prevState) => {
            return { showForm2: !prevState.showForm2 };
        });
    }

    formHandler3 = () => {
        this.setState((prevState) => {
            return { showForm3: !prevState.showForm3 };
        });
    }

    formHandler4 = () => {
        this.setState((prevState) => {
            return { showForm4: !prevState.showForm4 };
        });
    }

    render() {
        const errors = this.props.errors;
        const { profile, loading } = this.props.profile;
        let repairmanprofile;

        if (profile === null || loading) {
            repairmanprofile = <img alt="slika" src="http://icon-library.com/images/spinner-icon-gif/spinner-icon-gif-24.jpg" style={{ height: '150px', width: '150px', margin: 'auto' }}></img>
        }
        else {
            repairmanprofile = <div>
                <div className="naslov"><h1>Ažurirajte svoj profil</h1></div>
                <div className={classnames({ 'userprofile-container animated fadeIn': !this.state.showForm }, { 'userprofile-container marginWhenOpenForm': (this.state.showForm || this.state.showForm2 || this.state.showForm3) })}>

                    <div className="leftcontainer" >
                        <div className="education">

                            {/* --------------------------------------------------OSNOVNE INFORMACIJE-------------------------------------------------- */}
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    position: 'relative'
                                }}>
                                <img
                                    style={{
                                        height:
                                            '40px',
                                        left: '0',
                                        marginLeft: '20px',
                                        position: 'absolute'
                                    }}
                                    alt="slika"
                                    src={require("../../../assets/icons/info.png")}>
                                </img>
                                <h1>Osnovne informacije</h1>
                            </div>
                            <div className="linija"></div>

                            <form className={classnames({ 'hidePopUp': !this.state.showForm }, { 'forma animated fadeIn': this.state.showForm })} onSubmit={this.onSubmit}>
                                <div>
                                    <label>Nova sifra:</label>
                                    <input
                                        type="password"
                                        name="password"
                                        className={classnames('profile-input', { 'profile-input-invalid': errors.password })}
                                        value={this.state.password || ""}
                                        onChange={this.onChange}
                                    />
                                    {errors.password && (<label className="errorlabel">{errors.password}</label>)}
                                </div>
                                <div>
                                    <label>Grad:</label>
                                    <input
                                        type="text"
                                        name="city"
                                        className={classnames('profile-input', { 'profile-input-invalid': errors.city })}
                                        value={this.state.city || ""}
                                        onChange={this.onChange}
                                    />
                                    {errors.city && (<label className="errorlabel">{errors.city}</label>)}
                                </div>
                                <div>
                                    <label>Adresa:</label>
                                    <input
                                        type="text"
                                        name="adress"
                                        className={classnames('profile-input', { 'profile-input-invalid': errors.adress })}
                                        value={this.state.adress || ""}
                                        onChange={this.onChange}
                                    />
                                    {errors.adress && (<label className="errorlabel">{errors.adress}</label>)}
                                </div>
                                <div>
                                    <label>Broj:</label>
                                    <input
                                        type="text"
                                        name="number"
                                        className={classnames('profile-input', { 'profile-input-invalid': errors.number })}
                                        value={this.state.number || ""}
                                        onChange={this.onChange}
                                    />
                                    {errors.number && (<label className="errorlabel">{errors.number}</label>)}
                                </div>
                                <div>
                                    <label>Satnica:</label>
                                    <input
                                        type="number"
                                        name="hourbill"
                                        className={classnames('profile-input', { 'profile-input-invalid': errors.hourbill })}
                                        value={this.state.hourbill || ""}
                                        onChange={this.onChange}
                                    />
                                    {errors.hourbill && (<label className="errorlabel">{errors.hourbill}</label>)}
                                </div>
                                <div>
                                    <label>Web sajt:</label>
                                    <input
                                        type="text"
                                        name="website"
                                        className={classnames('profile-input', { 'profile-input-invalid': errors.website })}
                                        value={this.state.website || ""}
                                        onChange={this.onChange}
                                    />
                                    {/* {errors.website && (<label className="errorlabel">{errors.website}</label>)} */}
                                </div>
                                <div>
                                    <label>Biografija:</label>
                                    <input
                                        type="text"
                                        name="bio"
                                        className={classnames('profile-input', { 'profile-input-invalid': errors.bio })}
                                        style={{ height: '80px' }}
                                        value={this.state.bio || ""}
                                        onChange={this.onChange}
                                    />
                                    {errors.bio && (<label className="errorlabel">{errors.bio}</label>)}
                                </div>
                                <button
                                    name="submit"
                                    type="submit"
                                    className={classnames('profile-button', { 'profile-button-invalid': (errors.password || errors.city || errors.adress || errors.number || errors.hourbill || errors.website || errors.bio) })}
                                ></button>
                                <button
                                    type="button"
                                    className="profile-delete-button"
                                    onClick={this.alertHandler}
                                >Obrišite profil</button>
                            </form>

                            <div className="linija"></div>
                            <div className="showform" onClick={this.formHandler}>
                                <img
                                    className={classnames({ 'arrow': !this.state.showForm }, { 'arrow-flip': this.state.showForm })}
                                    alt="slika"
                                    src={require("../../../assets/icons/down-arrow.png")}>
                                </img>
                            </div>
                        </div>
                        <div className="experience">
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    position: 'relative'
                                }}>
                                <img
                                    style={{
                                        height:
                                            '40px',
                                        left: '0',
                                        marginLeft: '20px',
                                        position: 'absolute'
                                    }}
                                    alt="slika"
                                    src={require("../../../assets/icons/duty.png")}>
                                </img>
                                <h1>Dužnost</h1>
                            </div>
                            <div className="linija" style={{ height: '6px' }}></div>
                            <div className="dutydiv" onClick={() => this.onChangeDuty(profile.handle)}>
                                <img alt="slika" src={require("../../../assets/icons/on.png")} className={classnames('onduty', { 'offduty': !profile.onduty })}></img>
                            </div>
                        </div>
                        <div className="experience" style={{ marginTop: '30px' }}>

                            {/* --------------------------------------------------OSNOVNE INFORMACIJE-------------------------------------------------- */}
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    position: 'relative'
                                }}>
                                <img
                                    style={{
                                        height:
                                            '40px',
                                        left: '0',
                                        marginLeft: '20px',
                                        position: 'absolute'
                                    }}
                                    alt="slika"
                                    src={require("../../../assets/icons/addcategory.png")}>
                                </img>
                                <h1>Zahtev za kategoriju</h1>
                            </div>
                            <div className="linija"></div>

                            <form className={classnames({ 'hidePopUp': !this.state.showForm4 }, { 'forma animated fadeIn': this.state.showForm4 })} onSubmit={this.onSubmit}>
                                <div>
                                    <label>Naziv kategorije:</label>
                                    <input
                                        type="text"
                                        name="categoryTitle"
                                        className="profile-input"
                                        // className={classnames('profile-input', { 'profile-input-invalid': errors.password })}
                                        value={this.state.categoryTitle || ""}
                                        onChange={this.onChange}
                                    />
                                    {/* {errors.password && (<label className="errorlabel">{errors.password}</label>)} */}
                                </div>
                                <button
                                    name="button"
                                    type="button"
                                    onClick={this.onSendZahtev}
                                    className="profile-button"
                                ></button>
                            </form>

                            <div className="linija"></div>
                            <div className="showform" onClick={this.formHandler4}>
                                <img
                                    className={classnames({ 'arrow': !this.state.showForm4 }, { 'arrow-flip': this.state.showForm4 })}
                                    alt="slika"
                                    src={require("../../../assets/icons/down-arrow.png")}>
                                </img>
                            </div>
                        </div>
                    </div>
                    <div className="rightcontainer">

                        {/* --------------------------------------------------OBRAZOVANJE-------------------------------------------------- */}

                        <div className="education" name="education">
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    position: 'relative'
                                }}>
                                <img
                                    style={{
                                        height:
                                            '45px',
                                        left: '0',
                                        marginLeft: '20px',
                                        position: 'absolute'
                                    }}
                                    alt="slika"
                                    src={require("../../../assets/icons/university.png")}>
                                </img>
                                <h1>Obrazovanje</h1>
                            </div>
                            <div className="linija"></div>

                            <form className={classnames({ 'hidePopUp': !this.state.showForm2 }, { 'forma animated fadeIn': this.state.showForm2 })} onSubmit={this.onSubmitEducation}>
                                <div>
                                    <label>Obrazovna ustanova:</label>
                                    <input
                                        type="text"
                                        name="school"
                                        className={classnames('profile-input', { 'profile-input-invalid': errors.school })}
                                        value={this.state.school || ""}
                                        onChange={this.onChange}
                                    />
                                    {errors.school && (<label className="errorlabel">{errors.school}</label>)}
                                </div>
                                <div>
                                    <label>Diploma:</label>
                                    <input
                                        type="text"
                                        name="degree"
                                        className={classnames('profile-input', { 'profile-input-invalid': errors.degree })}
                                        value={this.state.degree || ""}
                                        onChange={this.onChange}
                                    />
                                    {errors.degree && (<label className="errorlabel">{errors.degree}</label>)}
                                </div>
                                <div>
                                    <label>Od:</label>
                                    <input
                                        type="date"
                                        name="from"
                                        className={classnames('profile-input', { 'profile-input-invalid': errors.from })}
                                        value={this.state.from || ""}
                                        onChange={this.onChange}
                                    />
                                    {errors.from && (<label className="errorlabel">{errors.from}</label>)}
                                </div>
                                <div>
                                    <label>Do:</label>
                                    <input
                                        type="date"
                                        name="to"
                                        className={classnames('profile-input', { 'profile-input-invalid': errors.to })}
                                        value={this.state.to || ""}
                                        onChange={this.onChange}
                                    />
                                    {errors.to && (<label className="errorlabel">{errors.to}</label>)}
                                </div>
                                <div
                                    style={{ display: 'flex', flexDirection: 'row', marginTop: '10px', marginBottom: '10px' }}>
                                    <label>Aktuelno:</label>
                                    <input
                                        type="checkbox"
                                        name="current"
                                        value={true}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div>
                                    <label>Opis:</label>
                                    <input
                                        type="text"
                                        name="description"
                                        className={classnames('profile-input', { 'profile-input-invalid': errors.description })}
                                        value={this.state.description || ""}
                                        onChange={this.onChange}
                                    />
                                    {errors.description && (<label className="errorlabel">{errors.description}</label>)}
                                </div>
                                <button
                                    name="submitEducation"
                                    type="submit"
                                    className={classnames('profile-button', { 'profile-button-invalid': (errors.scholl || errors.degree || errors.from || errors.to || errors.description) })}
                                    style={{ marginBottom: '30px' }}
                                ></button>
                            </form>

                            <div className="linija"></div>
                            <div className="showform" onClick={this.formHandler2}>
                                <img
                                    className={classnames({ 'arrow': !this.state.showForm2 }, { 'arrow-flip': this.state.showForm2 })}
                                    alt="slika"
                                    src={require("../../../assets/icons/down-arrow.png")}>
                                </img>
                            </div>
                        </div>

                        {/* --------------------------------------------------RADNO ISKUSTVO-------------------------------------------------- */}

                        <div className="experience" name="experience">
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    position: 'relative'
                                }}>
                                <img
                                    style={{
                                        height:
                                            '40px',
                                        left: '0',
                                        marginLeft: '20px',
                                        position: 'absolute'
                                    }}
                                    alt="slika"
                                    src={require("../../../assets/icons/portfolio.png")}>
                                </img>
                                <h1>Radno iskustvo</h1>
                            </div>
                            <div className="linija"></div>

                            <form className={classnames({ 'hidePopUp': !this.state.showForm3 }, { 'forma animated fadeIn': this.state.showForm3 })} onSubmit={this.onSubmitExperience}>
                                <div>
                                    <label>Pozicija:</label>
                                    <input
                                        type="text"
                                        name="position"
                                        className={classnames('profile-input', { 'profile-input-invalid': errors.title })}
                                        value={this.state.position || ""}
                                        onChange={this.onChange}
                                    />
                                    {errors.title && (<label className="errorlabel">{errors.title}</label>)}
                                </div>
                                <div>
                                    <label>Kompanija:</label>
                                    <input
                                        type="text"
                                        name="company"
                                        className={classnames('profile-input', { 'profile-input-invalid': errors.company })}
                                        value={this.state.company || ""}
                                        onChange={this.onChange}
                                    />
                                    {errors.company && (<label className="errorlabel">{errors.company}</label>)}
                                </div>
                                <div>
                                    <label>Broj godina na poziciji:</label>
                                    <input
                                        type="number"
                                        name="years"
                                        className={classnames('profile-input', { 'profile-input-invalid': errors.years })}
                                        value={this.state.years || ""}
                                        onChange={this.onChange}
                                    />
                                    {errors.years && (<label className="errorlabel">{errors.years}</label>)}
                                </div>
                                <div
                                    style={{ display: 'flex', flexDirection: 'row', marginTop: '10px', marginBottom: '10px' }}>
                                    <label>Aktuelno:</label>
                                    <input
                                        type="checkbox"
                                        name="currentJob"
                                        value={true}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div>
                                    <label>Opis:</label>
                                    <input
                                        type="text"
                                        name="descriptionJob"
                                        className={classnames('profile-input', { 'profile-input-invalid': errors.descriptionJob })}
                                        value={this.state.descriptionJob || ""}
                                        onChange={this.onChange}
                                    />
                                    {errors.descriptionJob && (<label className="errorlabel">{errors.descriptionJob}</label>)}
                                </div>
                                <button
                                    name="submitExperience"
                                    type="submit"
                                    className={classnames('profile-button', { 'profile-button-invalid': (errors.title || errors.company || errors.descriptionJob || errors.years) })}
                                    style={{ marginBottom: '30px' }}
                                ></button>
                            </form>

                            <div className="linija"></div>
                            <div className="showform" onClick={this.formHandler3}>
                                <img
                                    className={classnames({ 'arrow': !this.state.showForm3 }, { 'arrow-flip': this.state.showForm3 })}
                                    alt="slika"
                                    src={require("../../../assets/icons/down-arrow.png")}>
                                </img>
                            </div>
                        </div>
                    </div>

                    <PopUpAlert
                        show={this.state.showAlert}
                        naslov="Da li ste sigurni da želite obrisati vaš profil?"
                        close={this.alertHandler}
                        role={this.props.auth.role}
                    ></PopUpAlert>
                </div>
            </div>

        }

        return (
            <div className="edit-container animated fadeIn">
                {repairmanprofile}
            </div >
        );
    }
}

editRepairmanProfile.propTypes = {
    addExperience: PropTypes.func.isRequired,
    addEducation: PropTypes.func.isRequired,
    changeDuty: PropTypes.func.isRequired,
    updateRepairmanProfile: PropTypes.func.isRequired,
    getCurrentRepairmanProfile: PropTypes.func.isRequired,
    sendZahtev: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile,
    errors: state.errors
})

export default connect(mapStateToProps, { getCurrentRepairmanProfile, updateRepairmanProfile, addExperience, addEducation, changeDuty, sendZahtev })(withRouter(editRepairmanProfile));