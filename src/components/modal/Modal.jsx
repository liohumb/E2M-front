import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../../context/Context'

import './modal.scss'

export default function Modal( { modal, close } ) {
    const { user, dispatch } = useContext( Context )

    const handleLogout = () => {
        dispatch( { type: 'LOGOUT' } )
    }

    return (
        <div className={`modal ${modal && 'modal__active'}`} onClick={close}>
            <ul className="modal__menu">
                <li>
                    <div className="modal__menu-auth">
                        {user ?
                            <>
                                {user.role === 'ARTISAN' &&
                                    <Link to={`/artisan/${user._id}`}
                                          className="modal__menu-auth--link">
                                        Mon profil
                                    </Link>
                                }
                                <button onClick={handleLogout} className="side__menu-auth--link">
                                    Déconnexion
                                </button>
                            </>
                            :
                            <Link to="/connexion" className="modal__menu-auth--link">connexion</Link>
                        }
                    </div>
                </li>
                <li>
                    <input type="text" name="modalSearch" id="modalSearch" placeholder="Rechercher…"
                           className="modal__menu-input"/>
                </li>
                <li>
                    <Link to="/" className="modal__menu-link">Accueil</Link>
                </li>
                <li>
                    <Link to="/artisans" className="modal__menu-link">Artisans</Link>
                </li>
                <li>
                    <Link to="/posts" className="modal__menu-link">Posts</Link>
                </li>
                <li>
                    <Link to="/produits" className="modal__menu-link">Produits</Link>
                </li>
                <li>
                    <Link to="/chat" className="modal__menu-link">Contact</Link>
                </li>
            </ul>
        </div>
    )
}