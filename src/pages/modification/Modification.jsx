import { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Context } from '../../context/Context'
import axios from 'axios'

import Side from '../../navigations/side/Side'
import Pictures from '../../components/pictures/Pictures'

import './modification.scss'

export default function Modification() {
    const { user } = useContext( Context )
    const navigate = useNavigate()

    const [firstname, setFirstname] = useState( '' )
    const [lastname, setLastname] = useState( '' )
    const [society, setSociety] = useState( '' )
    const [postcode, setPostcode] = useState( '' )
    const [activity, setActivity] = useState( '' )
    const [activities, setActivities] = useState( [] )
    const [error, setError] = useState( '' )

    useEffect( () => {
        const getInfo = async () => {
            const response = await axios.get( `http://localhost:8080/user/${user._id}` )
            setFirstname( response.data.firstname )
            setLastname( response.data.lastname )
            setSociety( response.data.society )
            setPostcode( response.data.postcode )
            setActivity( response.data.activity )
        }
        if (user && user._id) {
            getInfo()
        }
    }, [user] )

    useEffect( () => {
        const fetchActivities = async () => {
            try {
                const response = await axios.get( 'http://localhost:8080/activity' )
                setActivities( response.data )
            } catch (e) {
                console.error( e )
            }
        }
        fetchActivities()
    }, [] )

    const handleUpdate = async ( e ) => {
        e.preventDefault()

        const activityExists = activities.find( ( a ) => a.name.toLowerCase() === activity.toLowerCase() )

        if (!activityExists) {
            try {
                const newActivityResponse = await axios.post( 'http://localhost:8080/activities', { name: activity } )
                setActivities( [...activities, newActivityResponse.data] )
            } catch (e) {
                console.error( e )
                setError( 'Une erreur est survenue lors de l\'ajout de l\'activité. Merci de réessayer ultérieurement' )
                return
            }
        }

        try {
            const response = await axios.put( `http://localhost:8080/user/${user._id}`, {
                userId: user._id,
                firstname,
                lastname,
                society,
                postcode,
                activity
            } )
            if (response.data) {
                navigate( `/profil/${user._id}` )
            } else {
                setError( 'Une erreur est survenue merci de réessayer ultérieurement' )
            }
        } catch (e) {
            console.log( e )
            setError( 'Une erreur est survenue merci de réessayer ultérieurement' )
        }
    }

    return (
        <section className="modification section">
            <div className="modification__container">
                <div className="modification__container-left">
                    <Pictures/>
                    <form action="" className="form modification__form" onSubmit={handleUpdate}>
                        <div className="form__content">
                            <label htmlFor="firstname"></label>
                            <input
                                type="text"
                                name="firstname"
                                id="firstname"
                                placeholder="Votre prénom"
                                value={firstname}
                                onChange={( e ) => setFirstname( e.target.value )}
                            />
                        </div>
                        <div className="form__content">
                            <label htmlFor="lastname"></label>
                            <input
                                type="text"
                                name="lastname"
                                id="lastname"
                                placeholder="Votre nom"
                                value={lastname}
                                onChange={( e ) => setLastname( e.target.value )}
                            />
                        </div>
                        <div className="form__content">
                            <label htmlFor="society"></label>
                            <input
                                type="text"
                                name="society"
                                id="society"
                                placeholder="Votre société"
                                value={society}
                                onChange={( e ) => setSociety( e.target.value )}
                            />
                        </div>
                        <div className="form__content">
                            <label htmlFor="postcode"></label>
                            <input
                                type="text"
                                name="postcode"
                                id="postcode"
                                placeholder="Votre code postal"
                                value={postcode}
                                onChange={( e ) => setPostcode( e.target.value )}
                            />
                        </div>
                        <div className="form__content">
                            <label htmlFor="activity"></label>
                            <input
                                list="activities"
                                type="text"
                                name="activity"
                                id="activity"
                                placeholder="Votre secteur d'activité"
                                value={activity}
                                onChange={( e ) => setActivity( e.target.value )}
                            />
                            <datalist id="activities">
                                {activities.map( ( activity, index ) => (
                                    <option key={index} value={activity.name}/>
                                ) )}
                            </datalist>
                        </div>
                        <div className="form__content">
                            <button type="submit">Modifier</button>
                        </div>
                        {error && <p className="form__error">{error}</p>}
                    </form>
                </div>
                <div className="modification__container-right">
                    <Side/>
                </div>
            </div>
        </section>
    )
}