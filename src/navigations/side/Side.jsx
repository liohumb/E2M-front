import './side.scss'
import { Link } from 'react-router-dom'

export default function Side() {
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
                    <Link to="/" className="side__edit-link">Modifier informations</Link>
                    <Link to="/" className="side__edit-link">Modifier mot de passe</Link>
                    <Link to="/" className="side__edit-link">Déconnexion</Link>
                </div>
            </div>
        </div>
    )
}