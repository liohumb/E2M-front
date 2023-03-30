import { useState, useEffect } from 'react'
import { getAll, sortAll } from '../../utils'

import Side from '../../navigations/side/Side'
import Card from '../../components/card/Card'

import './artisans.scss'
import Search from '../../components/search/Search'

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
                    {searchResults && searchResults.length === 0 && search.length <= 0 &&
                    search.length === 0 ?
                        <ul className="artisans section__contents">
                            {artisans.reverse().map( ( data ) => (
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