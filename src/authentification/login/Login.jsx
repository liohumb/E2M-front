import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Context } from '../../context/Context'

import Side from '../../navigations/side/Side'

import './login.scss'

export default function Login() {
    const [email, setEmail] = useState( '' )
    const [password, setPassword] = useState( '' )
    const [passwordRequired, setPasswordRequired] = useState( false )
    const [emailValidated, setEmailValidated] = useState( false )
    const [showSignupButton, setShowSignupButton] = useState( false )
    const [showPassword, setShowPassword] = useState(false)
    const [message, setMessage] = useState( '' )
    const [error, setError] = useState( '' )

    const navigate = useNavigate()
    const { dispatch } = useContext( Context )

    useEffect( () => {
        const checkEmail = async () => {
            try {
                const response = await axios.post(`http://localhost:8080/auth/email-verification`, {email})
                setPasswordRequired( response.data.passwordRequired )
                setEmailValidated( true )
                setShowSignupButton( !response.data.passwordRequired )
            } catch (e) {
                setEmailValidated( false )
                setShowSignupButton( false )
            }
        }

        if (email.includes( '@' )) {
            checkEmail()
        }
    }, [email] )

    const handleSignup = async ( event ) => {
        event.preventDefault()

        try {
            const response = await axios.post(`http://localhost:8080/auth/pre-inscription`, {email})

            if (response.ok) {
                setMessage( 'Un email vous à été envoyé afin de continuer votre inscription' )
            } else {
                setError( 'Une erreur est survenue, veuillez réessayer plus tard' )
            }
        } catch (e) {
            setError( e.response.data.msg )
        }
    }

    const handleLogin = async ( event ) => {
        event.preventDefault()

        dispatch( { type: 'LOGIN_START' } )

        try {
            const response = await axios.post( 'http://localhost:8080/auth/connexion', { email, password } )

            dispatch( { type: 'LOGIN_SUCCESS', payload: response.data } )
            navigate('/')
        } catch (e) {
            dispatch( { type: 'LOGIN_FAILURE' } )
        }
    }

    const handleShowPassword = () => {
        if (showPassword) {
            setShowPassword(false)
        } else {
            setShowPassword(true)
        }
    }

    return (
        <section className="login section">
            <div className="login__container section__container">
                <div className="login__container-left section__container-left">
                    <Side/>
                </div>
                <div className="login__container-right section__container-right">
                    <form action="" className="login__form form"
                          onSubmit={passwordRequired ? handleLogin : handleSignup}>
                        <div className="form__content">
                            <label htmlFor="email"></label>
                            <input type="email" name="email" id="email"
                                   placeholder="Votre adresse email" required
                                   value={email} onChange={( e ) => setEmail(e.target.value)}/>
                        </div>
                        {passwordRequired ?
                            <>
                                <div className="form__content">
                                    <label htmlFor="password"></label>
                                    <div className="form__content-password">
                                        <input type={showPassword ? 'text' : 'password'} name="password" id="password"
                                               placeholder="Votre mot de passe" required
                                               value={password} onChange={( e ) => setPassword(e.target.value)}/>
                                        <i className={showPassword ? 'bx bx-hide' : 'bx bx-show'} onClick={handleShowPassword}/>
                                    </div>
                                </div>
                                <div className="form__content">
                                    <button type="submit">Connexion</button>
                                </div>
                            </>
                        :
                            <>
                                {emailValidated && showSignupButton &&
                                    <div className="form__content">
                                        {message ?
                                            <span>{message}</span>
                                        :
                                            <button type="submit">Inscription</button>
                                        }
                                    </div>
                                }
                            </>
                        }
                        {error && <p className="form__error">{error}</p>}
                    </form>
                </div>
            </div>
        </section>
    )
}