import React from 'react'
import './Post.css'
import Avatar from '@material-ui/core/Avatar'

function Post() {
    return (
        <div className="post">
            <div className="post-header">
                <Avatar className="post-avatar"
                        alt="" src="https://i.ibb.co/vcWgW1p/instagram.jpg" />
                <h3>Username</h3>
            </div>
            {/* header -> avatar + usename */}

            <img 
                className="post-image"
                src="https://i.ibb.co/SnZDXmR/69924467-1431601283645587-2043060571988819968-o.jpg" alt="" />
            {/* image */}

            <h4 className="post-text"><strong>tuyenphk:</strong> caption</h4>
            {/* username + caption */}
        </div>
    )
}

export default Post
