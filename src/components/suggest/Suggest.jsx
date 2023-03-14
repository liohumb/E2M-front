import Profil from '../profil/Profil'

import './suggest.scss'

export default function Suggest(  ) {
    return (
        <div className="suggest block">
            <div className="suggest__container">
                <h4>Les derniers Artisans</h4>
                <div className="suggest__artisan">
                    <Profil/>
                    <Profil/>
                    <Profil/>
                </div>
            </div>
        </div>
    )
}