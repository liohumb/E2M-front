import { useState, useEffect, useMemo } from 'react'
import { getAll } from '../../utils'

import Side from '../../navigations/side/Side'
import Card from '../../components/card/Card'

import './home.scss'
import Search from '../../components/search/Search'

export default function Home() {
    const [posts, setPosts] = useState( [] )
    const [products, setProducts] = useState( [] )
    const [showHome, setShowHome] = useState( true )
    const [search, setSearch] = useState( '' )
    const [searchResults, setSearchResults] = useState( [] )

    useEffect( () => {
        getAll( 'post', setPosts )
        getAll( 'product', setProducts )
    }, [] )

    const datas = useMemo( () => {
        const allData = posts.concat( products )
        allData.sort( ( a, b ) => a.created_at - b.created_at )
        return allData
    }, [posts, products] )

    const handleHome = () => {
        setShowHome( true )
    }

    return (
        <section className="home section">
            <div className="home__container section__container">
                <div className="home__container-left section__container-left">
                    <Side home={showHome} clickHome={handleHome} setSearchResults={setSearchResults} search={search}
                          setSearch={setSearch}/>
                </div>
                <div className="home__container-right section__container-right">
                    {searchResults && searchResults.length === 0 && search.length <= 0 &&
                        search.length === 0 ?
                            <ul className="home__contents section__contents">
                                {datas.filter(data => data.sponsor === true).reverse().map( ( data ) => (
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
