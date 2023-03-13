import { useState } from 'react'
import Side from '../../navigations/side/Side'

import banner from '../../assets/images/user/banner.jpg'
import profil from '../../assets/images/user/profil.png'
import './profils.scss'
import Post from '../../components/post/Post'

export default function Profils(  ) {
    const [showIcons, setShowIcons] = useState(false)

    const handleIcons = () => {
        if (showIcons) {
            setShowIcons(false)
        } else {
            setShowIcons(true)
        }
    }
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
                    <div className="profils__pictures">
                        <div className="profils__pictures-banner">
                            <img src={banner} alt=" "/>
                        </div>
                        <div className="profils__pictures-picture">
                            <img src={profil} alt=" "/>
                        </div>
                    </div>
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
                        <Post/>
                        <Post/>
                        <Post/>
                    </div>
                </div>
                <div className="profils__container-right">
                    <Side/>
                </div>
            </div>
        </section>
    )
}