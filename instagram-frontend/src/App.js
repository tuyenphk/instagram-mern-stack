import React, {useState, useEffect} from 'react'
import './App.css';
import Post from './components/Post/Post'
import {db} from './firebase'

function App() {
  const [posts, setPosts] = useState([
    // {
    //   username:"tuyenphk",
    //   url: "https://i.ibb.co/YNyzWWy/cover.jpg",
    //   caption: "Best scenery moment #canolafields #summervibes #usa #pennsylvania #lehighvalley #northampton #cherryville #covid19 👣👣🌾🌼🥰"
    // },
    // {
    //   username:"tuyenphk",
    //   url: "https://i.ibb.co/Tws3HWy/Capture.png",
    //   caption: "You makes me feel warm, snowman ☃️❄️❄️ #usa #philly #snowday #springbreak #comming 👣😘😂😚"
    // },
    // {
    //   username:"tuyenphk",
    //   url: "https://i.ibb.co/SxXVr7Q/1.png",
    //   caption: "Happy birthday Mom! Love you to the moon.. ❤️❤️❤️❤️ #April2nd2021"
    // }
  ]);

  useEffect (() => {
    db.collection('posts')
      .onSnapshot(snapshot => {
        //every time a new post is added, this code launches to firestore
        setPosts(snapshot.docs.map(doc => ({
          id: doc.id,
          post: doc.data()
        })));
      })
  }, [])

  return (
    <div className="App">
      <div className="app-header">
        <img 
            className="app-headerImage" 
            src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" 
            alt="" />
      </div>

      {
        posts.map (({id, post}) => (
          <Post key={id}
                username={post.username}
                url={post.url}
                caption={post.caption} />
        ))
      }
     
    </div>
  );
}

export default App;
