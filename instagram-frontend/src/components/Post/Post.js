import React from 'react'
import './Post.css'
import Avatar from '@material-ui/core/Avatar'

function Post({username, url, caption}) {
    return (
        <div className="post">
            <div className="post-header">
                <Avatar className="post-avatar"
                        alt="" src="https://i.ibb.co/vcWgW1p/instagram.jpg" />
                <h3>{username}</h3>
            </div>
            {/* header -> avatar + usename */}

            <img 
                className="post-image"
                src={url} alt="" />
            {/* image */}

            <h4 className="post-text"><strong>{username}: </strong>{caption}</h4>
            {/* username + caption */}
        </div>
    )
}

export default Post
