import React from 'react'
import './App.css';
import Post from './components/Post/Post'
function App() {
  return (
    <div className="App">
      <div className="app-header">
        <img 
            className="app-headerImage" 
            src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" 
            alt="" />
      </div>
      <Post />
    </div>
  );
}

export default App;
