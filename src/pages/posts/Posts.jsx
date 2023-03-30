import { useState, useEffect } from 'react'
import { getAll, sortAll } from '../../utils'

import Side from '../../navigations/side/Side'
import Card from '../../components/card/Card'
import Search from '../../components/search/Search'

import './posts.scss'

export default function Posts() {
    const [posts, setPosts] = useState([])
    const [showPost, setShowPost] = useState(true)
    const [search, setSearch] = useState('')
    const [searchResults, setSearchResults] = useState([]);

    useEffect( () => {
        getAll('post', setPosts)
    }, [])

    sortAll(posts)

    const handlePost = () => {
        setShowPost(true)
    }

    return (
        <section className="posts section">
            <div className="posts__container section__container">
                <div className="posts__container-right section__container-left">
                    <Side post={showPost} clickPosts={handlePost} setSearchResults={setSearchResults} search={search} setSearch={setSearch} />
                </div>
                <div className="posts__container-right section__container-right">
                    {searchResults && searchResults.length === 0 && search.length <= 0 &&
                    search.length === 0 ?
                        <ul className="posts__contents section__contents">
                            {posts.reverse().map( ( data ) => (
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