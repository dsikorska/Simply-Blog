import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import ShortPost from './Post/ShortPost';
import Axios from '../../axios-api';
import Spinner from '../UI/Spinner/Spinner';

class PostsList extends Component {
    state = {
        posts: null,
        loading: true
    }

    componentDidMount() {
        if (!this.state.posts) {
            this.setState({ loading: true });
            Axios.get('blog/posts/0')
                .then(response => {
                    this.setState({ posts: response.data, loading: false });
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }

    render() {
        let posts = <p>No posts!</p>

        if (this.state.loading) {
            posts = <Spinner />
        }

        if (this.state.posts && this.state.posts.length !== 0) {
            posts = this.state.posts.map(post => {
                const fullDate = new Date(Date.parse(post.created));

                return <ShortPost
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    date={fullDate.toDateString()}
                    content={post.content}
                    image={post.image} />
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