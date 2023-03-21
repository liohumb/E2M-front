import { useState, useEffect } from 'react'
import { getAll, sortAll } from '../../utils'

import Side from '../../navigations/side/Side'
import Card from '../../components/card/Card'

import './products.scss'

export default function Posts() {
    const [products, setProducts] = useState([])
    const [showProduct, setShowProduct] = useState(true)
    const [search, setSearch] = useState('')
    const [searchResults, setSearchResults] = useState([]);

    useEffect( () => {
        getAll('product', setProducts)
    }, [])

    sortAll(products)

    const handleProduct = () => {
        setShowProduct(true)
    }

    return (
        <section className="products section">
            <div className="products__container section__container">
                <div className="products__container-right section__container-left">
                    <Side product={showProduct} clickProducts={handleProduct} setSearchResults={setSearchResults} search={search}
                          setSearch={setSearch}/>
                </div>
                <div className="products__container-right section__container-right">
                    {searchResults.length === 0 && search.length > 0 ?
                        <div className="products__result"></div>
                        :
                        search.length === 0 ?
                            <ul className="products__contents section__contents">
                                {products.map((product) => (
                                    <Card data={product}/>
                                ))}
                            </ul>
                            :
                            <div className="products__result section__result">
                                {searchResults.users.length > 0 &&
                                    <>
                                        <h1 className="products__result-title section__result-title">Les Artisans</h1>
                                        <ul className="products__contents section__contents">
                                            {searchResults.users.map( ( data ) => (
                                                <Card key={data._id} data={data}/>
                                            ) )}
                                        </ul>
                                    </>
                                }
                                {searchResults.posts.length > 0 &&
                                    <>
                                        <h1 className="products__result-title section__result-title">Les Posts</h1>
                                        <ul className="products__contents section__contents">
                                            {searchResults.posts.map( ( data ) => (
                                                <Card key={data._id} data={data}/>
                                            ) )}
                                        </ul>
                                    </>
                                }
                                {searchResults.products.length > 0 &&
                                    <>
                                        <h1 className="products__result-title section__result-title">Les Produits</h1>
                                        <ul className="products__contents section__contents">
                                            {searchResults.products.map( ( data ) => (
                                                <Card key={data._id} data={data}/>
                                            ) )}
                                        </ul>
                                    </>
                                }
                            </div>
                    }
                </div>
            </div>
        </section>
    )
}