import React from 'react';
import Axios from '../../../axios-api';
import styles from './EditPost.module.css';
import Button from './../../UI/Button/Button';

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
                <input className={styles.Input} placeholder="Title" name="title" ref="title" required defaultValue={this.state.post.title} />
                <div className={styles.Img}>
                    {this.state.post.imageUri ?
                        <div className={styles.Block}>
                            <img src={Axios.defaults.baseURL + this.state.post.imageUri} alt={this.state.post.title} />
                        </div>
                        : null}
                    <div className={styles.Block}>
                        <input type="file" name="image" ref="image" accept="image/*" />
                    </div>
                </div>
                <textarea className={styles.Textarea} placeholder="Content" name="content" ref="content" required defaultValue={this.state.post.content}></textarea>
                <div className={styles.Button}>
                    <Button btnType="Success">Save</Button>
                </div>
            </form>
        )
    }
}

export default EditPost;