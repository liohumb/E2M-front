import { useState, useEffect } from 'react'
import { getAll, sortAll } from '../../utils'

import Side from '../../navigations/side/Side'
import Card from '../../components/card/Card'

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
                    {searchResults.length === 0 && search.length > 0 ?
                        <div className="posts__result"></div>
                        :
                        search.length === 0 ?
                            <ul className="posts__contents section__contents">
                                {posts.map((post) => (
                                    <Card data={post}/>
                                ))}
                            </ul>
                            :
                            <div className="posts__result section__result">
                                {searchResults.users.length > 0  &&
                                    <>
                                        <h1 className="posts__result-title section__result-title">Les Artisans</h1>
                                        <ul className="posts__contents section__contents">
                                            {searchResults.users.map((data) => (
                                                <Card key={data._id} data={data} />
                                            ))}
                                        </ul>
                                    </>
                                }
                                {searchResults.posts.length > 0 &&
                                    <>
                                        <h1 className="posts__result-title section__result-title">Les Posts</h1>
                                        <ul className="posts__contents section__contents">
                                            {searchResults.posts.map((data) => (
                                                <Card key={data._id} data={data} />
                                            ))}
                                        </ul>
                                    </>
                                }
                                {searchResults.products.length > 0  &&
                                    <>
                                        <h1 className="posts__result-title section__result-title">Les Produits</h1>
                                        <ul className="posts__contents section__contents">
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