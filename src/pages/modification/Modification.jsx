import { useContext, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Context } from '../../context/Context'
import axios from 'axios'

import Side from '../../navigations/side/Side'

import './modification.scss'
import { getData } from '../../utils'

export default function Modification() {
    const { user } = useContext( Context )
    const id = useParams().id
    const navigate = useNavigate()

    const [artisan, setArtisan] = useState([])
    const [firstname, setFirstname] = useState( '' )
    const [lastname, setLastname] = useState( '' )
    const [society, setSociety] = useState( '' )
    const [postcode, setPostcode] = useState( '' )
    const [city, setCity] = useState( '' )
    const [cities, setCities] = useState( [] )
    const [activity, setActivity] = useState( '' )
    const [activities, setActivities] = useState( [] )
    const [description, setDescription] = useState( '' )
    const [error, setError] = useState( '' )
    const [isFetchingCities, setIsFetchingCities] = useState( false )

    useEffect( () => {
        getData('user', id, setArtisan)
    }, [id])

    useEffect( () => {
        const getInfo = async () => {
            const response = await axios.get( `http://localhost:8080/user/${user._id}` )
            setFirstname( response.data.firstname )
            setLastname( response.data.lastname )
            setSociety( response.data.society )
            setPostcode( response.data.postcode )
            setCity( response.data.city )
            setActivity( response.data.activity )
            setDescription( response.data.description )
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

    useEffect( () => {
        const fetchCities = async () => {
            setIsFetchingCities( true )

            try {
                const response = await axios.get( `https://geo.api.gouv.fr/communes?codePostal=${postcode}&fields=nom&format=json&geometry=centre` )
                setCities( response.data )
            } catch (e) {
                console.error( e )
                setError( 'Une erreur est survenue lors de la récupération des villes correspondant au code postal' )
            } finally {
                setIsFetchingCities( false )
            }
        }
            fetchCities()
    }, [postcode] )

    const handlePostcodeChange = ( event ) => {
        setPostcode( event.target.value )
        setCities( [] )
        setError( '' )
    }

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
                city,
                activity,
                description
            } )
            if (response.data) {
                navigate( `/artisan/${user._id}` )
            } else {
                setError( 'Une erreur est survenue merci de réessayer ultérieurement' )
            }
        } catch (e) {
            console.log( e )
            setError( 'Une erreur est survenue merci de réessayer ultérieurement' )
        }
    }

    return (
        <section className="home section">
            <div className="home__container section__container">
                <div className="home__container-left section__container-left">
                    <Side artisan={artisan}/>
                </div>
                <div className="home__container-right section__container-right">
                    <form action="" className="form modification__form" onSubmit={handleUpdate}>
                        <div className="form__contents">
                            <div className="form__content">
                                <label htmlFor="firstname"></label>
                                <input type="text" name="firstname" id="firstname" placeholder="Votre prénom"
                                       value={firstname} onChange={( e ) => setFirstname( e.target.value )}/>
                            </div>
                            <div className="form__content">
                                <label htmlFor="lastname"></label>
                                <input type="text" name="lastname" id="lastname" placeholder="Votre nom"
                                       value={lastname} onChange={( e ) => setLastname( e.target.value )}/>
                            </div>
                        </div>
                        <div className="form__content">
                            <label htmlFor="society"></label>
                            <input type="text" name="society" id="society" placeholder="Votre société" value={society}
                                   onChange={( e ) => setSociety( e.target.value )}/>
                        </div>
                        <div className="form__contents">
                            <div className="form__content">
                                <label htmlFor="postcode"></label>
                                <input type="text" name="postcode" id="postcode" placeholder="Votre code postal"
                                       value={postcode} onChange={handlePostcodeChange}/>
                            </div>
                            <div className="form__content">
                                <label htmlFor="city"></label>
                                {isFetchingCities ? (
                                    <select name="city" id="city" disabled>
                                        <option value="">Chargement des villes...</option>
                                    </select>
                                ) : (
                                    <select name="city" id="city" value={city}
                                            onChange={( e ) => setCity( e.target.value )}>
                                        <option value="">Sélectionnez votre commune</option>
                                        {cities.map( ( city ) => (
                                            <option key={city.code} value={city.nom}>
                                                {city.nom}
                                            </option>
                                        ) )}
                                    </select>
                                )}
                            </div>
                        </div>
                        <div className="form__content">
                            <label htmlFor="activity"></label>
                            <input list="activities" type="text" name="activity" id="activity"
                                   placeholder="Votre secteur d'activité" value={activity}
                                   onChange={( e ) => setActivity( e.target.value )}/>
                            <datalist id="activities">
                                {activities.map( ( activity, index ) => (
                                    <option key={index} value={activity.name}/>
                                ) )}
                            </datalist>
                        </div>
                        <div className="form__content">
                            <label htmlFor="description"></label>
                            <textarea name="description" id="description"
                                      onChange={( e ) => setDescription( e.target.value )} value={description}>
              {description}
            </textarea>
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