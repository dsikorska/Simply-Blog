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

class App extends React.Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    return (
      <Layout>
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

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default connect(null, mapDispatchToProps)(App);
