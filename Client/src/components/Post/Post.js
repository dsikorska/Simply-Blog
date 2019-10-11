import React, { Component } from 'react';
import './Post.module.css';
import Axios from '../../axios-api';
import Spinner from '../UI/Spinner/Spinner';
import Comments from './Comments/Comments';
import Panel from './../UI/Panel/Panel';
import { EditorState, convertFromRaw } from 'draft-js';
import RichTextbox, { getPluginsDecorators } from '../UI/RichTextbox/RichTextbox';
import { faCalendar, faTag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Post extends Component {
    state = {
        post: null,
        content: "",
        loading: true
    }

    componentDidMount() {
        if (!this.state.post) {
            this.setState({ loading: true });
            Axios.get('/api/blog/' + this.props.match.params.id)
                .then(response => {
                    const post = {
                        ...response.data
                    };
                    const contentState = convertFromRaw(JSON.parse(response.data.content));
                    const decorators = getPluginsDecorators();
                    const content = EditorState.createWithContent(contentState, decorators);

                    this.setState({ post: post, content: content, loading: false });
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }

    render() {
        const tags = this.state.post ? this.state.post.categories.map(tag => {
            return (<span key={tag + "tg"}><FontAwesomeIcon icon={faTag} />{tag}</span>);
        }) : null;
        const post = this.state.post ? (
            <div>
                <Panel.body>
                    <div className="Container">
                        <h1 style={{ width: "100%", margin: "auto" }}>{this.state.post.title}</h1>
                        <h4 style={{ margin: "5px 0" }}>
                            <span><FontAwesomeIcon icon={faCalendar} /></span>
                            {new Date(this.state.post.created).toLocaleDateString()}</h4>
                        <p style={{ margin: "auto" }}>{tags}</p>
                    </div>
                    <div className="Container">
                        {this.state.post.imageUri ? <img src={Axios.defaults.baseURL + this.state.post.imageUri} alt="" /> : null}
                        <div className="Content">
                            <RichTextbox editorState={this.state.content} readOnly={true} />
                        </div>
                    </div>
                </Panel.body>
                <Comments id={this.state.post.id} />
            </div>) : <Spinner />

        return (
            <div className="Container">
                {post}
            </div>
        );
    }
};

export default Post;