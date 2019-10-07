import React from 'react';
import Panel from './../../../UI/Panel/Panel';
import Button from './../../../UI/Button/Button';

const comment = (props) => {
    return (
        <div className="M30">
            <Panel.header>
                <div style={{ textAlign: "left" }}>
                    <h4 style={{ margin: "5px 0" }}>{props.author}</h4>
                    <small style={{ margin: "5px 0" }}>{props.date}</small>
                </div>
                <div>
                    {props.isLogged ? <Button btnType="Danger" clicked={props.onDelete}>Delete</Button> : null}
                </div>
            </Panel.header>
            <Panel.body>
                <div className="Container" style={{ textAlign: "left" }}>
                    <span style={{ margin: "0 !important" }} className="Content">{props.content}</span>
                </div>
            </Panel.body>
        </div>
    );
};

export default comment;