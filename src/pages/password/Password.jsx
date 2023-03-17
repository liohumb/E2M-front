import { useContext, useState } from 'react'
import { Context } from '../../context/Context'
import axios from 'axios'

import Pictures from '../../components/pictures/Pictures'
import Side from '../../navigations/side/Side'

import './password.scss'

export default function Password() {
    const { user } = useContext( Context )

    const [password, setPassword] = useState( '' )
    const [passwordConfirm, setPasswordConfirm] = useState( '' )
    const [error, setError] = useState( '' )

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
        <section className="password section">
            <div className="password__container">
                <div className="password__container-left">
                    <Pictures/>
                    <form action="" className="form password__form" onSubmit={handleSubmit}>
                        <div className="form__content">
                            <label htmlFor="password"></label>
                            <input type="password" name="password" id="password"
                                   placeholder="Votre nouveau mot de passe"
                                   value={password}
                                   onChange={( e ) => setPassword( e.target.value )}/>
                        </div>
                        <div className="form__content">
                            <label htmlFor="passwordConfirm"></label>
                            <input type="password" name="passwordConfirm" id="passwordConfirm"
                                   placeholder="Confirmez votre nouveau mot de passe"
                                   value={passwordConfirm}
                                   onChange={( e ) => setPasswordConfirm( e.target.value )}/>
                        </div>
                        <div className="form__content">
                            <button type="submit">Modifier</button>
                        </div>
                        {error && <p className="form__error">{error}</p>}
                    </form>
                </div>
                <div className="password__container-right">
                    <Side/>
                </div>
            </div>
        </section>
    )
}