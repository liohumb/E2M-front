import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Profil from '../profil/Profil'
import {getData, getPreview } from '../../utils'

import './card.scss'

export default function Card( { data } ) {
    const navigate = useNavigate()
    const preview = getPreview(55, data.description)

    const [user, setUser] = useState([])

    getData('user', data.artisan, setUser)

    const handleDetail = () => {
        let path

        if (data.title) {
            path = 'produit'
        } else if (data.role) {
            path = 'artisan'
        } else {
            path = 'post'
        }

        navigate(`/${path}/${data._id}`)
    }

    return (
        <li className="card">
            {data.picture &&
                <img src={`http://localhost:8080/images/${data.picture}`} alt=""
                     className="card__picture"/>
            }
            {data.picture === null ?
                <div className="card__content" onClick={handleDetail}>
                    <p>{preview}</p>
                    {!data.role &&
                        <div className="card__content-profil">
                            <Profil artisan={user} />
                        </div>
                    }
                </div>
                :
                <div className="card__container" onClick={handleDetail}>
                    <p>{preview}</p>
                    {!data.role &&
                        <div className="card__container-profil">
                            <Profil artisan={user}/>
                        </div>
                    }
                </div>
            }
        </li>
    )
}