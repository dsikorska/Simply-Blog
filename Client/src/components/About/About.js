import React from 'react';
import styles from './About.module.css'
import Panel from '../UI/Panel/Panel';
import Axios, { options } from '../../axios-api';
import Button from '../UI/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave } from '@fortawesome/free-solid-svg-icons';
import Auxiliary from './../../hoc/Auxiliary/Auxiliary';
import RichTextbox from '../UI/RichTextbox/RichTextbox';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { connect } from 'react-redux';

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
            Axios.get("/api/blog/about")
                .then(response => {
                    const content = EditorState
                        .createWithContent(convertFromRaw(JSON.parse(response.data.about)));
                    this.setState({ image: response.data.imageUri, loading: false, editor: content });
                }).catch(err => {
                    console.log(err);
                    this.setState({ loading: false });
                });
        };
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

        Axios.post('/api/admin/about', about, options(this.props.token))
            .then(response => {
                this.setState({ editMode: false });
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        return (
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
                                        <img src={Axios.defaults.baseURL + this.state.image} alt="" />
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
                                <img src={Axios.defaults.baseURL + this.state.image} alt="" />
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
            </Panel.body >
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