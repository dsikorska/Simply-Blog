import React from 'react';
import StyleButton from './StyleButton';

const INLINE_STYLES = [
    { label: 'B', style: 'BOLD' },
    { label: 'I', style: 'ITALIC' },
    { label: 'U', style: 'UNDERLINE' },
    { label: 'Code', style: 'CODE' },
    { label: 'H', style: 'HIGHLIGHT' },
    { label: 'abc', style: 'STRIKETHROUGH' },
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
                        key={type.label}
                        class={type.style.toLowerCase()}
                    />
                );
            })}
        </span>
    );
}

export default inlineStyleToolbar;