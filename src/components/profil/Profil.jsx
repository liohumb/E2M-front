import profil from '../../assets/images/user/profil.png'
import './profil.scss'

export default function Profil(  ) {
    return (
        <div className="profil">
            <div className="profil__artisan">
                <img src={profil} alt=" "/>
                <div className="profil__artisan-infos">
                    <h6>John Doe</h6>
                    <span>Doe Enterprise</span>
                </div>
            </div>
            <button className="profil__artisan-add">
                <i className="bx bx-user-plus"/>
            </button>
        </div>
    )
}