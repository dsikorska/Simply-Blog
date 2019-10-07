import React from 'react';
import Axios from '../../../../axios-api';
import Button from './../../../UI/Button/Button';
import Panel from '../../../UI/Panel/Panel';

class NewComment extends React.Component {
    onFormSubmitHandler = (e) => {
        e.preventDefault();
        const comment = {
            email: this.refs.email.value,
            author: this.refs.name.value,
            content: this.refs.content.value,
            postId: this.props.id
        }

        Axios.post('/api/blog/' + this.props.id + '/new', comment)
            .then(response => {
                this.refs.email.value = '';
                this.refs.name.value = '';
                this.refs.content.value = ''
                this.props.submit();
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        return (
            <div className="M30">
                <Panel.body>
                    <form onSubmit={this.onFormSubmitHandler}>
                        <input placeholder="Your name" name="name" ref="name" className="Input" required />
                        <input type="email" placeholder="Email (required)" name="email" ref="email" required className="Input" />
                        <textarea placeholder="Your text goes here." name="content" ref="content" required className="Textarea Textarea-small"></textarea>
                        <div className="Button">
                            <Button btnType="Success">Save</Button>
                        </div>
                    </form>
                </Panel.body>
            </div>
        )
    }
};

export default NewComment;