import React, { Component } from 'react';
import styles from './PostsList.module.css';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import ShortPost from '../../components/PostsList/ShortPost/ShortPost';
import { deletePostAsync, getPostsAsync, getTagsAsync } from '../../httpClient';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import Button from '../../components/UI/Button/Button';
import { Link } from 'react-router-dom';
import Panel from '../../components/UI/Panel/Panel';
import ReactPaginate from 'react-paginate';
import { EditorState, convertFromRaw } from 'draft-js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTag } from '@fortawesome/free-solid-svg-icons';

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
        getPostsAsync(page, category).then(data => {
            let posts = [];
            data.data.forEach(post => {
                posts.push({
                    ...post,
                    content: EditorState
                        .createWithContent(convertFromRaw(JSON.parse(post.content)))
                        .getCurrentContent()
                        .getPlainText()
                });
            });

            if (reloadTags) {
                getTagsAsync().then(tags => {
                    this.setState({ posts: posts, tags: tags, maxPages: data.maxPages, loading: false });
                });
            } else {
                this.setState({ posts: posts, maxPages: data.maxPages, loading: false });
            }
        });

    }

    onDeletePost = (id) => {
        if (!this.props.isLogged) {
            return;
        }

        if (!window.confirm("Are you sure?")) {
            return;
        }
        this.setState({ loading: true });
        deletePostAsync(id, this.props.token).then(data => {
            this.loadPosts(this.state.currentPage, null, true);
        });
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
                        <button onClick={() => this.tagClickedHandler(tag)}>
                            <span><FontAwesomeIcon icon={faTag} size="xs" /></span>
                            {tag}</button>
                    </li>)
            }
        }

        return (
            <Auxiliary>
                <div className={styles.Categories}>
                    <div style={{ width: "100%", margin: "auto", textAlign: "center" }}>
                        <ul className="Tags">
                            <li key="noFilter">
                                <button onClick={() => this.tagClickedHandler(null)} style={{ height: "30px" }}>
                                    All posts
                                </button>
                            </li>
                            {tags}
                        </ul>
                    </div>
                    {this.props.isLogged ?
                        <Link to="/new">
                            <Button btnType="Success">
                                <span><FontAwesomeIcon icon={faPlus} /></span>
                                New post
                                </Button>
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
        isLogged: state.auth.isLogged,
        token: state.auth.token
    }
}

export default connect(mapStateToProps)(PostsList);