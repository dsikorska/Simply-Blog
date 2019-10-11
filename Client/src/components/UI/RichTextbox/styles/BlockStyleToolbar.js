import React from 'react';
import StyleDropdown from './StyleDropdown';
import StyleButton from './StyleButton';

const BLOCK_TYPES = [
    { label: " “ ” ", style: "blockquote" },
    { label: "***", style: "unordered-list-item" },
    { label: "123", style: "ordered-list-item" },
    { label: "{ }", style: 'code-block' }
];

const BLOCK_TYPE_HEADINGS = [
    { label: "H1", style: "header-one" },
    { label: "H2", style: "header-two" },
    { label: "H3", style: "header-three" },
    { label: "H4", style: "header-four" },
    { label: "H5", style: "header-five" },
    { label: "H6", style: "header-six" }
];

export function getBlockStyle(block) {
    switch (block.getType()) {
        case "blockquote":
            return "blockquote";
        default:
            return null;
    }
};

const blockStyleToolbar = (props) => {
    const { editorState } = props;
    const selection = editorState.getSelection();
    const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();

    return (
        <span>
            {BLOCK_TYPES.map(type => {
                return (
                    <StyleButton
                        active={type.style === blockType}
                        label={type.label}
                        onToggle={props.onToggle}
                        style={type.style}
                        key={type.label}
                        class={type.style.toLowerCase()}
                    />
                );
            })}

            <StyleDropdown
                options={BLOCK_TYPE_HEADINGS}
                active={blockType}
                onToggle={props.onToggle}
                title="Headings Levels"
            />
        </span>
    );
}

export default blockStyleToolbar;