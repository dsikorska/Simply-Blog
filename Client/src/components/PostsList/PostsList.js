import React, { Component } from 'react';
import styles from './PostsList.module.css';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import ShortPost from './ShortPost/ShortPost';
import Axios from '../../axios-api';
import Spinner from '../UI/Spinner/Spinner';
import { connect } from 'react-redux';
import Button from './../UI/Button/Button';
import { Link } from 'react-router-dom';
import Panel from '../UI/Panel/Panel';
import ReactPaginate from 'react-paginate';

class PostsList extends Component {
    state = {
        posts: null,
        count: 0,
        loading: true
    }

    componentDidMount() {
        if (!this.state.posts) {
            this.loadPosts(0);

            Axios.get('/api/blog/count')
                .then(response => {
                    this.setState({ count: response.data });
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    loadPosts = (page) => {
        this.setState({ loading: true });
        Axios.get('/api/blog/posts/' + page)
            .then(response => {
                this.setState({ posts: response.data, loading: false });
            })
            .catch(err => {
                console.log(err);
            });
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

    onPageChangeHandler = (page) => {
        this.loadPosts(page.selected);
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
                <div className={styles.Categories}>
                    {this.props.isLogged ?
                        <Link to="/new">
                            <Button btnType="Success">New post</Button>
                        </Link>
                        : null}
                </div>
                <div className="Container">
                    {posts}
                    <ReactPaginate
                        previousLabel={'<'}
                        previousLinkClassName={styles.PaginationLink}
                        nextLinkClassName={styles.PaginationLink}
                        nextLabel={'>'}
                        breakLabel={'...'}
                        breakLinkClassName={styles.PaginationLink}
                        pageCount={this.state.count}
                        pageRangeDisplayed={2}
                        onPageChange={this.onPageChangeHandler}
                        containerClassName={styles.Pagination}
                        pageLinkClassName={styles.PaginationLink}
                        activeClassName={styles.ActivePage}
                        marginPagesDisplayed={3}
                    />
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