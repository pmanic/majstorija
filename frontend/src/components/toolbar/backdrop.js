import React from 'react';
import "../../style/toolbar/backdrop.scss";

const backdrop = props => (
    <div className="backdrop" onClick={props.click}></div>
);

export default backdrop;