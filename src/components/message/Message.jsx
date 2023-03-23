

import './message.scss'

export default function Message( { message, you } ) {
    return (
        <div className={`message ${you && 'message__alt'}`}>
            <p>{message.message}</p>
            <span>{message.createdAt}</span>
        </div>
    )
}