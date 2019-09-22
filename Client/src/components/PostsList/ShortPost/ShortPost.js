import React from 'react';
import styles from './ShortPost.module.css';
import { Link } from 'react-router-dom'
import Axios from '../../../axios-api';

const shortPost = (props) => {
    return (
        <div className={styles.Panel}>
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
                <div className={styles.PanelHeader}>
                    <h3>{props.title}</h3>
                </div>
                <div className={styles.PanelBody}>
                    {props.image ?
                        <div className={styles.PanelImg}>
                            <img src={Axios.defaults.baseURL + props.image} alt="" />
                        </div>
                        : null}
                    <p>{props.content.substring(0, 200)}...</p>
                </div>
                <div className={styles.PanelFooter}>
                    <small>{props.date}</small>
                </div>
            </Link>
        </div>
    );
};

export default shortPost;