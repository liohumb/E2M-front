import { Link } from 'react-router-dom'

import post from '../../assets/images/posts/post1.jpg'
import './sponsor.scss'

export default function Sponsor() {
    return (
        <div className="sponsor block">
            <div className="sponsor__container">
                <div className="sponsor__create">
                    <h4>Sponsorisé</h4>
                    <Link to="/Sponsorise/create" className="sponsor__create-link">Mettre en avant</Link>
                </div>
                <div className="sponsor__post">
                    <img src={post} alt=" "/>
                </div>
                <div className="sponsor__infos">
                    <div className="sponsor__infos-name">
                        <h6>Doe Enterprise</h6>
                        <Link to="http://doe-entrerprise.com" target="_blank" className="sponsor__infos-name--link">doe-enterprise.com</Link>
                    </div>
                    <div className="sponsor__infos-details">
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam consequatur delectus dolore
                            eveniet.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}