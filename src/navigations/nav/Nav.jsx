import { useState } from 'react'
import { toggle } from '../../utils'

import Modal from '../../components/modal/Modal'

import './nav.scss'

export default function Nav() {
    const [modal, setModal] = useState(false)

    return (
        <>
            <nav className="nav">
                <span className="nav__button" onClick={() => toggle(modal, setModal)}>✌️</span>
            </nav>
            <Modal modal={modal} close={() => setModal(false)}/>
        </>
    )
}