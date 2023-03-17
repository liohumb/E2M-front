import { useContext, useEffect, useState } from 'react'
import { Context } from '../../context/Context'
import axios from 'axios'

import Side from '../../navigations/side/Side'
import Pictures from '../../components/pictures/Pictures'
import Post from '../../components/post/Post'

import './profils.scss'
import { Link, useParams } from 'react-router-dom'

export default function Profils() {
    const { user } = useContext( Context )
    const id = useParams().id

    const [firstname, setFirstname] = useState( '' )
    const [lastname, setLastname] = useState( '' )
    const [society, setSociety] = useState( '' )
    const [postcode, setPostcode] = useState( '' )
    const [city, setCity] = useState( '' )
    const [activity, setActivity] = useState( '' )
    const [description, setDescription] = useState( '' )
    const [socials, setSocials] = useState( [] )
    const [posts, setPosts] = useState( [] )
    const [showIcons, setShowIcons] = useState( false )

    const handleIcons = () => {
        if (showIcons) {
            setShowIcons( false )
        } else {
            setShowIcons( true )
        }
    }

    useEffect( () => {
        const getInfo = async () => {
            const response = await axios.get( `http://localhost:8080/user/${id}` )
            setFirstname( response.data.firstname )
            setLastname( response.data.lastname )
            setSociety( response.data.society )
            setPostcode( response.data.postcode )
            setCity( response.data.city )
            setActivity( response.data.activity )
            setDescription( response.data.description )
        }
        getInfo()
    }, [id] )

    useEffect( () => {
        const getSocials = async () => {
            try {
                const response = await axios.get( 'http://localhost:8080/social', {
                    params: {
                        user: id
                    }
                } )
                setSocials( response.data )
            } catch (e) {
                console.error( e )
            }
        }
        getSocials()
    }, [id] )

    useEffect( () => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get( `http://localhost:8080/post` )
                setPosts( response.data )
            } catch (e) {
                console.error( e )
            }
        }

        fetchPosts()
    }, [] )

    return (
        <section className="profils section">
            <div className="profils__container section__container">
                <div className="profils__container-left section__container-left">
                    {user && user.role === 'ARTISAN' &&
                        <div className="profils__details">
                            <div className="profils__details-localisation">
                                <i className="bx bx-map"/>
                                <span>{postcode + ' | ' + city}</span>
                            </div>
                            <div className="profils__details-job">
                                <span>{activity}</span>
                                <i className="bx bx-briefcase"/>
                            </div>
                        </div>}
                    <Pictures/>
                    <div className="profils__dots">
                        <i className={`bx ${showIcons ? 'bx-x' : 'bx-dots-horizontal-rounded'}`} onClick={handleIcons}/>
                        <div className={`profils__dots-modal ${showIcons && 'profils__dots-modal--active'}`}>
                            {socials.map( ( social ) => (
                                <Link key={social._id} to={social.url} target="_blank">
                                    {social.name === 'Site internet' ?
                                        <i className="bx bx-code-block"></i>
                                        :
                                        <i className={`bx bxl-${(social.name).toLowerCase()}`}/>
                                    }
                                </Link>
                            ) )}
                            <i className="bx bxs-chat"/>
                            <i className="bx bx-at"/>
                        </div>
                    </div>
                    <div className="profils__infos">
                        <div className="profils__infos-left">
                            <div className="profils__infos-social">
                                {socials.map( ( social ) => (
                                    <Link key={social._id} to={social.url} target="_blank">
                                        {social.name === 'Site internet' ?
                                            <i className="bx bx-code-block"></i>
                                            :
                                            <i className={`bx bxl-${(social.name).toLowerCase()}`}/>
                                        }
                                    </Link>
                                ) )}
                            </div>
                        </div>
                        <div className="profils__infos-right">
                            <div className="profils__infos-contact">
                                <i className="bx bxs-chat"/>
                                <i className="bx bx-at"/>
                            </div>
                        </div>
                    </div>
                    <div className={`profils__post ${showIcons && 'profils__post-active'}`}>
                        {posts.reverse().map( ( post ) => (
                            <Post key={post._id} post={post}/>
                        ) )}
                    </div>
                </div>
                <div className="profils__container-right section__container-right">
                    <Side name={firstname + ' ' + lastname} society={society} description={description}/>
                </div>
            </div>
        </section>
    )
}