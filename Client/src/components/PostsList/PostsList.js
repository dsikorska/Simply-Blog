import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import ShortPost from './ShortPost/ShortPost';
import Axios from '../../axios-api';
import Spinner from '../UI/Spinner/Spinner';
import { connect } from 'react-redux';

class PostsList extends Component {
    state = {
        posts: null,
        loading: true
    }

    componentDidMount() {
        if (!this.state.posts) {
            this.setState({ loading: true });
            Axios.get('/api/blog/posts/0')
                .then(response => {
                    this.setState({ posts: response.data, loading: false });
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }

    onDeletePost = (id) => {
        if (!this.props.isLogged) {
            return;
        }

        Axios.delete('/api/blog/' + id)
            .then(response => {
                console.log(response);
            })
            .catch(err => {
                console.log(err);
            })
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
                    image={post.imageUri}
                    isLogged={this.props.isLogged}
                    onDelete={() => this.onDeletePost(post.id)} />
            });
        }

        return (
            <Auxiliary>
                {posts}
            </Auxiliary>
        );
    }
};

const mapStateToProps = state => {
    return {
        isLogged: state.auth.isLogged
    }
}

export default connect(mapStateToProps)(PostsList);