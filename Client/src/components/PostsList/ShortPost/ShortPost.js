import React from 'react';
import { Link } from 'react-router-dom'
import Axios from '../../../axios-api';

const shortPost = (props) => {
    return (
        <Link to={{ pathname: props.title + '/' + props.id }}>
            <div className="card">
                <h2>{props.title}</h2>
                <h5>{props.date}</h5>
                <img src={Axios.defaults.baseURL + props.image} style={{ height: '200px' }} alt="" />
                <p>{props.content.substring(0, 200)}...</p>
            </div>
        </Link>
    );
};

export default shortPost;