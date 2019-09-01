import React, { Component } from 'react';
import Axios from '../../axios-api';
import Spinner from '../UI/Spinner/Spinner';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Comments from './Comments/Comments';

class Post extends Component {
    state = {
        post: null,
        loading: true
    }

    componentDidMount() {
        if (!this.state.post) {
            this.setState({ loading: true });
            Axios.get('blog/' + this.props.match.params.id)
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
                <div className="card" >
                    <h2>{this.state.post.title}</h2>
                    <h5>{this.state.post.date}</h5>
                    <img src={this.state.post.image} alt={this.state.post.title} style={{ height: '200px' }} />
                    <p>{this.state.post.content}</p>
                </div>
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