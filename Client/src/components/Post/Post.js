import React, { Component } from 'react';
import './Post.module.css';
import Axios from '../../axios-api';
import Spinner from '../UI/Spinner/Spinner';
import Comments from './Comments/Comments';
import Panel from './../UI/Panel/Panel';

class Post extends Component {
    state = {
        post: null,
        loading: true
    }

    componentDidMount() {
        if (!this.state.post) {
            this.setState({ loading: true });
            Axios.get('/api/blog/' + this.props.match.params.id)
                .then(response => {
                    this.setState({ post: response.data, loading: false });
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }

    render() {
        const tags = this.state.post ? this.state.post.categories.map(tag => {
            return '#' + tag;
        }) : null;
        const post = this.state.post ? (
            <div>
                <Panel.body>
                    <div className="Container">
                        <h1 style={{ width: "100%", margin: "auto" }}>{this.state.post.title}</h1>
                        <h4 style={{ margin: "5px 0" }}>{new Date(this.state.post.created).toLocaleDateString()}</h4>
                        <p style={{ margin: "auto" }}>{tags.join(' ')}</p>
                    </div>
                    <div className="Container">
                        {this.state.post.imageUri ? <img src={Axios.defaults.baseURL + this.state.post.imageUri} alt="" /> : null}
                        <p className="Content">
                            {this.state.post.content}
                        </p>
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