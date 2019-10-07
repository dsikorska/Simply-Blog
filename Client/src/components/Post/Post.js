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
        const post = this.state.post ? (
            <div>
                <Panel.header>
                    <h2 style={{ width: "100%", textAlign: "left", margin: "0" }}>{this.state.post.title}</h2>
                    <div>
                        <p>tags</p>
                    </div>
                </Panel.header>
                <Panel.body>
                    <div className="Container">
                        {this.state.post.imageUri ? <img src={Axios.defaults.baseURL + this.state.post.imageUri} alt="" /> : null}
                        <p className="Content">
                            {this.state.post.content}
                        </p>
                    </div>
                </Panel.body>
                <Panel.footer>
                    <h5 style={{ margin: "5px 0" }}>Created: {new Date(this.state.post.created).toDateString()}</h5>
                    <h5 style={{ margin: "5px 0" }}>Last modified: {new Date(this.state.post.lastModified).toDateString()}</h5>
                </Panel.footer>
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