import React from 'react';

const comment = (props) => {
    return (
        <div className="card">
            <button onClick={props.onDelete}>Delete</button>
            <h4>{props.author}</h4>
            <h5>{props.date}</h5>
            <p>{props.content}</p>
        </div>
    );
};

export default comment;