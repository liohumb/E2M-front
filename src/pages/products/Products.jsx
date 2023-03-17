import { useContext } from 'react'
import { Context } from '../../context/Context'

import Side from '../../navigations/side/Side'

import './products.scss'

export default function Products() {
    const {user} = useContext(Context)

    return (
        <section className="products section">
            <div className="products__container section__container">
                <div className="products__container-left section__container-left"></div>
                <div className="products__container-right section__container-right">
                    <Side name={user.firstname + ' ' + user.lastname} society={user.society} products/>
                </div>
            </div>
        </section>
    )
}