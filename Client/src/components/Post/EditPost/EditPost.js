import React from 'react';
import Axios from '../../../axios-api';
import Button from './../../UI/Button/Button';
import Panel from '../../UI/Panel/Panel';
import Spinner from '../../UI/Spinner/Spinner';

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
                this.props.history.push('/');
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        return (
            (!this.state.loading ?
                (<Panel.body>
                    <form onSubmit={this.onFormSubmitHandler}>
                        <input hidden name="id" ref="id" defaultValue={this.state.post.id}></input>
                        <input className="Input" placeholder="Title" name="title" ref="title" required defaultValue={this.state.post.title} />
                        <div className="Img">
                            {this.state.post.imageUri ?
                                <div className="Block">
                                    <img src={Axios.defaults.baseURL + this.state.post.imageUri} alt={this.state.post.title} />
                                </div>
                                : null}
                            <div className="Block">
                                <input type="file" name="image" ref="image" accept="image/*" />
                            </div>
                        </div>
                        <textarea className="Textarea" placeholder="Content" name="content" ref="content" required value={this.state.post.content}></textarea>
                        <div className="Button">
                            <Button btnType="Success">Save</Button>
                        </div>
                    </form>
                </Panel.body>)
                :
                <div className="Container">
                    <Spinner />
                </div>)
        )
    }
}

export default EditPost;