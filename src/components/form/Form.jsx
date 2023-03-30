import { checkEmail, checkToken, getPreview, postData, toggle } from '../../utils'
import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Context } from '../../context/Context'

import './form.scss'
import Dropzone from 'react-dropzone'

export default function Form( { auth, login, register, create, post, product } ) {
    const navigate = useNavigate()
    const { token } = useParams()
    const { user, dispatch } = useContext( Context )

    const [firstname, setFirstname] = useState( '' )
    const [lastname, setLastname] = useState( '' )
    const [email, setEmail] = useState( '' )
    const [password, setPassword] = useState( '' )
    const [society, setSociety] = useState( '' )
    const [role, setRole] = useState( 'USER' )
    const [showSociety, setShowSociety] = useState( false )
    const [showPassword, setShowPassword] = useState( false )
    const [check, setCheck] = useState( false )
    const [btn, setBtn] = useState( false )
    const [switchType, setSwitchType] = useState( false )
    const [newUserEmail, setNewUserEmail] = useState( '' )
    const [message, setMessage] = useState( '' )
    const [title, setTitle] = useState( '' )
    const [description, setDescription] = useState( '' )
    const [price, setPrice] = useState( '' )
    const [file, setFile] = useState( null )
    const [sponsor, setSponsor] = useState(false)
    const [error, setError] = useState( '' )

    useEffect( () => {
        if (auth) {
            if (login && email.includes( '@' )) {
                checkEmail( 'email-verification', { email }, setShowPassword, setCheck, setBtn )
            }

            if (register) {
                checkToken( 'new-user', token, navigate, setEmail, setNewUserEmail )
            }
        }
    }, [auth, email, login, navigate, register, token] )

    const handleCheckboxChange = ( e ) => {
        if (register) {
            setShowSociety( e.target.checked )
            setRole( e.target.checked ? 'ARTISAN' : 'USER' )
        } else if (create) {
            setSponsor(e.target.checked ? true : false)
        }
    }

    const onDrop = ( acceptedFiles ) => {
        if (acceptedFiles.length > 0) {
            setFile( acceptedFiles[0] )
        }
    }

    const handleSubmit = async ( e ) => {
        e.preventDefault()

        if (auth) {
            if (register) {
                const nameRegex = /^[a-zA-Z\s]+$/
                const societyRegex = /^[a-zA-Z0-9\s]*$/
                const passwordRegex = /^[^[\]{}<>]*$/

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

                if (society && !society.match( societyRegex )) {
                    setError( 'Votre société doit contenir uniquement des lettres et des chiffres' )
                    return
                }

                if (!password) {
                    setError( 'Merci de renseigner un mot de passe' )
                    return
                } else if (!password.match( passwordRegex )) {
                    setError( 'Votre mot de passe ne doit pas contenir les caractères < > [ ] { }' )
                    return
                }

                try {
                    await postData( 'auth/inscription', {
                        role, firstname, lastname, email, password, society
                    } )
                    navigate( '/connexion', { state: { email } } )
                } catch (e) {
                }

            } else if (login && showPassword) {
                dispatch( { type: 'LOGIN_START' } )

                try {
                    const response = await postData( 'auth/connexion', { email, password } )

                    dispatch( { type: 'LOGIN_SUCCESS', payload: response.data } )
                    navigate( '/' )
                } catch (e) {
                    dispatch( { type: 'LOGIN_FAILURE' } )
                }
            } else {
                try {
                    await postData( 'auth/pre-inscription', { email } )
                    setMessage( 'Un email vous à été envoyé afin de continuer votre inscription' )
                } catch (e) {
                }
            }
        }

        if (create) {
            const newProduct = {
                title, picture: file, description, price, sponsor, artisan: user._id
            }

            const newPost = {
                picture: file, description, sponsor, artisan: user._id
            }

            if (file) {
                const data = new FormData()
                const fileName = Date.now() + file.name

                data.append( 'name', fileName )
                data.append( 'file', file )

                post ? newPost.picture = fileName : newProduct.picture = fileName

                try {
                    await postData( 'upload', data )
                } catch (e) {
                }
            }

            try {
                if (post) {
                    await postData( 'post', newPost )
                    navigate( `/artisan/${user._id}` )
                } else if (product) {
                    await postData( 'product', newProduct )
                    navigate( `/artisan/${user._id}` )
                }
            } catch (e) {
                console.log( e )
            }
        }
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            {auth &&
                <>
                    {register &&
                        <>
                            <div className="form__contents">
                                <div className="form__check">
                                    <label htmlFor="role">Êtes-vous un artisan ?</label>
                                    <input type="checkbox" name="role" id="role" onChange={handleCheckboxChange}/>
                                    <span>{showSociety ? '👇' : '👈'}</span>
                                </div>
                            </div>
                            {showSociety &&
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
                                        <input type={switchType ? 'text' : 'password'} name="password" id="password"
                                               placeholder="Votre mot de passe" required
                                               onChange={( e ) => setPassword( e.target.value )}/>
                                        <i className={switchType ? 'bx bx-hide' : 'bx bx-show'}
                                           onClick={() => toggle( switchType, setSwitchType )}/>
                                    </div>
                                </div>
                            </div>
                        </>
                    }
                    {login &&
                        <>
                            <div className="form__content">
                                <label htmlFor="email"></label>
                                <input type="email" name="email" id="email"
                                       placeholder="Votre adresse email" required
                                       value={email} onChange={( e ) => setEmail( e.target.value )}/>
                            </div>
                            {showPassword ?
                                <>
                                    <div className="form__content">
                                        <label htmlFor="password"></label>
                                        <div className="form__content-password">
                                            <input type={switchType ? 'text' : 'password'} name="password" id="password"
                                                   placeholder="Votre mot de passe" required
                                                   value={password} onChange={( e ) => setPassword( e.target.value )}/>
                                            <i className={switchType ? 'bx bx-hide' : 'bx bx-show'}
                                               onClick={() => toggle( switchType, setSwitchType )}/>
                                        </div>
                                    </div>
                                    <div className="form__content">
                                        <button type="submit">Connexion</button>
                                    </div>
                                </>
                                :
                                <>
                                    {check && btn &&
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
                        </>
                    }
                    {!login &&
                        <div className="form__content">
                            <button type="submit">S'inscrire</button>
                        </div>
                    }
                </>
            }
            {create &&
                <>
                    <div className="form__content">
                        <Dropzone onDrop={onDrop}>
                            {( { getRootProps, getInputProps } ) => (
                                <div {...getRootProps()} className="form__content-image">
                                    <input {...getInputProps()}/>
                                    {file ? (
                                        <p>{getPreview( 25, file.name )}</p>
                                    ) : (
                                        <p>Ajouter une image ici <span>👈</span></p>
                                    )}
                                </div>
                            )}
                        </Dropzone>
                    </div>
                    {product &&
                        <div className="form__contents">
                            <div className="form__content">
                                <label htmlFor="title"></label>
                                <input type="text" name="title" id="title"
                                       placeholder="Le titre de votre produit"
                                       value={title} onChange={( e ) => setTitle( e.target.value )}/>
                            </div>
                            <div className="form__content">
                                <label htmlFor="price"></label>
                                <input type="number" name="price" id="price"
                                       placeholder="À partir de… €"
                                       value={price} onChange={( e ) => setPrice( e.target.value )}/>
                            </div>
                        </div>
                    }
                    <div className="form__content">
                        <label htmlFor="description"></label>
                        <textarea name="description" id="description"
                                  value={description} placeholder="La description de votre produit"
                                  onChange={( e ) => setDescription( e.target.value )}></textarea>
                    </div>
                    <div className="form__content">
                        <div className="form__check">
                            <label htmlFor="sponsor">Est ce un {post ? 'post' : 'produit'} sponsorisé ?</label>
                            <input type="checkbox" name="sponsor" id="sponsor" onChange={handleCheckboxChange}/>
                        </div>
                    </div>
                    <div className="form__content">
                        <button type="submit">Ajouter</button>
                    </div>
                </>
            }
            {error && <p className="form__error">{error}</p>}
        </form>
    )
}