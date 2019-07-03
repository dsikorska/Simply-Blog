import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Post from './Post/Post';
import Axios from 'axios';

class PostsList extends Component {
    state = {
        posts: null
    }

    componentDidMount() {
        if (!this.state.posts) {
            Axios.get('https://simplyblog.azurewebsites.net/api/blog/all')
                .then(response => {
                    this.setState({ posts: response.data });
                });
        }
    }

    render() {
        let posts = <p>Currently no posts added!</p>;

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