import React from 'react';

import './Dropdown.css';

var filterOptions = [
    { label: "Active", type: "active" },
    { label: "Drunken", type: "drunken" },
    { label: "Has Passenger", type: "hasPassenger" },
    { label: "Login", type: "login" }
];

function Dropdown(props){
    return (
        <div className="Dropdown_container">
            <label className="Dropdown_label">{props.label}</label>
            <select onChange={props.onChangeFilter}
                className="Dropdown">
                <option value="">All</option>
                {filterOptions.map((filter, index) => (
                    <option key={index} value={filter.type}>{filter.label}</option>
                ))}
            </select>
        </div>
    );
}

export default Dropdown;