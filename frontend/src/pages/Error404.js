import React, { Component } from 'react';
import { withRouter } from "react-router-dom";

class Error404 extends Component {
    render() {
        return (
            <div
                className="animated fadeIn"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh',
                    position: 'relative'
                }}>
                <img alt="401error" src={require("../assets/notfound.png")} style={{ height: '400px', maxWidth: '100%' }}></img>
                <h1
                    style={{
                        color: 'rgb(31,41,68)',
                        fontSize: '100px',
                        marginTop: '0px',
                        marginBottom: '0px'
                    }}>
                    404 ERROR
                        </h1>
                <h2
                    style={{
                        color: 'gray',
                        fontSize: '30px',
                        marginTop: '5px'
                    }}>
                    NOT FOUND
                        </h2>
                <div onClick={() => this.props.history.go(-3)}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row',
                        position: 'absolute',
                        top: '10px',
                        left: '0',
                        useSelect: 'none',
                        cursor: 'pointer'
                    }}>
                    <img alt="404error" src={require("../assets/icons/down-arrow.png")} style={{ height: '50px', transform: 'rotate(90deg)' }}></img>
                    <h2
                        style={{
                            color: 'gray',
                            fontSize: '30px',
                            marginTop: '-5px',
                            marginBottom: '0'
                        }}>
                        NAZAD
                            </h2>
                </div>
            </div>
        )
    }
}

export default withRouter(Error404);
