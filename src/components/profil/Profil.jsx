import './profil.scss'

export default function Profil( { artisan } ) {

    return (
        <div className="profil">
            <div className="profil__container">
                <span className="profil__name">{artisan.firstname + ' ' + artisan.lastname}</span>
                {artisan.picture &&
                    <img src={`http://localhost:8080/images/${artisan.picture}`} alt=""
                         className="profil__picture"/>}
            </div>
        </div>
    )
}