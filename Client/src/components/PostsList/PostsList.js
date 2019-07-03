import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Post from './Post/Post';
import Axios from 'axios';
import Spinner from '../UI/Spinner/Spinner';

class PostsList extends Component {
    state = {
        posts: null,
        loading: false
    }

    componentDidMount() {
        if (!this.state.posts) {
            Axios.get('https://simplyblog.azurewebsites.net/api/blog/all')
                .then(response => {
                    this.setState({ posts: response.data, loading: false });
                });
            this.setState({ loading: true });
        }
    }

    render() {
        let posts = <p>No posts!</p>

        if (this.state.loading) {
            posts = <Spinner />
        }

        if (this.state.posts) {
            posts = this.state.posts.map(post => {
                const fullDate = new Date(Date.parse(post.created));

                return <Post
                    key={new Date().getTime()}
                    title={post.title}
                    date={fullDate.toDateString()}
                    content={post.content} />
            });
        }

        return (
            <Auxiliary>
                {posts}
            </Auxiliary>
        );
    }
};

export default PostsList;