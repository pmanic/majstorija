import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import classnames from "classnames";
import ListOfProfiles from "../repairman-components/profil/listOfProfiles";
import { getAllKategorije } from "../../redux/actions/categoriesActions";
import { searchRepairman } from "../../redux/actions/profileActions";

import "../../style/user-components/searchRepairman.scss";

class SearchRepairman extends Component {
    constructor() {
        super();
        this.state = {
            search: '',
            category: '',
            rating: '',
            city: '',
            showFilter: false,
        }

        this.onChange = this.onChange.bind(this);
    };

    componentDidMount() {            
        this.props.getAllKategorije();
    }

    onSearch = () => {
        let search = {
            search: this.state.search,
            category: this.state.category,
            rating: this.state.rating,
            city: this.state.city
        }
        this.props.searchRepairman(search);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    showFilterHandler = () => {
        this.setState((prevState) => {
            return { showFilter: !prevState.showFilter };
        });
    }

    render() {
        let search;

        if(this.props.kategorije.kategorije === null || this.props.kategorije === 'unknown'){
            search = <img alt="slika" src="http://icon-library.com/images/spinner-icon-gif/spinner-icon-gif-24.jpg" style={{ height: '150px' }}></img>
        }
        else{
            search=(
                <div
                className="animated fadeIn"
                style={{
                    top: '0',
                    bottom: '0',
                    left: '0',
                    margin: 'auto',
                    width: '100%',
                    height:'100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'initial'
                }}>
                <div className="naslov"><h1>Pronadjite svog majstora</h1></div>
                <div className="searchContainer">
                    <div className="searchAndFilter">
                        <div className="filter" onClick={this.showFilterHandler}>
                            <p>Filteri</p>
                            <img alt="slika" className={classnames({ 'iconclosed': this.state.showFilter }, { 'iconopen': !this.state.showFilter })} src={require("../../assets/icons/down-arrow.png")}></img>
                        </div>
                        <div className="spacer"></div>
                        <input
                            type="text"
                            name="search"
                            className="searchInput"
                            placeholder="Pretražite"
                            value={this.state.search}
                            onChange={this.onChange}
                        />
                        <div
                            type="button"
                            onClick={this.onSearch}
                            className="searchButton"
                        >
                            <img alt="slika" src={require("../../assets/icons/search.png")}></img>
                        </div>
                    </div>
                    <div className={classnames({ 'filterContainer': this.state.showFilter }, { 'noFilterContainer': !this.state.showFilter })}>
                        <label className="label">Kategorija:</label>
                        <select
                            type="select"
                            name="category"
                            className="select-input"
                            value={this.state.category}
                            onChange={this.onChange}
                            size="1"
                        >
                            <option defaultvalue="Bez kategorije">Bez kategorije</option>
                            {this.props.kategorije.kategorije.map(kategorija => {
                                return <option value={kategorija.categoryTitle}>{kategorija.categoryTitle}</option>
                            })}
                        </select>
                        <label className="label">Ocena:</label>
                        <select
                            type="select"
                            name="rating"
                            className="select-input"
                            value={this.state.rating}
                            onChange={this.onChange}
                            size="1"
                        >
                            <option value="1">1+</option>
                            <option value="2">2+</option>
                            <option value="3">3+</option>
                            <option value="4">4+</option>
                        </select>
                        <label className="label">Grad:</label>
                        <select
                            type="select"
                            name="city"
                            className="select-input"
                            value={this.state.city}
                            onChange={this.onChange}
                            size="1"
                        >
                            <option value="Nis">Nis</option>
                            <option value="Pirot">Beograd</option>
                            <option value="Beograd">Pirot</option>
                        </select>
                        <div className="spacer"></div>
                        <button
                            type="button"
                            onClick={this.onSearch}
                        >Potvrdite</button>
                    </div>

                </div>
                <ListOfProfiles></ListOfProfiles>
            </div >
            )
        }

        return (
            search
        );
    }
}

SearchRepairman.propTypes = {
    getAllKategorije: PropTypes.func.isRequired,
    searchRepairman: PropTypes.func.isRequired,
    kategorije: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    kategorije: state.kategorije
})

export default connect(mapStateToProps, { searchRepairman,getAllKategorije })(SearchRepairman);