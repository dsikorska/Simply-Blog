import React from 'react';
import styles from './NewPost.module.css';
import Axios from '../../../axios-api';
import Button from './../../UI/Button/Button';
import Panel from './../../UI/Panel/Panel';

class NewPost extends React.Component {

    onFormSubmitHandler = (e) => {
        e.preventDefault();
        let post = new FormData(e.target);

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
            <Panel.body>
                <form onSubmit={this.onFormSubmitHandler}>
                    <input className={styles.Input} placeholder="Title" name="title" ref="title" required />
                    <div className={styles.Img}>
                        {true ?
                            <div className={styles.Block}>

                            </div>
                            : null}
                        <div className={styles.Block}>
                            <input type="file" name="image" ref="image" accept="image/*" />
                        </div>
                    </div>
                    <textarea className={styles.Textarea} placeholder="Content" name="content" ref="content" required></textarea>
                    <div className={styles.Button}>
                        <Button btnType="Success">Save</Button>
                    </div>
                </form>
            </Panel.body>
        )
    }
}

export default NewPost;