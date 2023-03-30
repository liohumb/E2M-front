import { useEffect, useState, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { Context } from '../../context/Context'
import { deleteComment, deleteData, formatPrice, getAll, getData, postData, updateData, toggle } from '../../utils'

import './content.scss'

export default function Content( { data, setData, update, setUpdate } ) {
    const { user } = useContext( Context )
    const navigate = useNavigate()
    const id = useParams().id
    const path = data.title ? 'product' : 'post'

    const [artisan, setArtisan] = useState( [] )
    const [getUser, setGetUser] = useState( [] )
    const [like, setLike] = useState( false )
    const [comments, setComments] = useState( [] )
    const [comment, setComment] = useState( '' )


    useEffect( () => {
        getData( 'user', data.artisan, setArtisan )
    }, [data.artisan] )

    useEffect( () => {
        if (user) {
            getData( 'user', user._id, setGetUser )
        }
    }, [user] )

    useEffect( () => {
        getAll( 'comment', setComments )
    }, [] )

    useEffect( () => {
        if (getUser.likes && getUser.likes.includes( id )) {
            setLike( true )
        } else {
            setLike( false )
        }
    }, [getUser.likes, id] )

    const handleBack = () => {
        navigate( -1 )
    }

    const handleLike = async () => {
        const isPostLiked = getUser.likes.includes( id )

        if (isPostLiked) {
            try {
                const updatedLikes = getUser.likes.filter( ( postId ) => postId !== id )
                const updatedUser = await axios.put( `http://localhost:8080/user/${user._id}`, {
                    userId: user._id,
                    likes: updatedLikes
                } )
                setGetUser( updatedUser.data )
                await axios.put( `http://localhost:8080/${path}/${id}`, {
                    removeUser: user._id
                } )
            } catch (e) {
            }
        } else {
            try {
                const updatedLikes = [...getUser.likes, id]
                const updatedUser = await axios.put( `http://localhost:8080/user/${user._id}`, {
                    userId: user._id,
                    likes: updatedLikes
                } )
                await axios.put( `http://localhost:8080/${path}/${id}`, {
                    users: user._id
                } )

                setGetUser( updatedUser.data )
            } catch (e) {
            }
        }

    }

    const handleComment = async () => {
        const newComment = {
            comment,
            user: user._id,
            username: user.firstname,
            data: id
        }

        try {
            await postData('comment', newComment)
        } catch (e) {}
    }

    const handleDeleteComment = async ( commentId ) => {
        try {
            await deleteComment('comment', commentId)
            window.location.reload()
        } catch (e) {}
    }


    const handleUpdate = async () => {
        try {
            await updateData(path, data._id, data)
            setUpdate( false )
        } catch (e) {}
    }

    const handleDelete = async () => {
        try {
            await deleteData(path, data._id, artisan, user._id)
            navigate( -1 )
        } catch (e) {}
    }

    return (
        <div className="content">
            <span className="content__back section__back" onClick={handleBack}>
                <i className="bx bx-chevrons-left"></i>
                retour
            </span>
            <div className="content__container">
                <div className="content__container-top">
                    {data.picture &&
                        <img src={`http://localhost:8080/images/${data.picture}`} alt=""
                             className="content__picture"/>
                    }
                    <div className="content__infos">
                    <span className="content__infos-artisan">
                        <span>Publié par </span>
                        {artisan.firstname + ' ' + artisan.lastname}
                    </span>
                        {data.title && update ?
                            <input type="text" name="title" id="title"
                                   className="content__infos-title--input"
                                   value={data.title}
                                   onChange={( e ) => setData( { ...data, title: e.target.value } )}/>
                            :
                            <h1 className="content__infos-title">{data.title}</h1>
                        }
                        {update ?
                            <textarea name="description" id="description"
                                      className="content__infos-description--textarea"
                                      value={data.description}
                                      onChange={( e ) => setData( {
                                          ...data,
                                          description: e.target.value
                                      } )}></textarea>
                            :
                            <p className="content__infos-description">{data.description}</p>
                        }
                        {data.price &&
                            <span className="content__infos-price">
                            <span>À partir de </span>
                                {update ?
                                    <input type="number" name="price" id="price"
                                           value={data.price}
                                           onChange={( e ) => setData( { ...data, price: e.target.value } )}/>
                                    :
                                    formatPrice( data.price )
                                }
                        </span>
                        }
                    </div>
                </div>
                <div className="content__container-bottom">
                    <div className="content__interactions">
                        {user &&
                            <>
                                <div className="content__interactions-interaction">
                                    {user && artisan._id === user._id ?
                                        <>
                                            {update ?
                                                <i className="bx bx-check" onClick={handleUpdate}/>
                                                :
                                                <>
                                                    <i className="bx bx-edit" onClick={() => toggle(update, setUpdate)}/>
                                                    <i className="bx bx-trash" onClick={handleDelete}/>
                                                </>
                                            }
                                        </>
                                        :
                                        <>
                                            <i className={`bx ${like ? 'bxs-heart' : 'bx-heart'}`} onClick={handleLike}/>

                                            <i className="bx bx-message-rounded"/>
                                            <i className="bx bx-share"/>
                                        </>
                                    }
                                </div>

                                <ul className="content__comments">
                                    {comments.filter( comment => comment.data === id ).map( ( comment ) => (
                                        <li key={comment._id}>
                                            <p className="content__comments-comment">{comment.comment}</p>
                                            <p className="content__comments-author">
                                                {comment.username}
                                                {comment.user === user._id ?
                                                    <i className="bx bx-x" onClick={() => handleDeleteComment(comment._id)} />
                                                    :
                                                    <i className="bx bx-subdirectory-left"/>
                                                }
                                            </p>
                                        </li>
                                    ) )}
                                </ul>
                                <form action="" className="content__comments-form" onSubmit={handleComment}>
                                    <input type="text" name="comment" id="comment"
                                           placeholder="Votre commentaire…"
                                           value={comment} onChange={( e ) => setComment( e.target.value )}/>
                                    <button type="submit">
                                        <i className="bx bx-message-rounded-add"/>
                                    </button>
                                </form>
                            </>
                        }
                    </div>

                    {data.picture &&
                        <img src={`http://localhost:8080/images/${data.picture}`} alt=""
                             className="content__picture"/>
                    }
                </div>
            </div>
        </div>
    )
}