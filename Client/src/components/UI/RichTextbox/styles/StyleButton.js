import React from "react"

const blockStyleButton = (props) => {
    const onToggle = (e) => {
        e.preventDefault()
        props.onToggle(props.style)
    }

    let className = "styleButton " + props.class
    if (props.active) {
        className += " activeButton"
    }

    return (
        <button type="button" className={className} onMouseDown={onToggle}>
            {props.label}
        </button>
    );
}

export default blockStyleButton;