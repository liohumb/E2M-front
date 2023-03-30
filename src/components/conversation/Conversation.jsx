import { useState, useEffect } from 'react'
import { getData } from '../../utils'

import './conversation.scss'

export default function Conversation( { chat, currentUser } ) {
    const [user, setUser] = useState( null )

    useEffect( () => {
        const friendId = chat.users.find( user => user !== currentUser._id )
        getData( 'user', friendId, setUser )
    }, [chat, currentUser] )

    return (
        <div className="conversation">
            <div className="conversation__container">
                <span className="conversation__name">{user && user.firstname + ' ' + user.lastname}</span>
                {user && user.picture &&
                    <img src={`http://localhost:8080/images/${user.picture}`} alt=""
                         className="conversation__picture"/>
                }
            </div>
        </div>
    )
}