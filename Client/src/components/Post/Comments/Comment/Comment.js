import React from 'react';
import Panel from './../../../UI/Panel/Panel';
import Button from './../../../UI/Button/Button';

const comment = (props) => {
    return (
        <div className="M30">
            <Panel.header>
                <div>
                    <h4>{props.author}</h4>
                    <small>{props.date}</small>
                </div>
                <div>
                    {props.isLogged ? <Button btnType="Danger" onClick={props.onDelete}>Delete</Button> : null}
                </div>
            </Panel.header>
            <Panel.body>
                <div className="Container">
                    <p className="Content">{props.content}</p>
                </div>
            </Panel.body>
        </div>
    );
};

export default comment;