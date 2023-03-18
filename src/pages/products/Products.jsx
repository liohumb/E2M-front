import { useContext, useState, useEffect } from 'react'
import { Context } from '../../context/Context'
import axios from 'axios'

import Side from '../../navigations/side/Side'
import Card from '../../components/card/Card'

import './products.scss'
import { useParams } from 'react-router-dom'

export default function Products() {
    const {user} = useContext(Context)
    const id = useParams().id
    const [products, setProducts] = useState([])

    useEffect( () => {
        const getProducts = async () => {
            const response = await axios.get('http://localhost:8080/product', {
                params : {
                    artisan: id
                }
            })
            setProducts(response.data)
        }
        getProducts()
    }, [id])

    return (
        <section className="products section">
            <div className="products__container section__container">
                <div className="products__container-left section__container-left">
                    <div className="products__cards">
                        {products.map( ( product ) =>
                            <Card key={product._id} product={product}/>
                        )}
                    </div>
                </div>
                <div className="products__container-right section__container-right">
                    <Side name={user.firstname + ' ' + user.lastname} society={user.society} products/>
                </div>
            </div>
        </section>
    )
}