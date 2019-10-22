import React, { Component } from 'react';
import './Post.module.css';
import { getPostAsync } from '../../httpClient';
import Spinner from '../../components/UI/Spinner/Spinner';
import Comments from './Comments/Comments';
import Panel from '../../components/UI/Panel/Panel';
import { EditorState, convertFromRaw } from 'draft-js';
import RichTextbox, { getPluginsDecorators } from '../../components/UI/RichTextbox/RichTextbox';
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
            getPostAsync(this.props.match.params.id).then(data => {
                const post = {
                    ...data
                };
                const contentState = convertFromRaw(JSON.parse(data.content));
                const decorators = getPluginsDecorators();
                const content = EditorState.createWithContent(contentState, decorators);
                document.title = post.title;
                this.setState({ post: post, content: content, loading: false });
            });
        }
    }

    render() {
        const tags = this.state.post ? this.state.post.categories.map(tag => {
            return (<span key={tag + "tg"}><FontAwesomeIcon icon={faTag} />{tag}</span>);
        }) : null;
        const post = !this.state.loading ? (
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
                        {this.state.post.imageUri ? <img src={this.state.post.imageUri} alt="" /> : null}
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