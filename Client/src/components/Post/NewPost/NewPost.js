import React from 'react';
import Axios from '../../../axios-api';
import Button from './../../UI/Button/Button';
import Panel from './../../UI/Panel/Panel';

class NewPost extends React.Component {

    onFormSubmitHandler = (e) => {
        e.preventDefault();
        let post = new FormData(e.target);

        Axios.post('/api/blog/new', post)
            .then(() => {
                this.props.history.push('/');
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        return (
            <Panel.body>
                <form onSubmit={this.onFormSubmitHandler}>
                    <input className="Input" placeholder="Title" name="title" ref="title" required />
                    <div className="Img">
                        {true ?
                            <div className="Block">

                            </div>
                            : null}
                        <div className="Block">
                            <input type="file" name="image" ref="image" accept="image/*" />
                        </div>
                    </div>
                    <textarea className="Textarea" placeholder="Content" name="content" ref="content" required></textarea>
                    <div className="Button">
                        <Button btnType="Success">Save</Button>
                    </div>
                </form>
            </Panel.body>
        )
    }
}

export default NewPost;