import React from 'react';
import './style.scss';

export default function(props) {
    return (
        <div className="card">
            <h4>{props.name}</h4>
            <img src={props.img} className="card--avatar" />
            {
                props.occupation.map(job => <p>{job}</p>)
            }
        </div>
    )
}