import React from 'react';
import { Link } from 'react-router-dom'
import Axios from '../../../axios-api';

const shortPost = (props) => {
    return (
        <div className="card">
            {props.isLogged ? (
                <div>
                    <button onClick={props.onDelete}>Delete</button>
                    <Link to={{ pathname: '/edit/' + props.title + '/' + props.id }}>
                        <button>Edit</button>
                    </Link>
                </div>
            )
                : null}
            <Link to={{ pathname: props.title + '/' + props.id }}>
                <h2>{props.title}</h2>
                <h5>{props.date}</h5>
                {props.image ? <img src={Axios.defaults.baseURL + props.image} style={{ height: '200px' }} alt="" /> : null}
                <p>{props.content.substring(0, 200)}...</p>
            </Link>
        </div>
    );
};

export default shortPost;