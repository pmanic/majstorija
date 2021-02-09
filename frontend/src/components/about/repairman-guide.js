import React, { Component } from 'react';
import "../../style/about/guide.scss";

class RepairmanGuide extends Component {
    render() {
        return (
            <div className="guide">
                <div className="red">
                    <img className="guide-icon" alt="slika" src={require("../../assets/icons/register.png")}></img>
                    <p>Registrujte se i unesite vaše ispravne podatke..</p>
                </div>
                <div className="red">
                    <img className="guide-icon" alt="slika" src={require("../../assets/icons/clock.png")}></img>
                    <p>Čekajte da vas mušterija kontaktira. Jer strpljenje se isplati.</p>
                </div>
                <div className="red">
                    <img className="guide-icon" alt="slika" src={require("../../assets/icons/curriculum.png")}></img>
                    <p>Proveravajte svoju listu zahteva i prihvatite posao ukoliko vam to odgovara.</p>
                </div>
                <div className="red">
                    <img className="guide-icon" alt="slika" src={require("../../assets/icons/route.png")}></img>
                    <p>Nadjite se sa mušterijom.</p>
                </div>
                <div className="red">
                    <img className="guide-icon" alt="slika" src={require("../../assets/icons/settings.png")}></img>
                    <p>Dokažite da ste sjajni u svom poslu.</p>
                </div>
                <div className="red">
                    <img className="guide-icon" alt="slika" src={require("../../assets/icons/smile.png")}></img>
                    <p>Nabacite osmeh na lice i nastavite da koristite portal Majstorija.</p>
                </div>
            </div>
        );
    }
}

export default RepairmanGuide;