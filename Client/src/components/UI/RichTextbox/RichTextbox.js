import React from 'react';
import { EditorState, RichUtils, AtomicBlockUtils, CompositeDecorator } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import BlockStyleToolbar, { getBlockStyle } from "./styles/BlockStyleToolbar";
import { mediaBlockRenderer } from './entities/mediaBlockRenderer';
import createLinkifyPlugin from 'draft-js-linkify-plugin';
import 'draft-js-linkify-plugin/lib/plugin.css';
import MultiDecorator from "draft-js-plugins-editor/lib/Editor/MultiDecorator";
import createHighlightPlugin from './plugins/hightlightPlugin';
import addLinkPlugin from './plugins/addLinkPlugin';
import InlineStyleToolbar from './styles/InlineStyleToolbar';

const plugins = [createLinkifyPlugin(), createHighlightPlugin(), addLinkPlugin];

function getPluginsDecoratorsArray() {
    let decorators = [];
    let plugin;
    for (plugin of plugins) {
        if (plugin.decorators !== null && plugin.decorators !== undefined) {
            decorators = decorators.concat(plugin.decorators);
        }
    }
    return decorators;
}

export function getPluginsDecorators() {
    return new MultiDecorator(
        [new CompositeDecorator(getPluginsDecoratorsArray())]
    );
}

class RichTextbox extends React.Component {
    toggleBlockType = (blockType) => {
        this.onEditorChange(RichUtils.toggleBlockType(this.props.editorState, blockType));
    };

    toggleInlineStyle = (inlineStyle) => {
        this.onEditorChange(RichUtils.toggleInlineStyle(this.props.editorState, inlineStyle));
    }

    onEditorChange = (editorState) => {
        if (this.props.onEditorChange) {
            this.props.onEditorChange(editorState);
        }
    }

    handleEditorKeyCommand = (command) => {
        const newState = RichUtils.handleKeyCommand(this.props.editorState, command);
        if (newState) {
            this.onEditorChange(newState);
            return 'handled';
        }
        return 'not-handled';
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

    onAddImage = e => {
        e.preventDefault();
        const editorState = this.props.editorState;
        const urlValue = window.prompt("Paste image link: ");
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

        this.onEditorChange(
            AtomicBlockUtils.insertAtomicBlock(
                newEditorState,
                entityKey,
                " "
            )
        );
    };

    focus = () => this.refs.editor.focus();

    render() {
        return (
            <div>
                {!this.props.readOnly ?
                    <div className="toolbar">
                        <InlineStyleToolbar
                            editorState={this.props.editorState}
                            onToggle={this.toggleInlineStyle}
                        />

                        <button type="button" id="link_url" onClick={this.onAddLink} className="styleButton">
                            UR
                        </button>
                        <button type="button" className="styleButton" onClick={this.onAddImage}>
                            IMG
                        </button>

                        <BlockStyleToolbar
                            editorState={this.props.editorState}
                            onToggle={this.toggleBlockType}
                        />
                    </div> : null}
                <div onClick={this.focus} className={this.props.readOnly ? "readOnly" : null}>
                    <Editor
                        editorState={this.props.editorState}
                        onChange={this.onEditorChange}
                        handleKeyCommand={this.handleEditorKeyCommand}
                        plugins={plugins}
                        blockStyleFn={getBlockStyle}
                        ref="editor"
                        blockRendererFn={mediaBlockRenderer}
                        readOnly={this.props.readOnly}
                        spellCheck={true}
                    />
                </div>
            </div>
        )
    }
}

export default RichTextbox;