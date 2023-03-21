import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Context } from '../../context/Context'
import axios from 'axios'

import Side from '../../navigations/side/Side'

import './password.scss'
import { getData } from '../../utils'

export default function Password() {
    const { user } = useContext( Context )
    const id = useParams().id

    const [showPassword, setShowPassword] = useState( false )
    const [artisan, setArtisan] = useState([])
    const [password, setPassword] = useState( '' )
    const [passwordConfirm, setPasswordConfirm] = useState( '' )
    const [error, setError] = useState( '' )

    useEffect( () => {
        getData('user', id, setArtisan)
    }, [id])

    const handleShowPassword = () => {
        if (showPassword) {
            setShowPassword( false )
        } else {
            setShowPassword( true )
        }
    }

    const handleSubmit = async ( e ) => {
        e.preventDefault()

        if (password !== passwordConfirm) {
            setError( 'Les mots de passe ne correspondent pas' )
            return
        }

        try {
            await axios.put( `http://localhost:8080/user/${user._id}`, {
                userId: user._id, password: password
            } )

            setPassword( '' )
            setPasswordConfirm( '' )

            alert( 'Mot de passe modifié avec succès !' )
        } catch (error) {
            console.log( error )
            setError( 'Une erreur est survenue, merci de réessayer ultérieurement' )
        }
    }

    return (
        <section className="home section">
            <div className="home__container section__container">
                <div className="home__container-left section__container-left">
                    <Side artisan={artisan}/>
                </div>
                <div className="home__container-right section__container-right">
                    <form action="" className="form password__form" onSubmit={handleSubmit}>
                        <div className="form__content">
                            <label htmlFor="password"></label>
                            <div className="form__content-password">
                                <input type={showPassword ? 'text' : 'password'} name="password" id="password"
                                       placeholder="Votre mot de passe" required
                                       onChange={( e ) => setPassword( e.target.value )}/>
                                <i className={showPassword ? 'bx bx-hide' : 'bx bx-show'}
                                   onClick={handleShowPassword}/>
                            </div>
                        </div>
                        <div className="form__content">
                            <label htmlFor="passwordConfirm"></label>
                            <div className="form__content-password">
                                <input type="password" name="passwordConfirm" id="passwordConfirm"
                                       placeholder="Confirmez votre nouveau mot de passe"
                                       value={passwordConfirm}
                                       onChange={( e ) => setPasswordConfirm( e.target.value )}/>
                                <i className={showPassword ? 'bx bx-hide' : 'bx bx-show'}
                                   onClick={handleShowPassword}/>
                            </div>
                        </div>
                        <div className="form__content">
                            <button type="submit">Modifier</button>
                        </div>
                        {error && <p className="form__error">{error}</p>}
                    </form>
                </div>
            </div>
        </section>
    )
}