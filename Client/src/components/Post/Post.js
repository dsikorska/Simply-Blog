import React, { Component } from 'react';
import styles from './Post.module.css';
import Axios from '../../axios-api';
import Spinner from '../UI/Spinner/Spinner';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
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
                    <h2>{this.state.post.title}</h2>
                    <h5>Created: {new Date(this.state.post.created).toDateString()}</h5>
                </Panel.header>
                <Panel.body>
                    <div className={styles.Container}>
                        {this.state.post.imageUri ? <img src={Axios.defaults.baseURL + this.state.post.imageUri} alt="" className={styles} /> : null}
                        <p className={styles.Content}>
                            {this.state.post.content}
                        </p>
                    </div>
                </Panel.body>
                <Panel.footer>
                    <h5>Last modified: {new Date(this.state.post.lastModified).toDateString()}</h5>
                </Panel.footer>
                <Comments id={this.state.post.id} />
            </div>) : <Spinner />

        return (
            <Auxiliary>
                {post}
            </Auxiliary>
        );
    }
};

export default Post;