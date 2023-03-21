import Profil from '../profil/Profil'

import './post.scss'

export default function Post( { post, profil } ) {
    return (
        <div className={post.picture ? 'post' : 'post__alt'}>
            {post.picture &&
                <img src={`http://localhost:8080/images/${post.picture}`} alt=" "
                     className="post__background"/>
            }
            <div className={`post__container ${post.picture && post.content && 'post__container-background'}`}>
                <div className="post__content">
                    <p>{post.content}</p>
                </div>
                {!profil &&
                    <div className="post__artisan">
                        <Profil author={post.author} post/>
                    </div>
                }
                <div className="post__interaction">
                    {profil ?
                        <>
                            <i className='bx bx-edit'></i>
                            <i className='bx bx-trash'></i>
                        </>
                    :
                        <>
                            <i className='bx bx-heart'></i>
                            <i className='bx bx-message-rounded'></i>
                            <i className='bx bx-share'></i>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}
