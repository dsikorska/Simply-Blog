import React from 'react';
import { Link } from 'react-router-dom'
import Axios from '../../../axios-api';
import Panel from './../../UI/Panel/Panel';
import Button from './../../UI/Button/Button';

const shortPost = (props) => {
    const tags = props.tags.map(tag => {
        return (
            <li key={tag}>
                <button onClick={() => props.tagClicked(tag)}>#{tag}</button>
            </li>
        )
    });

    return (
        <Panel>
            <Panel.header>
                <div style={{ textAlign: "left", width: "80%" }}>
                    <Link to={{ pathname: props.id + '/' + props.title.toLowerCase().replace(' ', '-') }}>
                        <h3 style={{ margin: "10px 0" }}>{props.title}</h3>
                    </Link>
                    <ul className="Tags">{tags}</ul>
                </div>
                {props.isLogged ? (
                    <div>
                        <Link to={{ pathname: '/edit/' + props.id + '/' + props.title.toLowerCase().replace(' ', '-') }}>
                            <Button btnType="Secondary">Edit</Button>
                        </Link>
                        <Button btnType="Danger" clicked={props.onDelete}>Delete</Button>
                    </div>
                )
                    : null}
            </Panel.header>
            <Link to={{ pathname: props.id + '/' + props.title.toLowerCase().replace(' ', '-') }}>
                <Panel.body>
                    {props.image ?
                        <Panel.body.img>
                            <img src={Axios.defaults.baseURL + props.image} alt="" />
                        </Panel.body.img>
                        : null}
                    <p>{props.content.substring(0, 200)}...</p>
                </Panel.body>
                <Panel.footer>
                    <p>{props.date}</p>
                </Panel.footer>
            </Link>
        </Panel>
    );
};

export default shortPost;