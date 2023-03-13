import profil from '../../assets/images/user/profil.png'
import './artisan.scss'
import { Link } from 'react-router-dom'

export default function Artisan(  ) {
    return (
        <div className="artisan block">
            <div className="artisan__container">
                <div className="artisan__profil">
                    <div className="artisan__profil-infos">
                        <img src={profil} alt=" "/>
                        <div className="artisan__profil-infos--info">
                            <h4>John Doe</h4>
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
                        <span>59960 Neuville en Ferrain</span>
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