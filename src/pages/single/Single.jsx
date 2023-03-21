import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getData } from '../../utils'

import Side from '../../navigations/side/Side'
import Content from '../../components/content/Content'

import './single.scss'

export default function Single( {post, product} ) {
    const id = useParams().id

    const [data, setData] = useState({picture: '', title: '', description: '', price: null, artisan: ''})
    const [update, setUpdate] = useState(false)

    useEffect( () => {
        const path = post ? 'post' : 'product'
        getData(path, id, setData)
    }, [id, post])

    return (
        <section className="single section">
            <div className="single__container section__container">
                <div className="single__container-left section__container-left">
                    <Side/>
                </div>
                <div className="single__container-right section__container-right">
                    <Content data={data} setData={setData}
                             update={update} setUpdate={setUpdate}/>
                </div>
            </div>
        </section>
    )
}