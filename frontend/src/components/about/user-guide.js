import React, { Component } from 'react';
import "../../style/about/guide.scss";

class Userguide extends Component {
    render() {
        return (
            <div className="guide">
                <div className="red">
                    <img className="guide-icon" alt="slika" src={require("../../assets/icons/register.png")}></img>
                    <p>Registrujte se i unesite vaše ispravne podatke.</p>
                </div>
                <div className="red">
                    <img className="guide-icon" alt="slika" src={require("../../assets/icons/loupe.png")}></img>
                    <p>Na osnovu odgovarajućih filtera pretražite majstora i kontaktirajte ga.</p>
                </div>
                <div className="red">
                    <img className="guide-icon" alt="slika" src={require("../../assets/icons/worker.png")}></img>
                    <p>Sačekajte da majstor odobri vaš zahtev.</p>
                </div>
                <div className="red">
                    <img className="guide-icon" alt="slika" src={require("../../assets/icons/route.png")}></img>
                    <p>Ukoliko je vaš zahtev odobren dogovorite se sa majstorom oko nalaženja.</p>
                </div>
                <div className="red">
                    <img className="guide-icon" alt="slika" src={require("../../assets/icons/medal.png")}></img>
                    <p>Nakon završenog posla ocenite majstora na osnovu iskustva.</p>
                </div>
                <div className="red">
                    <img className="guide-icon" alt="slika" src={require("../../assets/icons/smile.png")}></img>
                    <p>Nabacite osmeh na lice i posetite nas opet.</p>
                </div>
            </div>
        );
    }
}

export default Userguide;