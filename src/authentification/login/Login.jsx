import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import logo from '../../assets/images/logos/logo-alt.png'
import './login.scss'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordRequired, setPasswordRequired] = useState(false)
    const [loading, setLoading] = useState(false)
    const [emailValidated, setEmailValidated] = useState(false)
    const [showSignupButton, setShowSignupButton] = useState(false)
    const [title, setTitle] = useState('')
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        const checkEmail = async () => {
            try {
                const response = await fetch('http://localhost:8080/auth/email-verification', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({email}),
                })
                const data = await response.json()
                setPasswordRequired(data.passwordRequired)
                setEmailValidated(true)
                setShowSignupButton(!data.passwordRequired)
                setTitle(data.passwordRequired ? 'Connexion' : 'Inscription')
            } catch (error) {
                setEmailValidated(false)
                setShowSignupButton(false)
                console.error(error)
            }
        }

        if (email.includes('@')) {
            checkEmail()
        }
    }, [email])

    const handleSignup = async (event) => {
        event.preventDefault()

        try {
            const response = await fetch('http://localhost:8080/auth/pre-inscription', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email}),
            })

            if (response.ok) {
                setMessage('Un email vous à été envoyé afin de continuer votre inscription')
            } else {
                setError('Une erreur est survenue, veuillez réessayer plus tard')
            }
        } catch (error) {
            setError(error.response.data.msg)
        }
    }

    const handleLogin = async (event) => {
        event.preventDefault()
        setLoading(true)

        try {
            const response = await fetch('http://localhost:8080/auth/connexion', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email, password}),
            })
            const data = await response.json()

            if (data.user.password) {
                const userResponse = await fetch(`http://localhost:8080/new-user/${email}`)
                const userData = await userResponse.json()

                if (userData.exists) {
                    const deleteResponse = await fetch(`http://localhost:8080/new-user/${email}`, {
                        method: 'DELETE',
                    })
                    const deleteData = await deleteResponse.json()

                    if (!deleteData.success) {
                        setError('Une erreur est survenue, veuillez réessayer plus tard')
                        return
                    }
                }

                const user = {
                    id: data.user._id,
                    role: data.user.role,
                    firstname: data.user.firstname,
                    lastname: data.user.lastname,
                    email: email,
                    postCode: data.user.postCode,
                    society: data.user.society,
                    picturePath: data.user.picturePath,
                    bannerPath: data.user.bannerPath,
                    isAuthenticated: true
                }

                localStorage.setItem('user', JSON.stringify(user))
                navigate('/')
            } else {
                setError('Mot de passe incorrect')
            }
        } catch (error) {
            setError(error.response.data.msg)
        }

        setLoading(false)
    }

    return (
        <section className="login">
            <div className="login__container">
                <h2 className="login__title">{title || <img src={logo} alt=""/>}</h2>
                <form className="form" onSubmit={passwordRequired ? handleLogin : handleSignup}>
                    <div className="form__content">
                        <label htmlFor="email"></label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Merci de saisir votre adresse email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            required
                        />
                    </div>
                    {passwordRequired ? (
                        <>
                            <div className="form__content">
                                <label htmlFor="password"></label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Votre mot de passe"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                    required
                                />
                            </div>
                            <div className="form__content">
                                <button type="submit" disabled={loading}>
                                    {title || 'Connexion'}
                                </button>
                            </div>
                        </>
                    ) : (
                        emailValidated &&
                        showSignupButton && (
                            <div className="form__content">
                                {message ? message :
                                    <button type="submit">{title || 'Inscription'}</button>
                                }
                            </div>
                        )
                    )}
                    {error && <p className="form__error">{error}</p>}
                </form>
            </div>
        </section>
    )
}