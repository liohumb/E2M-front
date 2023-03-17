import { useContext, useState, useEffect } from 'react'
import { Context } from '../../context/Context'
import axios from 'axios'
import Pictures from '../../components/pictures/Pictures'
import Side from '../../navigations/side/Side'
import './social.scss'

const socialNetworks = [
    'Facebook',
    'Instagram',
    'Twitter',
    'LinkedIn',
    'Pinterest',
    'TikTok',
    'SnapChat',
    'Site internet'
]

export default function Social() {
    const { user } = useContext( Context )

    const [addedSocials, setAddedSocials] = useState( [] )
    const [selectedSocial, setSelectedSocial] = useState( socialNetworks[0] )
    const [socialUrl, setSocialUrl] = useState( '' )

    useEffect( () => {
        const fetchSocials = async () => {
            try {
                const response = await axios.get( 'http://localhost:8080/social', {
                    params: {
                        user: user._id
                    }
                } )
                setAddedSocials( response.data )
            } catch (e) {
                console.error( e )
            }
        }
        fetchSocials()
    }, [user._id] )


    const addSocialToDB = async ( social ) => {
        try {
            const newSocial = {
                ...social,
                user: user._id
            }

            const response = await axios.post( 'http://localhost:8080/social', newSocial )
            return response.data
        } catch (error) {
            console.error( 'Error adding social to database:', error )
            return null
        }
    }


    const updateSocialInDB = async ( id, updatedSocial ) => {
        try {
            const updatedSocialWithUser = {
                ...updatedSocial,
                user: user._id
            }


            const response = await axios.put(
                `http://localhost:8080/social/${id}`,
                updatedSocialWithUser
            )
            return response.data
        } catch (error) {
            console.error( 'Error updating social in database:', error )
            return null
        }
    }

    const deleteSocialFromDB = async ( id ) => {
        try {
            await axios.delete( `http://localhost:8080/social/${id}`, {
                data: {
                    user: user._id
                }
            } )
        } catch (e) {
            console.error( e )
        }
    }


    const handleAddSocial = async ( e ) => {
        e.preventDefault()

        const newSocial = { name: selectedSocial, url: socialUrl }
        const savedSocial = await addSocialToDB( newSocial )

        if (savedSocial) {
            setAddedSocials( [...addedSocials, savedSocial] )
            setSocialUrl( '' )
        }
    }

    const handleUpdateSocial = async ( e, id ) => {
        e.preventDefault()

        const updatedSocial = addedSocials.find( ( social ) => social._id === id )

        const savedSocial = await updateSocialInDB( id, updatedSocial )

        if (savedSocial) {
            setAddedSocials(
                addedSocials.map( ( social ) =>
                    social._id === id ? savedSocial : social
                )
            )
            setSocialUrl( '' )
        }
    }

    const handleChange = ( id, field, value ) => {
        setAddedSocials(
            addedSocials.map( ( social ) =>
                social._id === id ? { ...social, [field]: value } : social
            )
        )
    }

    const handleDeleteSocial = async (id) => {
        const confirmation = window.confirm("Voulez-vous vraiment supprimer ce réseau social ?");

        if (confirmation) {
            await deleteSocialFromDB(id);
            setAddedSocials(addedSocials.filter((social) => social._id !== id));
        }
    };

    return (
        <section className="social section">
            <div className="social__container">
                <div className="social__container-left">
                    <Pictures/>
                    {addedSocials.map( ( social ) => (
                        <form
                            key={social._id}
                            onSubmit={( e ) => handleUpdateSocial( e, social._id )}
                            className="form social__form"
                        >
                            <i className="bx bx-trash" onClick={() => handleDeleteSocial( social._id )}/>
                            <div className="form__content">
                                <label htmlFor={`name-${social._id}`}></label>
                                <select
                                    value={social.name}
                                    onChange={( e ) => handleChange( social._id, 'name', e.target.value )}
                                    name={`name-${social._id}`}
                                    id={`name-${social._id}`}
                                >
                                    {socialNetworks.map( ( network ) => (
                                        <option key={network} value={network}>
                                            {network}
                                        </option>
                                    ) )}
                                </select>
                            </div>
                            <div className="form__content">
                                <label htmlFor={`url-${social._id}`}></label>
                                <input
                                    type="text"
                                    name={`url-${social._id}`}
                                    id={`url-${social._id}`}
                                    value={social.url}
                                    onChange={( e ) => handleChange( social._id, 'url', e.target.value )}
                                    placeholder="L'URL de votre profil"
                                />
                            </div>
                            <div className="form__content">
                                <button type="submit">Mettre à jour</button>
                            </div>
                        </form>
                    ) )}
                    <form onSubmit={handleAddSocial} className="form social__form">
                        <div className="form__content">
                            <label htmlFor="new-social-name"></label>
                            <select
                                value={selectedSocial}
                                onChange={(e) => setSelectedSocial(e.target.value)}
                                name="new-social-name"
                                id="new-social-name"
                            >
                                {socialNetworks.map((network) => (
                                    <option key={network} value={network}>
                                        {network}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form__content">
                            <label htmlFor="new-social-url"></label>
                            <input
                                type="text"
                                name="new-social-url"
                                id="new-social-url"
                                value={socialUrl}
                                onChange={( e ) => setSocialUrl( e.target.value )}
                                placeholder="L'URL de votre profil"
                            />
                        </div>
                        <div className="form__content">
                            <button type="submit">Ajouter</button>
                        </div>
                    </form>
                </div>
                <div className="social__container-right">
                    <Side/>
                </div>
            </div>
        </section>
    )
}