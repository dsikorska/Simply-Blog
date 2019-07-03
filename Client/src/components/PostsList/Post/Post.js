import React from 'react';

const post = (props) => {
    return (
        <div className="card">
            <h2>{props.title}</h2>
            <h5>{props.date}</h5>
            <div className="fakeimg" style={{ height: '200px' }}>Image</div>
            <p>{props.content}</p>
        </div>
    );
};

export default post;