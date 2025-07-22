import React from 'react';
import Posts from './Posts';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <div className="App flex flex-col items-center py-8">
        <h1 className="text-4xl font-extrabold text-blue-800 mb-8 tracking-tight">Redux Async Demo (using Thunk)</h1>
        <Posts />
      </div>
    </div>
  );
}

export default App;
