import React from "react"

class BlockStyleButton extends React.Component {
    onToggle = (e) => {
        e.preventDefault()
        this.props.onToggle(this.props.style)
    }

    render() {
        let className = "styleButton"
        if (this.props.active) {
            className += "activeButton"
        } return (
            <button type="button" className={className} onClick={this.onToggle}>
                {this.props.label}
            </button>
        );
    }
} export default BlockStyleButton