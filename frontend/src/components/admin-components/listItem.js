import React, { Component } from 'react';
import PopUpAlert from "../common/popUpAlert";

import "../../style/admin-components/list-item.scss";

class ListItem extends Component {
    constructor() {
        super();
        this.state = {
            showAlert: false
        }
    };

    alertHandler = () => {
        this.setState((prevState) => {
            return { showAlert: !prevState.showAlert };
        });
    }

    render() {
        const { profile, id } = this.props;

        return (
            <div className='listItem-holder'>
                <div className='listItemm animated fadeIn'>
                    <div className='listItem-avatarr'>
                        {(this.props.profile.role === "majstor")
                            ?
                            (
                                (this.props.profile.gender === "M")
                                    ?
                                    (<img className="avatar" alt="slika" src={require("../../assets/icons/repairman.png")}></img>)
                                    :
                                    (<img className="avatar" alt="slika" src={require("../../assets/icons/repairman-female.png")}></img>)
                            )
                            :
                            (
                                (this.props.profile.gender === "M")
                                    ?
                                    (<img className="avatar" alt="slika" src={require("../../assets/icons/user.png")}></img>)
                                    :
                                    (<img className="avatar" alt="slika" src={require("../../assets/icons/user-female.png")}></img>)
                            )
                        }
                        <h4>{profile.username}</h4>
                    </div>
                    <div className='listItem-info'>
                        <div className="ime">
                            <h2>{profile.name + " " + profile.surname}</h2>
                            <h3>{profile.category}</h3>
                        </div>
                        <div style={{ width: '100%', height: '1px', backgroundColor: 'rgb(216, 216, 216)' }}></div>
                        <div className="ostaloinfo">
                            <div className="row">
                                <img className="avatar" alt="slika" src={require("../../assets/icons/spot.png")} style={{ height: '20px' }}></img>
                                <p>{profile.city}</p>
                            </div>
                            <div className="row">
                                <img className="avatar" alt="slika" src={require("../../assets/icons/city.png")} style={{ height: '20px' }}></img>
                                <p>{profile.adress}</p>
                            </div>
                            <div className="row">
                                <img className="avatar" alt="slika" src={require("../../assets/icons/phone.png")} style={{ height: '20px' }}></img>
                                <p>{profile.number}</p>
                            </div>
                        </div>
                    </div>
                    <div className="listItem-delete" onClick={this.alertHandler}>
                        <img alt="slika" src={require("../../assets/icons/remove.png")} style={{ height: '30px' }}></img>
                    </div>
                </div>
                <PopUpAlert
                    show={this.state.showAlert}
                    naslov={`Da li ste sigurni da želite obrisati profil korisnika ${profile.username} ?`}
                    close={this.alertHandler}
                    role={profile.role}
                    admin={true}
                    id={id}
                ></PopUpAlert>
            </div>
        )
    }
}

export default ListItem;
