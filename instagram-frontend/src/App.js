import React, {useState, useEffect} from 'react'
import './App.css';
import Post from './components/Post/Post'
import {db} from './firebase'
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import {Button} from '@material-ui/core';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  useEffect (() => {
    db.collection('posts')
      .onSnapshot(snapshot => {
        //every time a new post is added, this code launches to firestore
        setPosts(snapshot.docs.map(doc => ({
          id: doc.id,
          post: doc.data()
        })));
      })
  }, []);

  return (
    <div className="App">
      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <h2>I am a modal</h2>
        </div>
      </Modal>

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
