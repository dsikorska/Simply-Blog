import React from 'react';
import { Link } from 'react-router-dom'
import Axios from '../../../axios-api';
import Panel from './../../UI/Panel/Panel';
import Button from './../../UI/Button/Button';

const shortPost = (props) => {
    return (
        <Panel>
            <Link to={{ pathname: props.title + '/' + props.id }}>
                <Panel.header>
                    <h3>{props.title}</h3>
                    {props.isLogged ? (
                        <div>
                            <Link to={{ pathname: '/edit/' + props.title + '/' + props.id }}>
                                <Button btnType="Secondary">Edit</Button>
                            </Link>
                            <Button btnType="Danger" onClick={props.onDelete}>Delete</Button>
                        </div>
                    )
                        : null}
                </Panel.header>
                <Panel.body>
                    {props.image ?
                        <Panel.body.img>
                            <img src={Axios.defaults.baseURL + props.image} alt="" />
                        </Panel.body.img>
                        : null}
                    <p>{props.content.substring(0, 200)}...</p>
                </Panel.body>
                <Panel.footer>
                    <small>{props.date}</small>
                </Panel.footer>
            </Link>
        </Panel>
    );
};

export default shortPost;