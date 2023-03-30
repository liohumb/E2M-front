import moment from 'moment'

import 'moment/locale/fr'
import './message.scss'

export default function Message( { message, own } ) {
    moment.locale('fr')

    return (
        <div className={`message ${own && 'message__alt'}`}>
            <p>{message.text}</p>
            <span>{moment(message.createdAt).fromNow()}</span>
        </div>
    )
}