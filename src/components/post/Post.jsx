import { useState } from 'react'

import Profil from '../profil/Profil'
import Comments from '../comments/Comments'

import post from '../../assets/images/posts/post1.jpg'
import './post.scss'

const comments = [
    {
        id: 1,
        text: 'Lorem ipsum dolor sit amet',
        author: 'John Doe'
    },
    {
        id: 2,
        text: 'Lorem dolor',
        author: 'Jane Doe'
    }
]

export default function Post() {
    const [addComment, setAddComment] = useState(false)

    const handleComment = () => {
        setAddComment(true)
    }

    return (
        <div className="post block">
            <div className="post__container">
                <div className="post__artisan">
                    <Profil/>
                </div>
                <div className="post__content">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consequuntur cum
                        cupiditate...</p>
                    <img src={post} alt=" "/>
                </div>
                <div className="post__interaction">
                    <i className="bx bx-heart"/>
                    <i className="bx bx-message" onClick={handleComment}/>
                    <i className="bx bx-upload"/>
                </div>
                <div className="post__comments">
                    <Comments comments={comments}/>
                    {addComment &&
                        <form action="" className="post__comments-form">
                            <textarea name="text" id="text" placeholder="Ajouter un commentaire"></textarea>
                            <button type="submit">
                                <i className="bx bx-message-add"/>
                            </button>
                        </form>}
                </div>
            </div>
        </div>
    )
}