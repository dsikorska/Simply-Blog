import React from 'react';
import './App.css';
import Layout from './hoc/Layout/Layout';
import PostsList from './components/PostsList/PostsList';

function App() {
  return (
    <Layout>
      <PostsList />
    </Layout>
  );
}

export default App;
