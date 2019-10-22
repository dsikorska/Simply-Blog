import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout/Layout';
import PostsList from './containers/PostsList/PostsList';
import Post from './containers/Post/Post';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';
import Auth from './containers/Auth/Auth';
import NewPost from './containers/Post/NewPost/NewPost';
import EditPost from './containers/Post/EditPost/EditPost';
import About from './containers/About/About';
import Settings from './containers/Settings/Settings';
import { getHeaderAsync, postHeaderAsync, postImageAsync } from './httpClient';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class App extends React.Component {
  state = {
    headerImg: null,
    headerRef: null,
    uploadImageRef: null,
    imageUrl: "Link to uploaded image.",
    start: true,
    loading: true
  }

  componentDidMount() {
    this.props.onTryAutoSignup();
    if (this.state.start) {
      this.setState({ start: false, loading: true });
      this.getHeader();
    }
  }

  getHeader() {
    getHeaderAsync().then(data => {
      const url = data ? data : null;
      this.setState({ headerImg: url, loading: false });
    });
  }

  updateHeaderHandler = (e) => {
    e.preventDefault();

    if (!window.confirm("Are you sure?")) {
      return;
    }

    let image = new FormData();
    image.append("image", this.state.headerRef.current.files[0]);
    this.setState({ loading: true });
    postHeaderAsync(image, this.props.token).then(data => {
      const url = data ? data : null;
      this.setState({ headerImg: url, loading: false });
      toast("Header updated successfully!", { type: toast.TYPE.SUCCESS });
    });
  }

  handleRef = (ref) => {
    this.setState({ headerRef: ref });
  }

  uploadImageHandler = (e) => {
    e.preventDefault();

    let image = new FormData();
    image.append("image", this.state.uploadImageRef.current.files[0]);
    this.setState({ loading: true });
    postImageAsync(image, this.props.token).then(data => {
      this.setState({ imageUrl: data, loading: false });
      toast("Image uploaded successfully!", { type: toast.TYPE.SUCCESS });
    });
  }

  render() {
    return (
      <Layout
        headerRefHandler={(ref) => this.setState({ headerRef: ref })}
        uploadImageRefHandler={(ref) => this.setState({ uploadImageRef: ref })}
        imageUrl={this.state.imageUrl}
        headerImg={this.state.headerImg}
        isAuthenticated={this.props.isAuthenticated}
        updateHeaderHandler={this.updateHeaderHandler}
        uploadImageHandler={this.uploadImageHandler} >
        <Switch>
          <Route path='/settings' component={Settings} />
          <Route path='/about' component={About} />
          <Route path='/new' component={NewPost} />
          <Route path='/login' component={Auth} />
          <Route path='/edit/:id' component={EditPost} />
          <Route path='/:id' component={Post} />
          <Route path='/' exact component={PostsList} />
        </Switch>
        <ToastContainer newestOnTop={true} />
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
