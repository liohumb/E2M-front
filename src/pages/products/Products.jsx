import { useState, useEffect } from 'react'
import { getAll, sortAll } from '../../utils'

import Side from '../../navigations/side/Side'
import Card from '../../components/card/Card'
import Search from '../../components/search/Search'

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
                    <Side product={showProduct} clickProducts={handleProduct}
                          setSearchResults={setSearchResults} search={search}
                          setSearch={setSearch}/>
                </div>
                <div className="products__container-right section__container-right">
                    {searchResults && searchResults.length === 0 && search.length <= 0 &&
                    search.length === 0 ?
                        <ul className="products__contents section__contents">
                            {products.reverse().map( ( data ) => (
                                <Card key={data._id} data={data}/>
                            ) )}
                        </ul>
                        :
                        <Search searchResults={searchResults}/>
                    }
                </div>
            </div>
        </section>
    )
}