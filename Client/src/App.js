import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout/Layout';
import PostsList from './components/PostsList/PostsList';
import Post from './components/Post/Post';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';
import Auth from './containers/Auth/Auth';
import NewPost from './components/Post/NewPost/NewPost';
import EditPost from './components/Post/EditPost/EditPost';
import About from './components/About/About';
import Settings from './components/Settings/Settings';
import Axios, { options } from './axios-api';

class App extends React.Component {
  state = {
    headerImg: null,
    headerRef: null,
    uploadImageRef: null,
    imageUrl: null,
    start: true,
    editMode: false
  }

  componentDidMount() {
    this.props.onTryAutoSignup();

    if (this.state.start) {
      this.setState({ start: false });
      this.getHeader();
    }
  }

  getHeader() {
    Axios.get("/api/blog/header")
      .then(response => {
        const url = response.data ? response.data : null;
        this.setState({ headerImg: url })
      }).catch(err => {
        console.log(err);
      })
  }

  toggleEditMode = (e) => {
    e.preventDefault();
    this.setState({ editMode: !this.state.editMode });
  }

  updateHeaderHandler = (e) => {
    e.preventDefault();

    if (!window.confirm("Are you sure?")) {
      return;
    }

    let image = new FormData();
    image.append("image", this.state.headerRef.current.files[0]);

    Axios.post('/api/admin/header/', image, options(this.props.token))
      .then(response => {
        this.getHeader();
      }).catch(err => {
        console.log(err);
      })
  }

  handleRef = (ref) => {
    this.setState({ headerRef: ref });
  }

  uploadImageHandler = (e) => {
    e.preventDefault();

    let image = new FormData();
    image.append("image", this.state.uploadImageRef.current.files[0]);

    Axios.post('/api/admin/upload/', image, options(this.props.token))
      .then(response => {
        this.setState({ imageUrl: response.data });
      }).catch(err => {
        console.log(err);
      })
  }

  render() {
    return (
      <Layout
        headerRefHandler={(ref) => this.setState({ headerRef: ref })}
        uploadImageRefHandler={(ref) => this.setState({ uploadImageRef: ref })}
        imageUrl={this.state.imageUrl}
        headerImg={this.state.headerImg}
        isAuthenticated={this.props.isAuthenticated}
        editMode={this.state.editMode}
        toggleEditMode={this.toggleEditMode}
        updateHeaderHandler={this.updateHeaderHandler}
        uploadImageHandler={this.uploadImageHandler}>
        <Switch>
          <Route path='/settings' component={Settings} />
          <Route path='/about' component={About} />
          <Route path='/new' component={NewPost} />
          <Route path='/login' component={Auth} />
          <Route path='/edit/:id' component={EditPost} />
          <Route path='/:id' component={Post} />
          <Route path='/' exact component={PostsList} />
        </Switch>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    token: state.auth.token
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
