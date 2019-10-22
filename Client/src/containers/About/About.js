import React from 'react';
import styles from './About.module.css'
import Panel from '../../components/UI/Panel/Panel';
import { getAboutAsync, postAboutAsync } from '../../httpClient'
import Button from '../../components/UI/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave } from '@fortawesome/free-solid-svg-icons';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import RichTextbox from '../../components/UI/RichTextbox/RichTextbox';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import { toast } from 'react-toastify';

class About extends React.Component {
    state = {
        image: null,
        loading: true,
        editMode: false,
        editor: EditorState.createEmpty(),
        setImage: false
    }

    onEditorChange = (editorState) => {
        this.setState({ editor: editorState });
    }

    componentDidMount() {
        if (!this.state.editMode) {
            this.getData();
        };
    }

    getData() {
        getAboutAsync().then(data => {
            const content = EditorState
                .createWithContent(convertFromRaw(JSON.parse(data.about)));
            this.setState({ image: data.imageUri, loading: false, editor: content });
        });
    }

    submitFormHandler = (e) => {
        e.preventDefault();

        let about = new FormData();
        let content = this.state.editor.getCurrentContent();
        content = convertToRaw(content);
        about.append("about", JSON.stringify(content));

        if (this.state.setImage) {
            about.append("image", this.refs.image.files[0]);
        } else {
            about.append("useExistingImage", "true");
        }
        this.setState({ loading: true });
        postAboutAsync(about, this.props.token).then(data => {
            this.setState({ editMode: false });
            this.getData();
            toast("Data updated successfully!", { type: toast.TYPE.SUCCESS });
        });
    }

    render() {
        return (
            (this.state.loading ? <Spinner /> :
                <Panel.body>
                    <div className={styles.About}>
                        {this.props.isAuthenticated ?
                            <div style={{ width: "100%", textAlign: "right" }}>
                                <Button btnType="Secondary" clicked={() => this.setState({ editMode: !this.state.editMode })}>
                                    <span><FontAwesomeIcon icon={faEdit} /></span>
                                    Edit
                        </Button>
                            </div>
                            : null}
                        {this.state.editMode ?
                            <form onSubmit={this.submitFormHandler}>
                                <div style={{ padding: "0.375rem 0.75rem" }}>
                                    <div style={{ marginBottom: "10px" }}>
                                        <Button btnType="Secondary" type="button" clicked={() => { this.setState({ setImage: !this.state.setImage }) }}>{this.state.setImage ? "Use existing image" : "Set new image"}</Button>
                                        {this.state.setImage ? <input type="file" name="image" ref="image" accept="image/*" className="Input" /> : null}
                                    </div>
                                    {this.state.image ?
                                        <div className="Img">
                                            <img src={this.state.image} alt="" />
                                        </div> : null}
                                </div>
                                <RichTextbox
                                    onEditorChange={this.onEditorChange}
                                    editorState={this.state.editor}
                                />
                                <div className="Button">
                                    <Button btnType="Success">
                                        <span><FontAwesomeIcon icon={faSave} /></span>
                                        Save
                            </Button>
                                </div>
                            </form>
                            :
                            <Auxiliary>
                                <div className={styles.Details}>
                                    <img src={this.state.image} alt="" />
                                    <div style={{ width: "70%" }}>
                                        <RichTextbox
                                            onEditorChange={this.onEditorChange}
                                            editorState={this.state.editor}
                                            readOnly={true}
                                        />
                                    </div>
                                </div>
                            </Auxiliary>}
                    </div>
                </Panel.body>)
        )
    }
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        token: state.auth.token
    };
}

export default connect(mapStateToProps)(About);