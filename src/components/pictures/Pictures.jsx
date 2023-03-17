import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Context } from '../../context/Context'

import './pictures.scss'
import { useParams } from 'react-router-dom'

export default function Pictures() {
    const { user } = useContext( Context )
    const id = useParams().id

    const [banner, setBanner] = useState( '' )
    const [picture, setPicture] = useState( '' )
    const [error, setError] = useState( '' )
    const [pictureUrl, setPictureUrl] = useState( '' )
    const [bannerUrl, setBannerUrl] = useState( '' )

    useEffect( () => {
        const getInfo = async () => {
            const response = await axios.get( `http://localhost:8080/user/${id}` )
            setBanner( response.data.banner )
            setPicture( response.data.picture )
        }
        getInfo()
    }, [id] )

    useEffect( () => {
        const checkImage = async ( imageName ) => {
            try {
                await axios.head( `http://localhost:8080/images/${imageName}` )
                setPictureUrl( `http://localhost:8080/images/${imageName}` )
            } catch (error) {
                console.log( `Error checking image: ${error}` )
            }
        }

        if (picture && picture !== '') {
            checkImage(picture)
        }
    }, [picture] )

    useEffect( () => {
        const checkImage = async ( imageName ) => {
            try {
                await axios.head( `http://localhost:8080/images/${imageName}` )
                setBannerUrl( `http://localhost:8080/images/${imageName}` )
            } catch (error) {
                console.log( `Error checking image: ${error}` )
            }
        }

        if (banner && banner !== '') {
            checkImage(banner)
        }
    }, [banner] )

    const handleBannerUpdate = async ( e ) => {
        const selectedFile = e.target.files[0]
        setBanner( selectedFile )

        const updateBanner = {
            userId: user._id,
            banner: selectedFile.name
        }

        if (selectedFile) {
            const data = new FormData()
            const fileName = Date.now() + selectedFile.name

            data.append( 'name', fileName )
            data.append( 'file', selectedFile )

            updateBanner.banner = fileName

            try {
                await axios.post( 'http://localhost:8080/upload', data )
                await axios.put( `http://localhost:8080/user/${user._id}`, updateBanner )
            } catch (e) {
                console.log( e )
                setError( 'Une erreur est survenue, merci de réessayer ultérieurement' )
            }

            try {
                setBannerUrl( `http://localhost:8080/images/${updateBanner.banner}` )
            } catch (e) {
                console.log( e )
            }
        }
    }

    const handlePictureUpdate = async ( e ) => {
        const selectedFile = e.target.files[0]
        setPicture( selectedFile )

        const updatePicture = {
            userId: user._id,
            picture: selectedFile.name
        }

        if (selectedFile) {
            const data = new FormData()
            const fileName = Date.now() + selectedFile.name

            data.append( 'name', fileName )
            data.append( 'file', selectedFile )

            updatePicture.picture = fileName

            try {
                await axios.post( 'http://localhost:8080/upload', data )
                await axios.put( `http://localhost:8080/user/${user._id}`, updatePicture )
            } catch (e) {
                console.log( e )
                setError( 'Une erreur est survenue, merci de réessayer ultérieurement' )
            }

            try {
                setPictureUrl( `http://localhost:8080/images/${updatePicture.picture}` )
            } catch (e) {
                console.log( e )
            }
        }
    }

    return (
        <div className="pictures">
            {user.role === 'ARTISAN' &&
                <div className="pictures__banner">
                    <img src={bannerUrl || `http://localhost:8080/images/${banner}`} alt=" "/>
                    <form action="" className="pictures__banner-form">
                        <label htmlFor="banner">
                            <i className="bx bxs-image-add"/>
                        </label>
                        <input
                            type="file"
                            name="banner"
                            id="banner"
                            onChange={handleBannerUpdate}
                        />
                    </form>
                </div>
            }
            <div className="pictures__picture pictures__picture-alt">
                <img
                    src={pictureUrl || `http://localhost:8080/images/${picture}`}
                    alt={user.firstname + ' ' + user.lastname}
                />
                <form action="" className="pictures__picture-form">
                    <label htmlFor="picture">
                        <i className="bx bxs-image-add"/>
                    </label>
                    <input
                        type="file"
                        name="picture"
                        id="picture"
                        onChange={handlePictureUpdate}
                    />
                </form>
            </div>
            {error && <p className="form__error">{error}</p>}
        </div>
    )
}