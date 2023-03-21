import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

import Side from '../../navigations/side/Side'

import './register.scss'

export default function Register() {
    const [showSocietyInput, setShowSocietyInput] = useState( false )
    const [firstname, setFirstname] = useState( '' )
    const [lastname, setLastname] = useState( '' )
    const [email, setEmail] = useState( '' )
    const [password, setPassword] = useState( '' )
    const [society, setSociety] = useState( '' )
    const [role, setRole] = useState( 'USER' )
    const [showPassword, setShowPassword] = useState( false )
    const [newUserEmail, setNewUserEmail] = useState( '' )
    const [error, setError] = useState( '' )

    const navigate = useNavigate()
    const { token } = useParams()

    useEffect( () => {
        async function verifyToken() {
            try {
                const response = await axios.post( `http://localhost:8080/new-user/${token}` )
                const data = await response.json()

                if (data === false) {
                    navigate( '/connexion' )
                    return null
                }

                setEmail( data.email )
                setNewUserEmail( data.email )
            } catch (e) {
            }
        }

        verifyToken()
    }, [navigate, token] )

    const handleCheckboxChange = ( event ) => {
        setShowSocietyInput( event.target.checked )
        setRole( event.target.checked ? 'ARTISAN' : 'USER' )
    }

    const handleSubmit = async ( event ) => {
        event.preventDefault()

        const nameRegex = /^[a-zA-Z\s]+$/
        const passwordRegex = /^[^[\]{}<>]*$/
        const societyRegex = /^[a-zA-Z0-9\s]*$/

        if (!firstname || !lastname) {
            setError( 'Merci de renseigner votre nom' )
            return
        } else if (!firstname.match( nameRegex ) || !lastname.match( nameRegex )) {
            setError( 'Votre nom doit contenir uniquement des lettres' )
            return
        }

        if (email !== newUserEmail) {
            setError( 'Vous ne pouvez pas changer l\'adresse email' )
        }

        if (!password) {
            setError( 'Merci de renseigner un mot de passe' )
            return
        } else if (!password.match( passwordRegex )) {
            setError( 'Votre mot de passe ne doit pas contenir les caractères < > [ ] { }' )
            return
        }

        if (society && !society.match( societyRegex )) {
            setError( 'Votre société doit contenir uniquement des lettres et des chiffres' )
            return
        }

        try {
            const response = await axios.post( `http://localhost:8080/auth/inscription`,
                {
                    role,
                    firstname,
                    lastname,
                    email,
                    password,
                    society
                } )
            await response.json()
            navigate( '/connexion', { state: { email } } )
        } catch (e) {}
    }

    const handleShowPassword = () => {
        if (showPassword) {
            setShowPassword( false )
        } else {
            setShowPassword( true )
        }
    }

    return (
        <section className="register section">
            <div className="register__container section__container">
                <div className="register__container-left section__container-left">
                    <Side/>
                </div>
                <div className="register__container-right section__container-right">
                    <form action="" className="register__form form" onSubmit={handleSubmit}>
                        <div className="form__contents">
                            <div className="form__role">
                                <label htmlFor="role">Êtes-vous un artisan ?</label>
                                <input type="checkbox" name="role" id="role" onChange={handleCheckboxChange}/>
                                <span>{showSocietyInput ? '👇' : '👈'}</span>
                            </div>
                        </div>
                        {showSocietyInput &&
                            <div className="form__contents">
                                <div className="form__content">
                                    <label htmlFor="society"></label>
                                    <input type="text" name="society" id="society"
                                           placeholder="Votre entreprise" required
                                           onChange={( e ) => setSociety( e.target.value )}/>
                                </div>
                            </div>
                        }
                        <div className="form__contents">
                            <div className="form__content">
                                <label htmlFor="firstname"></label>
                                <input type="text" name="firstname" id="firstname"
                                       placeholder="Votre prénom" required
                                       onChange={( e ) => setFirstname( e.target.value )}/>
                            </div>
                            <div className="form__content">
                                <label htmlFor="lastname"></label>
                                <input type="text" name="lastname" id="lastname"
                                       placeholder="Votre nom" required
                                       onChange={( e ) => setLastname( e.target.value )}/>
                            </div>
                        </div>
                        <div className="form__contents">
                            <div className="form__content">
                                <label htmlFor="email"></label>
                                <input type="email" name="email" id="email" required
                                       defaultValue={email} readOnly/>
                            </div>
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
                        </div>
                        <div className="form__content">
                            <button type="submit">S'inscrire</button>
                        </div>
                        {error && <p className="form__error">{error}</p>}
                    </form>
                </div>
            </div>
        </section>
    )
}