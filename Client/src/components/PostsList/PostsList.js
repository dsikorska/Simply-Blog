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
import { EditorState, convertFromRaw } from 'draft-js';

class PostsList extends Component {
    state = {
        posts: null,
        tags: null,
        maxPages: 0,
        currentPage: 0,
        loading: true,
        selectedTag: null
    }

    componentDidMount() {
        if (!this.state.posts) {
            this.loadPosts(0, null, true);
        }
    }

    loadPosts = (page, category, reloadTags = false) => {
        this.setState({ loading: true });
        Axios.get('/api/blog/posts/' + page + '/' + category)
            .then(response => {
                let posts = [];
                response.data.data.forEach(post => {
                    posts.push({
                        ...post,
                        content: EditorState
                            .createWithContent(convertFromRaw(JSON.parse(post.content)))
                            .getCurrentContent()
                            .getPlainText()
                    });
                });

                if (reloadTags) {
                    let tags = new Set();
                    response.data.data.forEach(post => {
                        post.categories.forEach(tag => {
                            tags.add(tag);
                        })
                    })
                    this.setState({ posts: posts, tags: tags, maxPages: response.data.maxPages, loading: false });
                } else {
                    this.setState({ posts: posts, maxPages: response.data.maxPages, loading: false });
                }
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
                this.loadPosts(this.state.currentPage, null, true);
            })
            .catch(err => {
                console.log(err);
            })
    }

    onPageChangeHandler = (page) => {
        this.setState({ currentPage: page.selected });
        this.loadPosts(page.selected, this.state.selectedTag);
    }

    tagClickedHandler = (tag) => {
        this.setState({ selectedTag: tag })
        this.loadPosts(0, tag);
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
                    date={fullDate.toLocaleDateString()}
                    tags={post.categories}
                    tagClicked={(tag) => this.tagClickedHandler(tag)}
                    content={post.content}
                    image={post.imageUri}
                    isLogged={this.props.isLogged}
                    onDelete={() => this.onDeletePost(post.id)} />
            });
        }

        let tags = [];
        if (this.state.tags) {
            for (let tag of this.state.tags) {
                tags.push(
                    <li key={tag}>
                        <button onClick={() => this.tagClickedHandler(tag)}>#{tag}</button>
                    </li>)
            }
        }

        return (
            <Auxiliary>
                <div className={styles.Categories}>
                    <div style={{ width: "100%", margin: "auto", textAlign: "center" }}>
                        <ul className="Tags">
                            <li key="noFilter"><button onClick={() => this.tagClickedHandler(null)}>All posts</button></li>
                            {tags}
                        </ul>
                    </div>
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
                        pageCount={this.state.maxPages}
                        pageRangeDisplayed={2}
                        onPageChange={this.onPageChangeHandler}
                        containerClassName={styles.Pagination}
                        pageLinkClassName={styles.PaginationLink}
                        activeClassName={styles.ActivePage}
                        marginPagesDisplayed={3}
                    />
                </div>
            </Auxiliary >
        );
    }
};

const mapStateToProps = state => {
    return {
        isLogged: state.auth.isLogged
    }
}

export default connect(mapStateToProps)(PostsList);