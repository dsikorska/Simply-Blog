import React from 'react';
import Axios from '../../../axios-api';

class NewPost extends React.Component {

    onFormSubmitHandler = (e) => {
        e.preventDefault();
        const post = {
            title: this.refs.title.value,
            image: this.refs.image.value,
            content: this.refs.content.value,
        }
        Axios.post('/api/blog/new', post)
            .then(response => {
                console.log(response);
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        return (
            <form onSubmit={this.onFormSubmitHandler}>
                <input placeholder="Title" name="title" ref="title" required />
                <input type="file" name="image" ref="image" accept="image/*" />
                <textarea placeholder="Content" name="content" ref="content" required></textarea>
                <button type="submit">Save</button>
            </form>
        )
    }
}

export default NewPost;