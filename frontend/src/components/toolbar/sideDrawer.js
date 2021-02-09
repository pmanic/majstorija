import React,{ Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { logoutUser } from "../../redux/actions/authActions";
import { clearCurrentProfile } from "../../redux/actions/profileActions";
import PropTypes from "prop-types";

import "../../style/toolbar/sideDrawer.scss";
import "../../style/User.scss";

class sideDrawer extends Component {
    constructor() {
        super();
        this.state = {
        };
    }

    onLogoutClick(e) {
        e.preventDefault();
        this.props.clearCurrentProfile();
        this.props.logoutUser();
        this.props.history.push("/");
    }

    render(){
    let drawerClasses = 'side-drawer';
    let drawerClassesUser = 'side-drawer';
    let drawerClassesAdmin = 'side-drawer';
    let drawerClassesRepairman = 'side-drawer';
    if (this.props.show) {
        drawerClasses = 'side-drawer open';
    }
    if (this.props.showUser) {
        drawerClassesUser = 'side-drawer open';
    }
    if (this.props.showAdmin) {
        drawerClassesAdmin = 'side-drawer open';
    }
    if (this.props.showRepairman) {
        drawerClassesRepairman = 'side-drawer open';
    }

    return (
        <div>
            <nav className={drawerClasses}>
                <ul>
                    <li><Link to="/login"><button className="b1" onClick={this.props.click}>Prijavite se</button></Link></li>
                    <li><Link to="/register"><button className="b2" onClick={this.props.click}>Registrujte se</button></Link></li>
                </ul>
            </nav>
            <nav className={drawerClassesUser}>
                <ul>
                    <li>
                        <Link to="/user/search"><button className="b3" onClick={this.props.click}>Pretražite majstora</button></Link>
                        <Link to="/user/history"><button className="b3" onClick={this.props.click}>Istorija konekcija</button></Link>
                        <Link to="/user/accepted"><button className="b3" onClick={this.props.click}>Odobreni zahtevi</button></Link>
                        <Link to="/user/declined"><button className="b3" onClick={this.props.click}>Odbijeni zahtevi</button></Link>
                        <button  className="b3" style={{ position: 'absolute', bottom: '0' }} onClick={this.onLogoutClick.bind(this)}>Odjavite se</button>
                    </li>
                </ul>
            </nav>
            <nav className={drawerClassesAdmin}>
                <ul>
                    <li>
                        <Link to="/admin/listofusers"><button className="b3" onClick={this.props.click}>Lista korisnika</button></Link>
                        <Link to="/admin/listofrepairmans"><button className="b3" onClick={this.props.click}>Lista majstora</button></Link>
                        <Link to="/admin/allconnections"><button className="b3" onClick={this.props.click}>Konekcije</button></Link>
                        <Link to="/admin/zahtevi"><button className="b3" onClick={this.props.click}>Zahtevi</button></Link>
                        <button className="b3" style={{ position: 'absolute', bottom: '0' }} onClick={this.onLogoutClick.bind(this)}>Odjavite se</button>
                    </li>
                </ul>
            </nav>
            <nav className={drawerClassesRepairman}>
                <ul>
                    <li>
                        <Link to="/repairman/newreq"><button className="b3" onClick={this.props.click}>Zahtevi</button></Link>
                        <Link to="/repairman/acceptedreq"><button className="b3" onClick={this.props.click}>Prihvaćeni zahtevi</button></Link>
                        <Link to="/repairman/archivedreq"><button className="b3" onClick={this.props.click}>Arhivirani zahtevi</button></Link>
                        <Link to="/repairman/rating"><button className="b3" onClick={this.props.click}>Ocene</button></Link>
                        <Link to="/repairman/planer"><button className="b3" onClick={this.props.click}>Planer</button></Link>
                        <button className="b3" style={{ position: 'absolute', bottom: '0' }} onClick={this.onLogoutClick.bind(this)}>Odjavite se</button>
                    </li>
                </ul>
            </nav>
        </div>
    );
    }
};

sideDrawer.propTypes = {
    logoutUser: PropTypes.func.isRequired
}

export default connect(null, { logoutUser, clearCurrentProfile })(withRouter(sideDrawer));