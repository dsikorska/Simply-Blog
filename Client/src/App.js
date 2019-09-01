import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Layout from './hoc/Layout/Layout';
import PostsList from './components/PostsList/PostsList';
import Post from './components/Post/Post';


function App() {
  return (
    <Layout>
      <Switch>
        <Route path='/:title/:id' component={Post} />
        <Route path='/' exact component={PostsList} />
      </Switch>
    </Layout>
  );
}

export default App;
