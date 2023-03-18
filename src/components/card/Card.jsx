import { useNavigate } from 'react-router-dom'

import './card.scss'

export default function Card( { product } ) {
    const navigate = useNavigate()

    const maxLength = 100
    const truncatedDescription = product.description.length > maxLength
        ? product.description.slice( 0, maxLength ) + '...'
        : product.description

    const showProduct = () => {
        navigate(`/produits/${product._id}`)
    }
    return (
        <div className="card" onClick={showProduct}>
            <img src={`http://localhost:8080/images/${product.picture}`} alt=" "/>
            <div className="card__container">
                <h1>{product.title}</h1>
                <p>{truncatedDescription}</p>
            </div>
        </div>
    )
}