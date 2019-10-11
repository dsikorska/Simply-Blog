import React from 'react';
import Panel from './../../../UI/Panel/Panel';
import Button from './../../../UI/Button/Button';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const comment = (props) => {
    return (
        <div className="M30">
            <Panel.header>
                <div style={{ textAlign: "left", width: "80%" }}>
                    <h4 style={{ display: "inline-block", margin: "0" }}>
                        {props.author}
                    </h4>
                    <small style={{ marginLeft: "10px" }}>
                        {props.date}
                    </small>
                </div>
                <div>
                    {props.isLogged ?
                        <Button btnType="Danger" clicked={props.onDelete}>
                            <span><FontAwesomeIcon icon={faMinus} /></span>
                            Delete
                            </Button> : null}
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