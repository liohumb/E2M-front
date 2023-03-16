import { useState, useEffect } from 'react'
import axios from 'axios'

import './profil.scss'

export default function Profil( { author = '' } ) {
    const [profil, setProfil] = useState( [] )

    useEffect( () => {
        const getAuthor = async () => {
            try {
                const response = await axios.get( `http://localhost:8080/user/${author}` )
                setProfil( response.data )
            } catch (e) {
                console.error( e )
            }
        }

        getAuthor()
    }, [author] )

    if (profil && profil.picture) {
        const picture = `http://localhost:8080/images/${profil.picture}`

        return (
            <div className="profil">
                <div className="profil__artisan">
                    <img src={picture} alt=" "/>
                    <div className="profil__artisan-infos">
                        <h6>{profil.firstname} {profil.lastname}</h6>
                        <span>{profil.society}</span>
                    </div>
                </div>
                <button className="profil__artisan-add">
                    <i className="bx bx-user-plus"/>
                </button>
            </div>
        )
    } else {
        return (
            <div className="profil">
                <div className="profil__artisan">
                    <img src="" alt=" "/>
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
}