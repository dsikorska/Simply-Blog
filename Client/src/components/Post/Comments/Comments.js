import React from 'react';
import Axios from '../../../axios-api';
import Spinner from './../../UI/Spinner/Spinner';
import Comment from './Comment/Comment';

class Comments extends React.Component {
    state = {
        comments: null,
        loading: true
    }

    componentDidMount() {
        if (!this.state.comments) {
            this.setState({ loading: true });
            Axios.get('blog/comments/' + this.props.id)
                .then(response => {
                    this.setState({ post: response.data, loading: false });
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }

    render() {
        let comments = <p>No comments!</p>

        if (this.state.loading) {
            comments = <Spinner />
        }

        if (this.state.comments && this.state.comments.length !== 0) {
            comments = this.state.comments.map(comment => {
                const fullDate = new Date(Date.parse(comment.created));

                return <Comment
                    key={comment.created}
                    author={comment.author}
                    date={fullDate.toDateString()}
                    content={comment.content} />
            });
        }

        return (
            <div>
                {comments}
            </div>
        );
    }
}

export default Comments;