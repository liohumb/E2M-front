import { useContext, useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Dropzone from 'react-dropzone'
import { Context } from '../../context/Context'
import { getSearch, postData, updateData } from '../../utils'

import './side.scss'

export default function Side( { home, about, artisans, artisan, post, product,
                              clickHome, clickAbout, clickPosts, clickProducts,
                              search, setSearch, setSearchResults } ) {
    const { user, dispatch } = useContext( Context )
    const id = useParams().id

    const [file, setFile] = useState( null )

    useEffect( () => {
        if (search && setSearch && setSearchResults) {
            getSearch(search, setSearchResults)
        } else if (setSearchResults) {
            setSearchResults( [] )
        }
    }, [search, setSearch, setSearchResults] )

    const handleDrop = async ( acceptedFiles ) => {
        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0]
            const data = new FormData()
            const fileName = Date.now() + file.name
            data.append( 'name', fileName )
            data.append( 'file', file )

            await postData('upload', data)

            const updateArtisan = { picture: fileName, userId: user._id }
            await updateData('user', id, updateArtisan)

            const imageUrl = `http://localhost:8080/images/${fileName}`
            setFile( imageUrl )
            window.location.reload()
        }
    }

    const handleLogout = () => {
        dispatch( { type: 'LOGOUT' } )
    }

    return (
        <div className="side">
            <div className="side__container">
                <div className="side__container-header">
                    {artisan ?
                        <>
                            {artisan.picture === '' ?
                                <Dropzone onDrop={handleDrop}>
                                    {( { getRootProps, getInputProps } ) => (
                                        <div {...getRootProps()} className="side__drop">
                                            <input {...getInputProps()}/>
                                            <p>Ajouter une image ici <span>👈</span></p>
                                            <i className="bx bx-image-add"></i>
                                        </div>
                                    )}
                                </Dropzone>
                                :
                                <img
                                    src={file ? file : artisan.picture && `http://localhost:8080/images/${artisan.picture}`}
                                    alt=""
                                    className="side__picture"
                                />
                            }
                        </>
                        :
                        <>
                            <h1 className="side__title">Entre ✌️<br/> Mains</h1>
                            <p className="side__subtitle">Recherchez,<br/> découvrez,<br/> trouvez votre artisan</p>
                        </>
                    }

                    <div className="side__menu">
                        {artisan ?
                            <>
                                <h1 className="side__menu-name">{artisan.firstname + ' ' + artisan.lastname}</h1>
                                <span className="side__menu-society">{artisan.society}</span>
                                {user && artisan._id === user._id ?
                                    <ul className="side__menu-list">
                                        <li>
                                            <Link to="/" className="side__menu-list--link">Accueil</Link>
                                        </li>
                                        <li>
                                            <Link to={`/artisan/${id}/nouveau-post`}
                                                  className="side__menu-list--link">Créer un post</Link>
                                        </li>
                                        <li>
                                            <Link to={`/artisan/${id}/ajouter-produit`}
                                                  className="side__menu-list--link">Ajouter un produit</Link>
                                        </li>
                                        <li>
                                            <Link to={`/artisan/${id}/modifier-informations`}
                                                  className="side__menu-list--link">Modifier informations</Link>
                                        </li>
                                        <li>
                                            <Link to={`/artisan/${id}/modifier-mdp`}
                                                  className="side__menu-list--link">Modifier mot de passe</Link>
                                        </li>
                                    </ul>
                                    :
                                    <ul className="side__menu-list">
                                        <li>
                                            <Link to="/" className="side__menu-list--link">Accueil</Link>
                                        </li>
                                        <li>
                                            <button
                                                className={`side__menu-list--link ${about && 'side__menu-list--link---active'}`}
                                                onClick={clickAbout}>À propos
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                className={`side__menu-list--link ${post && 'side__menu-list--link---active'}`}
                                                onClick={clickPosts}>Posts
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                className={`side__menu-list--link ${product && 'side__menu-list--link---active'}`}
                                                onClick={clickProducts}>Produits
                                            </button>
                                        </li>
                                        <li>
                                            <button className="side__menu-list--link">Contacter</button>
                                        </li>
                                    </ul>
                                }
                            </>
                            :
                            <>
                                <form action="" className="side__menu-form">
                                    <label htmlFor="search"></label>
                                    <input type="text" name="search" id="search" placeholder="Rechercher…"
                                           value={search}
                                           onChange={( e ) => {
                                               setSearch( e.target.value )
                                               setSearchResults( [] )
                                           }}/>
                                </form>
                                <ul className="side__menu-list">
                                    <li>
                                        <Link to="/"
                                              className={`side__menu-list--link ${home && 'side__menu-list--link---active'}`}
                                              onClick={clickHome}>
                                            Accueil
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/artisans"
                                              className={`side__menu-list--link ${artisans && 'side__menu-list--link---active'}`}>
                                            Artisans
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/posts"
                                              className={`side__menu-list--link ${post && 'side__menu-list--link---active'}`}
                                              onClick={clickPosts}>
                                            Posts
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/produits"
                                              className={`side__menu-list--link ${product && 'side__menu-list--link---active'}`}
                                              onClick={clickProducts}>
                                            Produits
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/chat"
                                              className={`side__menu-list--link`}>
                                            Contact
                                            <i className="bx bx-chat"></i>
                                        </Link>
                                    </li>
                                </ul>

                            </>
                        }
                    </div>
                </div>
                <div className="side__container-footer">
                    <div className="side__menu">
                        {artisan &&
                            <ul className="side__menu-social">
                                <li>
                                    <Link to="/">

                                    </Link>
                                </li>
                            </ul>
                        }
                        <ul className="side__menu-connection">
                            {user === null ?
                                <>
                                    <li>
                                        <Link to="/connexion" className="side__menu-connection--link">
                                            Connexion
                                        </Link>
                                    </li>
                                </>
                                :
                                <>
                                    {user.role === 'ARTISAN' &&
                                        <>
                                            <li>
                                                <Link to={`/artisan/${user._id}`}
                                                      className="side__menu-connection--link">
                                                    Mon profil
                                                </Link>
                                            </li>
                                            <li>
                                                |
                                            </li>
                                        </>
                                    }
                                    <li>
                                        <button onClick={handleLogout} className="side__menu-connection--link">
                                            Déconnexion
                                        </button>
                                    </li>
                                </>
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}