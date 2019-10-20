import React from 'react';
import { deleteCommentAsync } from '../../../httpClient';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Comment from '../../../components/Post/Comments/Comment/Comment';
import NewComment from './NewComment/NewComment';
import { connect } from 'react-redux';
import Panel from '../../../components/UI/Panel/Panel';
import { getCommentsAsync } from '../../../httpClient';

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

        this.setState({ loading: true });
        deleteCommentAsync(this.props.id, id, this.props.token).then(data => {
            const comments = this.state.comments.filter(e => e.id !== id);
            this.setState({ comments: comments, loading: false });
        });
    }

    loadComments = () => {
        this.setState({ loading: true });
        getCommentsAsync(this.props.id).then(data => {
            this.setState({ comments: data, loading: false });
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