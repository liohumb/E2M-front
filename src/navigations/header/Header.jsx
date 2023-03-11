import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { Context } from '../../context/Context'

import logo from '../../assets/images/logos/logo.png'
import profil from '../../assets/images/user/profil.png'
import './header.scss'

export default function Header(  ) {
    const {user} = useContext(Context)

    return (
        <header className="header">
            <Link to="/" className="header__logo">
                <img src={logo} alt=" "/>
            </Link>
            <nav className="header__menu">
                <form action="" className="header__menu-search">
                    <label htmlFor="search"></label>
                    <input type="text" name="search" id="search" placeholder="Rechercher…"/>
                    <button type="submit">
                        <i className="bx bx-search"/>
                    </button>
                </form>
                <Link to="/conditions-generales" className="header__menu-link">
                    <i className="bx bx-comment-detail"/>
                </Link>
                <Link to="/notification" className="header__menu-link">
                    <i className="bx bxs-bell"/>
                </Link>
                <Link to="/aides" className="header__menu-link">
                    <i className="bx bx-help-circle"/>
                </Link>
                {user ?
                    <Link to="/profil/:id" className="header__menu-link">
                        <img src={profil} alt={user.name}/>
                    </Link>
                :
                    <Link to="/connexion" className="header__menu-link">
                        <i className="bx bxs-user"/>
                    </Link>
                }
            </nav>
            <nav className="header__bottom">
                <Link to="/" className="header__bottom-link">
                    <i className="bx bxs-home"/>
                </Link>
                <Link to="/rechercher" className="header__bottom-link">
                    <i className="bx bxs-search"/>
                </Link>
                <Link to="/collections" className="header__bottom-link">
                    <i className="bx bxs-collection"/>
                </Link>
                <Link to="/chat" className="header__bottom-link">
                    <i className="bx bxs-chat"/>
                </Link>
                {user ?
                    <Link to="/profil/:id" className="header__bottom-link">
                        <img src={profil} alt={user.name}/>
                    </Link>
                :
                    <Link to="/connexion" className="header__bottom-link">
                        <i className="bx bxs-user"/>
                    </Link>
                }
            </nav>
        </header>
    )
}