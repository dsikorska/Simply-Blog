import React, { Component } from 'react';
import styles from './PostsList.module.css';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import ShortPost from './ShortPost/ShortPost';
import Axios from '../../axios-api';
import Spinner from '../UI/Spinner/Spinner';
import { connect } from 'react-redux';
import Input from '../UI/Input/Input';
import Button from './../UI/Button/Button';
import { Link } from 'react-router-dom';
import Panel from '../UI/Panel/Panel';

class PostsList extends Component {
    state = {
        posts: null,
        loading: true
    }

    componentDidMount() {
        if (!this.state.posts) {
            this.setState({ loading: true });
            Axios.get('/api/blog/posts/0')
                .then(response => {
                    this.setState({ posts: response.data, loading: false });
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }

    onDeletePost = (id) => {
        if (!this.props.isLogged) {
            return;
        }

        if (!window.confirm("Are you sure?")) {
            return;
        }

        Axios.delete('/api/blog/' + id)
            .then(response => {
                const posts = this.state.posts.filter(e => e.id !== id);
                this.setState({ posts: posts });
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        let posts = <Panel.body><p>No posts!</p></Panel.body>

        if (this.state.loading) {
            posts = <Spinner />
        }

        if (this.state.posts && this.state.posts.length !== 0) {
            posts = this.state.posts.map(post => {
                const fullDate = new Date(Date.parse(post.created));

                return <ShortPost
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    date={fullDate.toDateString()}
                    content={post.content}
                    image={post.imageUri}
                    isLogged={this.props.isLogged}
                    onDelete={() => this.onDeletePost(post.id)} />
            });
        }

        return (
            <Auxiliary>
                <div className={styles.Bar}>
                    <div className={styles.Categories}>
                        {this.props.isLogged ?
                            <Link to="/new">
                                <Button btnType="Success">New post</Button>
                            </Link>
                            : null}
                        <Button btnType="Secondary">Categories</Button>
                    </div>
                    <div className={styles.Search}>
                        <Input elementType="input" placeholder="Search..." />
                        <Button btnType="Secondary">Find</Button>
                    </div>
                </div>
                <div className="Container">
                    {posts}
                </div>
            </Auxiliary>
        );
    }
};

const mapStateToProps = state => {
    return {
        isLogged: state.auth.isLogged
    }
}

export default connect(mapStateToProps)(PostsList);