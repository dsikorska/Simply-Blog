import React from "react";

const styleDropdown = (props) => {
    const onToggle = event => {
        let value = event.target.value
        props.onToggle(value)
    }

    let className = "styleButton";

    return (
        <select value={props.active} onChange={onToggle} className={className}>
            <option value="">{props.title}</option>
            {props.options.map(opt => {
                return (
                    <option value={opt.style} key={opt.label}>
                        {opt.label}
                    </option>
                )
            })}
        </select>
    )
}

export default styleDropdown;