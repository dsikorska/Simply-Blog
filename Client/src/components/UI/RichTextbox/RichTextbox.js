import React from 'react';
import { EditorState, RichUtils, AtomicBlockUtils } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createHightlightPlugin from './plugins/hightlightPlugin';
import addLinkPlugin from './plugins/addLinkPlugin';
import BlockStyleToolbar, { getBlockStyle } from "./blockStyles/BlockStyleToolbar";
import { mediaBlockRenderer } from './entities/mediaBlockRenderer';

class RichTextbox extends React.Component {
    constructor(props) {
        super(props);
        this.plugins = [createHightlightPlugin(), addLinkPlugin,];
    }

    toggleBlockType = (blockType) => {
        this.onEditorChange(RichUtils.toggleBlockType(this.props.editorState, blockType));
    };

    onEditorChange = (editorState) => {
        this.props.onEditorChange(editorState);
    }

    handleEditorKeyCommand = (command) => {
        const newState = RichUtils.handleKeyCommand(this.props.editorState, command);
        if (newState) {
            this.onEditorChange(newState);
            return 'handled';
        }
        return 'not-handled';
    }

    onUnderlineClick = () => {
        this.onEditorChange(RichUtils.toggleInlineStyle(this.props.editorState, 'UNDERLINE'));
    }

    onBoldClick = () => {
        this.onEditorChange(RichUtils.toggleInlineStyle(this.props.editorState, 'BOLD'))
    }

    onItalicClick = () => {
        this.onEditorChange(RichUtils.toggleInlineStyle(this.props.editorState, 'ITALIC'))
    }

    onStrikeThroughClick = () => {
        this.onEditorChange(
            RichUtils.toggleInlineStyle(this.props.editorState, "STRIKETHROUGH")
        );
    };

    onHighlight = () => {
        this.onEditorChange(RichUtils.toggleInlineStyle(this.props.editorState, 'HIGHLIGHT'))
    }

    onAddLink = () => {
        const editorState = this.props.editorState;
        const selection = editorState.getSelection();
        const link = window.prompt('Paste the link: ');
        if (!link) {
            this.onEditorChange(RichUtils.toggleLink(editorState, selection, null));
            return 'handled';
        }

        const content = editorState.getCurrentContent();
        const contentWithEntity = content.createEntity('LINK', 'MUTABLE', { url: link });
        const newEditorState = EditorState.push(editorState, contentWithEntity, 'create-entity');
        const entityKey = contentWithEntity.getLastCreatedEntityKey();
        this.onEditorChange(RichUtils.toggleLink(newEditorState, selection, entityKey))
    }

    onAddImage = (e) => {
        e.preventDefault();
        const editorState = this.props.editorState;
        const urlValue = window.prompt("Paste Image Link");
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(
            "image",
            "IMMUTABLE",
            { src: urlValue }
        );
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = EditorState.set(
            editorState,
            { currentContent: contentStateWithEntity },
            "create-entity"
        );
        this.setState(
            {
                editor: AtomicBlockUtils.insertAtomicBlock(
                    newEditorState,
                    entityKey,
                    " "
                )
            },
            () => {
                setTimeout(() => this.focus(), 0);
            }
        );
    };

    focus = () => this.refs.editor.focus();

    render() {
        return (
            <div>
                <div className="toolbar">
                    <button type="button" className="underline styleButton" onClick={this.onUnderlineClick}>U</button>
                    <button type="button" className="bold styleButton" onClick={this.onBoldClick}><b>B</b></button>
                    <button type="button" className="italic styleButton" onClick={this.onItalicClick}><em>I</em></button>
                    <button type="button" className="highlight styleButton" onClick={this.onHighlight}>
                        <span style={{ background: "yellow" }}>H</span>
                    </button>
                    <button type="button" className="strikethrough styleButton" onClick={this.onStrikeThroughClick}>
                        abc
                    </button>
                    <button type="button" id="link_url" onClick={this.onAddLink} className="add-link styleButton">
                        UR
                    </button>
                    <button type="button" className="styleButton" onClick={this.onAddImage}>
                        IMG
                    </button>
                    <BlockStyleToolbar
                        editorState={this.props.editorState}
                        onToggle={this.toggleBlockType}
                    />
                </div>
                <div>
                    <Editor
                        editorState={this.props.editorState}
                        onChange={this.onEditorChange}
                        handleKeyCommand={this.handleEditorKeyCommand}
                        plugins={this.plugins}
                        blockStyleFn={getBlockStyle}
                        ref="editor"
                        blockRendererFn={mediaBlockRenderer}
                    />
                </div>
            </div>
        )
    }
}

export default RichTextbox;