import { useState, useEffect } from 'react'
import { getAll, sortAll } from '../../utils'

import Side from '../../navigations/side/Side'
import Card from '../../components/card/Card'

import './artisans.scss'

export default function Artisans() {

    const [users, setUsers] = useState( [] )
    const [showArtisans, setShowArtisans] = useState( true )
    const [search, setSearch] = useState( '' )
    const [searchResults, setSearchResults] = useState( [] )

    useEffect( () => {
        getAll( 'user', setUsers )
    }, [] )

    sortAll( users )

    const handleArtisan = () => {
        setShowArtisans( true )
    }

    const artisans = users.filter( user => user.role === 'ARTISAN' )

    return (
        <section className="products section">
            <div className="products__container section__container">
                <div className="products__container-right section__container-left">
                    <Side artisans={showArtisans} clickProduct={handleArtisan} setSearchResults={setSearchResults} search={search} setSearch={setSearch} />
                </div>
                <div className="products__container-right section__container-right">
                    {searchResults.length === 0 && search.length > 0 ?
                        <div className="home__result"></div>
                        :
                        search.length === 0 ?
                            <ul className="products__contents section__contents">
                                {artisans.map( ( artisan ) => (
                                    <Card data={artisan}/>
                                ) )}
                            </ul>
                            :
                            <div className="home__result section__result">
                                {searchResults.users.length > 0  &&
                                    <>
                                        <h1 className="home__result-title section__result-title">Les Artisans</h1>
                                        <ul className="home__contents section__contents">
                                            {searchResults.users.map((data) => (
                                                <Card key={data._id} data={data} />
                                            ))}
                                        </ul>
                                    </>
                                }
                                {searchResults.posts.length > 0 &&
                                    <>
                                        <h1 className="home__result-title section__result-title">Les Posts</h1>
                                        <ul className="home__contents section__contents">
                                            {searchResults.posts.map((data) => (
                                                <Card key={data._id} data={data} />
                                            ))}
                                        </ul>
                                    </>
                                }
                                {searchResults.products.length > 0  &&
                                    <>
                                        <h1 className="home__result-title section__result-title">Les Produits</h1>
                                        <ul className="home__contents section__contents">
                                            {searchResults.products.map((data) => (
                                                <Card key={data._id} data={data} />
                                            ))}
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