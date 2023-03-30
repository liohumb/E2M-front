import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getData } from '../../utils'

import Side from '../../navigations/side/Side'
import Form from '../../components/form/Form'

import './create.scss'

export default function Create( { post, product } ) {
    const id = useParams().id

    const [artisan, setArtisan] = useState( [] )

    useEffect( () => {
        getData( 'user', id, setArtisan )
    }, [id] )

    return (
        <section className="create section">
            <div className="create__container section__container">
                <div className="create__container-left section__container-left">
                    <Side artisan={artisan}/>
                </div>
                <div className="create__container-right section__container-right">
                    <Form create post={post} product={product}/>
                </div>
            </div>
        </section>
    )
}