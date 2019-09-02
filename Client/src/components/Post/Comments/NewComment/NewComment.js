import React from 'react';
import Axios from '../../../../axios-api';

class newComment extends React.Component {
    onFormSubmitHandler = (e) => {
        e.preventDefault();
        const comment = {
            email: this.refs.email.value,
            author: this.refs.name.value,
            content: this.refs.content.value,
            postId: this.props.id
        }
        Axios.post('/blog/' + this.props.id + '/new', comment)
            .then(response => {
                //do nothing
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        return (
            <form onSubmit={this.onFormSubmitHandler}>
                <input placeholder="Your name" name="name" ref="name" />
                <input type="email" placeholder="Email (required)" name="email" ref="email" required />
                <textarea placeholder="Your text goes here." name="content" ref="content" required></textarea>
                <button type="submit">Save</button>
            </form>
        )
    }
};

export default newComment;