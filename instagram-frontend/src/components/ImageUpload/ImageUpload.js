import React, {useState} from 'react'
import {Button} from '@material-ui/core';
import {storage, db} from '../../firebase'
import './ImageUpload.css'

function ImageUpload() {
    const [caption, setCaption] = useState('');
    const [image, setImage] =useState(null);
    const [progress, setProgress] = useState(0);

    const handleChange = (e) =>{
        if(e.target.files[0]){   //get the first file selected
            setImage(e.target.files[0])
        }
    }

    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                //progress function....
            }
        )
    }

    return (
        <div>
            {/* Caption Input */}
            {/* File picker */}
            {/* Post button */}
            <input type="text" placeholder="Enter a caption..." value={caption}
                   onChange={(event) => setCaption(event.target.value)} />
            <input type="file" onChange={handleChange} />
            <Button className="imageupload-button" onClick={handleUpload}>Upload</Button>
        </div>
    )
}

export default ImageUpload
