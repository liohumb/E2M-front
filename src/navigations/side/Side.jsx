import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../../context/Context'

import './side.scss'

export default function Side() {
    const {user, dispatch} = useContext(Context)

    const handleLogout = () => {
      dispatch({type: 'LOGOUT'})
    }

    return (
        <div className="side block">
            <div className="side__container">
                <div className="side__button">
                        <i className="bx bxs-user-plus"/>
                        <i className="bx bxs-chat"/>
                </div>
                <div className="side__description">
                    <h6>Description</h6>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium cum dolore in ipsam officia
                        option sed! Liquid dol oribus error esse, ipsam maxime numquam qua. Culpa dolorous eos
                        excitation impedit repellents.</p>
                </div>
                <div className="side__edit">
                    <Link to="/" className="side__edit-link">Mes statistiques</Link>
                    <Link to={`/profil/${user._id}/modifier`} className="side__edit-link">Modifier informations</Link>
                    <Link to={`/profil/${user._id}/modifier-mot-de-passe`} className="side__edit-link">Modifier mot de passe</Link>
                    <button className="side__edit-link" onClick={handleLogout}>Déconnexion</button>
                </div>
            </div>
        </div>
    )
}