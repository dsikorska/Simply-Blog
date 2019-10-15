import React from 'react';
import StyleButton from './StyleButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBold, faItalic, faUnderline, faHighlighter, faStrikethrough, faCode } from '@fortawesome/free-solid-svg-icons';

const INLINE_STYLES = [
    { label: <FontAwesomeIcon icon={faBold} size="lg" />, style: 'BOLD' },
    { label: <FontAwesomeIcon icon={faItalic} size="lg" />, style: 'ITALIC' },
    { label: <FontAwesomeIcon icon={faUnderline} size="lg" />, style: 'UNDERLINE' },
    { label: <FontAwesomeIcon icon={faCode} size="lg" />, style: 'CODE' },
    { label: <FontAwesomeIcon icon={faHighlighter} size="lg" />, style: 'HIGHLIGHT' },
    { label: <FontAwesomeIcon icon={faStrikethrough} size="lg" />, style: 'STRIKETHROUGH' },
]

const inlineStyleToolbar = (props) => {

    const currentStyle = props.editorState.getCurrentInlineStyle();

    return (
        <span>
            {INLINE_STYLES.map(type => {
                return (
                    <StyleButton
                        active={currentStyle.has(type.style)}
                        label={type.label}
                        onToggle={props.onToggle}
                        style={type.style}
                        key={type.style}
                    />
                );
            })}
        </span>
    );
}

export default inlineStyleToolbar;