import { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../../context/Context'
import axios from 'axios'

import profil from '../../assets/images/user/profil.png'
import './artisan.scss'

export default function Artisan(  ) {
    const {user} = useContext(Context)
    const [artisan, setArtisan] = useState('')

    useEffect( () => {
        const getInfo = async () => {
            const response = await axios.get(`http://localhost:8080/user/${user._id}`)
            setArtisan(response.data)
        }

        if (user && user._id) {
            getInfo()
        }
    }, [user] )

    return (
        <div className="artisan block">
            <div className="artisan__container">
                <div className="artisan__profil">
                    <div className="artisan__profil-infos">
                        <img src={`http://localhost:8080/images/${artisan.picture}`}
                             alt={artisan.firstname + ' ' + artisan.lastname}/>
                        <div className="artisan__profil-infos--info">
                            <h4>{artisan.firstname + ' ' + artisan.lastname}</h4>
                            <span>Suivi par 231 utilisateurs</span>
                        </div>
                    </div>
                    <Link to="/profil/:id/modifier" className="artisan__profil-edit">
                        <i className="bx bxs-edit"/>
                    </Link>
                </div>
                <div className="artisan__activity">
                    <div className="artisan__activity-info">
                        <i className="bx bx-map"/>
                        <span>{artisan.postcode}</span>
                    </div>
                    <div className="artisan__activity-info">
                        <i className="bx bx-briefcase"/>
                        <span>Menuisier</span>
                    </div>
                </div>
                <div className="artisan__stat">
                    <div className="artisan__stat-info">
                        <p>Vue du profil</p>
                        <span>5345</span>
                    </div>
                    <div className="artisan__stat-info">
                        <p>Intéraction des publication</p>
                        <span>76867</span>
                    </div>
                </div>
                <div className="artisan__social">
                    <h4>Vos réseaux</h4>
                    <div className="artisan__social-infos">
                        <div className="artisan__social-infos--info">
                            <i className="bx bxl-twitter"/>
                            <div className="artisan__social-infos--info---name">
                                <h6>Twitter</h6>
                                <span>@johndoe</span>
                            </div>
                        </div>
                        <Link to="profil/:id/social" className="artisan__social-infos--edit">
                            <i className="bx bxs-pencil"/>
                        </Link>
                    </div>
                    <div className="artisan__social-infos">
                        <div className="artisan__social-infos--info">
                            <i className="bx bxl-linkedin"/>
                            <div className="artisan__social-infos--info---name">
                                <h6>Linkedin</h6>
                                <span>@john-doe</span>
                            </div>
                        </div>
                        <Link to="profil/:id/social" className="artisan__social-infos--edit">
                            <i className="bx bxs-pencil"/>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}