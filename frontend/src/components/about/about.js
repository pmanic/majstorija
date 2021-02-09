import React, { Component } from "react";
import "../../style/about/about.scss";
import Userguide from "./user-guide";
import Repairmanguide from "./repairman-guide";

class About extends Component {
  constructor() {
    super();
    this.state = {
      showDiv: true,
      showButton1: true,
      showButton2: false,
    };
  }

  promeniDiv1() {
    this.setState({
      showDiv: !this.state.showDiv,
      showButton1: true,
      showButton2: false,
    });
    document.getElementById("button1").disabled = true;
    document.getElementById("button2").disabled = false;
    console.log("KURC");
  }

  promeniDiv2() {
    this.setState({
      showDiv: !this.state.showDiv,
      showButton1: false,
      showButton2: true,
    });
    document.getElementById("button2").disabled = true;
    document.getElementById("button1").disabled = false;
  }

  render() {
    let class1 = "button1";
    let class2 = "button2";
    if (this.state.showButton2) {
      class1 = "button1 active1";
      class2 = "button2 active2";
    }

    return (
      <div className="about-container">
        <div className="about" id="about">
          <div className="about-text">
            <h1>O nama</h1>
            <img
              alt="img"
              src={require("../../assets/kljuc.png")}
              style={{ width: "50px" }}
            ></img>
            <p>
              Tim Mystore je formiran 2020. godine sa idejom da obezbedi
              efikasniju i jednostavniju povezanost majstora sa korisnicima.
              Poneti ovom idejom, kreirali smo portal koji je inovativnog
              dizajna, jednostavan za korišćenje, besplatan i pruža majstorima
              kompletan uvid u svoja zaduženja.
            </p>
            <div className="red-about">
              <img
                alt="img"
                src={require("../../assets/icons/hand.png")}
                style={{ height: "300px" }}
              ></img>
              <h1>Pronađi ili pruži pomoć - jer nekada sekunde odlučuju!</h1>
            </div>
          </div>
        </div>
        <div className="howitworks">
          <div className="about-text">
            <h1>Kako funkcioniše</h1>
            <img
              alt="img"
              src={require("../../assets/kljuc.png")}
              style={{ width: "50px" }}
            ></img>
            <div className="button-holder">
              <button
                id="button1"
                className={class1}
                onClick={() => this.promeniDiv1()}
              >
                Korisnik
              </button>
              <button
                id="button2"
                className={class2}
                onClick={() => this.promeniDiv2()}
              >
                Majstor
              </button>
            </div>
            {this.state.showDiv ? (
              <Userguide></Userguide>
            ) : (
              <Repairmanguide></Repairmanguide>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default About;
