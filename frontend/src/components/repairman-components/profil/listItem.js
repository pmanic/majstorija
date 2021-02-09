import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import "../../../style/repairman-components/listItem.scss";

class ListItem extends Component {
    render() {
        const { profile } = this.props;

        return (
            <div className='listItem animated fadeIn'>
                <div className='listItem-avatar'>
                    {this.props.profile.gender === "M" ? <img className="avatar" alt="slika" src={require("../../../assets/icons/repairman.png")}></img> : <img className="avatar" alt="slika" src={require("../../../assets/icons/repairman-female.png")}></img>}
                    <h3>{profile.username}</h3>
                </div>
                <div className='listItem-info'>
                    <p className="poslovi">Odradjeni poslovi: <strong>{profile.jobsRatedCount}</strong></p>
                    <div className="ocena">
                        <img className="avatar" alt="slika" src={require("../../../assets/icons/star.png")} style={{ height: '25px' }}></img>
                        <h2>  {profile.rating.toFixed(1)}</h2>
                    </div>
                    <div className="ime">
                        <h1>{profile.name + " " + profile.surname}</h1>
                        <h2>{profile.category}</h2>
                    </div>
                    <div style={{ width: '100%', height: '1px', backgroundColor: 'rgb(216, 216, 216)' }}></div>
                    <div className="ostaloinfo">
                        <img className="avatar" alt="slika" src={require("../../../assets/icons/spot.png")} style={{ height: '20px' }}></img>
                        <p>{profile.city}</p>
                        <img className="avatar" alt="slika" src={require("../../../assets/icons/city.png")} style={{ height: '20px' }}></img>
                        <p>{profile.adress}</p>
                        <img className="avatar" alt="slika" src={require("../../../assets/icons/phone.png")} style={{ height: '20px' }}></img>
                        <p>{profile.number}</p>
                    </div>
                </div>

                <div className="listItem-contact">
                    <Link to={`/user/search/repairmanprofile/${profile.handle}`}>
                        <div className="seeprofile">
                            <img className="avatar" alt="slika" src={require("../../../assets/icons/zoom.png")} style={{ height: '35px' }}></img>
                        </div>
                    </Link>
                    <Link to={`/user/search/sendrequest/${profile.handle}`}>
                        <div className="hire">
                            <img className="avatar" alt="slika" src={require("../../../assets/icons/hired.png")} style={{ height: '35px' }}></img>
                        </div>
                    </Link>
                </div>
            </div >
        )
    }
}

ListItem.propTypes = {
    profile: PropTypes.object.isRequired
}

export default ListItem;