import React, { Component } from 'react';

import "../../style/admin-components/list-item.scss";

class RatingListItem extends Component {

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

    render() {
        return (
            <div className='listItem-holder'>
                <div className='listItemm animated fadeIn'>
                    <div className='listItem-avatarr'>
                        {
                            (this.props.user.gender === "M")
                            ?
                            (<img className="avatar" alt="slika" src={require("../../assets/icons/user.png")}></img>)
                            :
                            (<img className="avatar" alt="slika" src={require("../../assets/icons/user-female.png")}></img>)
                        }
                        <h4>{this.formatDate(this.props.zahtev.scheduledDate)}</h4>
                    </div>
                    <div className='listItem-ocena'>
                        <div className="ime">
                            <h2>{this.props.user.name + " " + this.props.user.surname}</h2>
                        </div>
                        <div style={{ width: '100%', height: '1px', backgroundColor: 'rgb(216, 216, 216)' }}></div>
                        <div className="ostaloinfo">
                            <div style={{display:'flex',flexDirection:'row'}}>
                                <img className="avatar" alt="slika" src={require("../../assets/icons/graded.png")} style={{ height: '50px',marginTop:'20px' }}></img>
                                <h1 style={{fontSize:'45px',marginLeft:'15px',marginTop:'25px',color:'rgb(255, 200, 80)'}}>{this.props.zahtev.rate}</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default RatingListItem;