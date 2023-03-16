import { useEffect, useState } from 'react'

import Side from '../../navigations/side/Side'
import Pictures from '../../components/pictures/Pictures'
import './profils.scss'
import Post from '../../components/post/Post'
import axios from 'axios'

export default function Profils(  ) {
    const [posts, setPosts] = useState( [] )
    const [showIcons, setShowIcons] = useState(false)

    const handleIcons = () => {
        if (showIcons) {
            setShowIcons(false)
        } else {
            setShowIcons(true)
        }
    }

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
            <div className="profils__container">
                <div className="profils__container-left">
                    <div className="profils__details">
                        <div className="profils__details-localisation">
                            <i className="bx bx-map"/>
                            <span>59960 | Neuville en Ferrain</span>
                        </div>
                        <div className="profils__details-job">
                            <span>Menuisier</span>
                            <i className="bx bx-briefcase"/>
                        </div>
                    </div>
                    <Pictures/>
                    <div className="profils__dots">
                        <i className={`bx ${showIcons ? 'bx-x' : 'bx-dots-horizontal-rounded'}`} onClick={handleIcons}/>
                        <div className={`profils__dots-modal ${showIcons && 'profils__dots-modal--active'}`}>
                            <i className="bx bxl-twitter"/>
                            <i className="bx bxl-linkedin"/>
                            <i className="bx bxs-chat"/>
                            <i className="bx bx-at"/>
                            <i className="bx bxs-phone-call"/>
                        </div>
                    </div>
                    <div className="profils__infos">
                        <div className="profils__infos-left">
                            <div className="profils__infos-social">
                                <i className="bx bxl-twitter"/>
                                <i className="bx bxl-linkedin"/>
                            </div>
                            <div className="profils__infos-localisation">
                                <i className="bx bx-map"/>
                                <span>59960 | Neuville en Ferrain</span>
                            </div>
                        </div>
                        <div className="profils__infos-right">
                            <div className="profils__infos-job">
                                <span>Menuisier</span>
                                <i className="bx bx-briefcase"/>
                            </div>
                            <div className="profils__infos-contact">
                                <i className="bx bxs-chat"/>
                                <i className="bx bx-at"/>
                                <i className="bx bxs-phone-call"/>
                            </div>
                        </div>
                    </div>
                    <div className={`profils__post ${showIcons && 'profils__post-active'}`}>
                        {posts.reverse().map( ( post ) => (
                            <Post key={post._id} post={post}/>
                        ) )}
                    </div>
                </div>
                <div className="profils__container-right">
                    <Side/>
                </div>
            </div>
        </section>
    )
}