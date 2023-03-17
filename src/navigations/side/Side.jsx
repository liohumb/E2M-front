import { useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Context } from '../../context/Context'

import './side.scss'

export default function Side({name, society, description, products}) {
    const {user, dispatch} = useContext(Context)
    const userId = useParams()

    const handleLogout = () => {
      dispatch({type: 'LOGOUT'})
    }

    return (
        <div className="side block">
            <div className="side__container">
                    <h4>{name}</h4>
                <span>{society}</span>
                {userId.id !== user._id &&
                    <div className="side__button">
                        <i className="bx bxs-user-plus"/>
                        <i className="bx bxs-chat"/>
                    </div>}
                {products &&
                    <div className="side__add">
                        <Link to={`/profil/${userId.id}/produits/ajouter`} className="side__add-link">
                            Ajouter un produit
                            <i className='bx bxs-message-square-add'></i>
                        </Link>
                    </div>
                }
                {description &&
                    <div className="side__description">
                        <h6>Description</h6>
                        <p>{description}</p>
                    </div>}
                <div className="side__edit">
                    {user && user.role === 'ARTISAN' &&
                        <Link to="/" className="side__edit-link">Mes statistiques</Link>
                    }
                    {user && user.role === 'ARTISAN' &&
                        <Link to={`/profil/${user._id}/produits`} className="side__edit-link">Vos produits</Link>
                    }
                    <Link to={`/profil/${user._id}/modifier`} className="side__edit-link">Modifier informations</Link>
                    {user && user.role === 'ARTISAN' &&
                        <Link to={`/profil/${user._id}/reseaux-social`} className="side__edit-link">Vos réseaux sociaux</Link>
                    }
                    <Link to={`/profil/${user._id}/modifier-mot-de-passe`} className="side__edit-link">Modifier mot de passe</Link>
                    <button className="side__edit-link" onClick={handleLogout}>Déconnexion</button>
                </div>
            </div>
        </div>
    )
}