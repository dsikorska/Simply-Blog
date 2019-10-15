import React from 'react';
import Axios, { options } from '../../../axios-api';
import Spinner from './../../UI/Spinner/Spinner';
import Comment from './Comment/Comment';
import NewComment from './NewComment/NewComment';
import { connect } from 'react-redux';
import Panel from '../../UI/Panel/Panel';

class Comments extends React.Component {
    state = {
        comments: null,
        loading: true
    }

    componentDidMount() {
        if (!this.state.comments) {
            this.loadComments();
        }
    }

    onDeleteCommentHandler = (id) => {
        if (!this.props.isLogged) {
            return;
        }

        if (!window.confirm("Are you sure?")) {
            return;
        }

        Axios.delete('/api/blog/' + this.props.id + '/' + id, options(this.props.token))
            .then(response => {
                const comments = this.state.comments.filter(e => e.id !== id);
                this.setState({ comments: comments });
            })
            .catch(err => {
                console.log(err);
            })
    }

    loadComments = () => {
        this.setState({ loading: true });
        Axios.get('/api/blog/comments/' + this.props.id)
            .then(response => {
                this.setState({ comments: response.data, loading: false });
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        let comments = <Panel.body><p>No comments!</p></Panel.body>

        if (this.state.loading) {
            comments = <Spinner />
        }

        if (this.state.comments && this.state.comments.length !== 0) {
            comments = this.state.comments.map(comment => {
                const fullDate = new Date(Date.parse(comment.created));

                return (
                    <Comment
                        key={comment.created}
                        author={comment.author}
                        date={fullDate.toDateString()}
                        content={comment.content}
                        onDelete={() => this.onDeleteCommentHandler(comment.id)}
                        isLogged={this.props.isLogged} />
                )
            });
        }

        return (
            <div>
                <NewComment id={this.props.id} submit={this.loadComments} />
                {comments}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLogged: state.auth.isLogged,
        token: state.auth.token
    }
}

export default connect(mapStateToProps)(Comments);