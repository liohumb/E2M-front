import { useState } from 'react'

import Modal from '../../components/modal/Modal'

import './nav.scss'

export default function Nav() {
    const [modal, setModal] = useState(false)

    const toggleMenu = () => {
        if (modal) {
            setModal(false)
        } else {
            setModal(true)
        }
    }

    return (
        <>
            <nav className="nav">
                <span className="nav__button" onClick={toggleMenu}>✌️</span>
            </nav>
            <Modal modal={modal} close={() => setModal(false)}/>
        </>
    )
}