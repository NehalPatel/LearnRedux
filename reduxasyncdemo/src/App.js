import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts } from './postsSlice';

function App() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.items);
  const status = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Redux Async Example</h1>
        <button onClick={() => dispatch(fetchPosts())} disabled={status === 'loading'}>
          {status === 'loading' ? 'Loading...' : 'Fetch Posts'}
        </button>
        {status === 'failed' && <p style={{ color: 'red' }}>Error: {error}</p>}
        <ul style={{ textAlign: 'left', maxWidth: 400, margin: '1rem auto' }}>
          {posts.map((post) => (
            <li key={post.id}>
              <strong>{post.title}</strong>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
