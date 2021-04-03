import React, {useState, useEffect} from 'react'
import Post from './components/Post/Post'
import {db, auth} from './firebase'
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import {Button, Input} from '@material-ui/core';
import ImageUpload from './components/ImageUpload/ImageUpload'
import './App.css'

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
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect (() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser){
        //user has logged in
        console.log(authUser);
        setUser(authUser);

        // if (authUser.displayName){
        //   //dont update username
        // } else {
        //   //if we just created someone
        //   return authUser.updateProfile({
        //     displayName: username
        //   });
        // }

      } else {
        //user has logged out
        setUser(null);
      }
    })
    return () => {
      //perform some cleanup actions
      unsubscribe();
    }
  }, [user, username]);

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

  const handleRegister = (event) => {
    event.preventDefault();

    auth.createUserWithEmailAndPassword(email, password)
        .then ((authUser) => {
          return authUser.user.updateProfile({
            displayName: username
          })
        })
        .catch((error) => alert(error.message));

    setOpenRegister(false);
  };

  const handleLogin = (event) => {
    event.preventDefault();

    auth.signInWithEmailAndPassword(email, password)
        .catch((error) => alert(error.message));

    setOpen(false);
  }

  return (
    <div className="app">

      {user?.displayName ? (
        <ImageUpload username={user.displayName} /> 
      ) : (
        <h3>Sorry you need to login to upload</h3>
      )}

      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app-login">
            <center>
              <img 
                className="app-headerImage" 
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" 
                alt="" />
            </center>
              <Input placeholder="email"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
              <Input placeholder="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />
              <Button type="submit" onClick={handleLogin} className="app-button">Log In</Button>
          </form>
        </div>
      </Modal>

      <Modal
        open={openRegister}
        onClose={() => setOpenRegister(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app-login">
            <center>
              <img 
                className="app-headerImage" 
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" 
                alt="" />
            </center>
              <Input placeholder="email"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
              <Input placeholder="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />
              <Button type="submit" onClick={handleRegister} className="app-button">Register</Button>
          </form>
        </div>
      </Modal>

      <div className="app-header">
        <img 
            className="app-headerImage" 
            src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" 
            alt="" />
      </div>

      {/* if user is authenticated, button Logout displayed otherwise LogIn/Register button */}
      {user ? (
        <Button onClick={() => auth.signOut()}>Logout</Button>
      ): (
        <div className="app-loginContainer">
          <Button onClick={() => setOpen(true)}>LogIn</Button>
          <Button onClick={() => setOpenRegister(true)}>Register</Button>
        </div>
      )}

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
