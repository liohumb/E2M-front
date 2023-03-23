import { useState, useEffect } from 'react'
import { getData } from '../../utils'

import './conversation.scss'

export default function Conversation( { chat, you } ) {
    const [user, setUser] = useState( null )

    useEffect( () => {
        const friendId = chat.users.find( m => m !== you._id )

        getData( 'user', friendId, setUser )
    }, [chat.users, you._id] )

    return (
        <div className="conversation">
            <div className="conversation__container">
                <span className="conversation__name">{user && user.firstname + ' ' + user.lastname}</span>
                <img src={user && `http://localhost:8080/images/${user.picture}`} alt=""
                     className="conversation__picture"/>
            </div>
        </div>
    )
}