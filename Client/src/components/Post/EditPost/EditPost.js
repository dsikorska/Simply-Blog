import React from 'react';
import Axios from '../../../axios-api';

class EditPost extends React.Component {
    state = {
        post: {
            title: '',
            content: '',
            image: ''
        },
        loading: true
    }

    componentDidMount() {
        if (this.state.post.title === '') {
            this.setState({ loading: true });
            Axios.get('/api/blog/' + this.props.match.params.id)
                .then(response => {
                    this.setState({ post: response.data, loading: false });
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }

    onFormSubmitHandler = (e) => {
        e.preventDefault();
        let post = new FormData(e.target);

        Axios.patch('/api/blog/' + this.state.post.id, post)
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
                <input hidden name="id" ref="id" defaultValue={this.state.post.id}></input>
                <input placeholder="Title" name="title" ref="title" required defaultValue={this.state.post.title} />
                {this.state.post.imageUri ? <img src={Axios.defaults.baseURL + this.state.post.imageUri} alt={this.state.post.title} /> : null}
                <input type="file" name="image" ref="image" accept="image/*" />
                <textarea placeholder="Content" name="content" ref="content" required defaultValue={this.state.post.content}></textarea>
                <button type="submit">Save</button>
            </form>
        )
    }
}

export default EditPost;