import { useState, useEffect, useContext } from 'react'
import { Context } from '../../context/Context'
import axios from 'axios'

import Artisan from '../../components/artisan/Artisan'
import Add from '../../components/add/Add'
import Post from '../../components/post/Post'
import Sponsor from '../../components/sponsor/Sponsor'
import Suggest from '../../components/suggest/Suggest'

import './home.scss'

export default function Home() {
    const { user } = useContext( Context )
    const [posts, setPosts] = useState( [] )

    useEffect( () => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get( `http://localhost:8080/post` )
                setPosts( response.data )
            } catch (e) {
                console.error( e )
            }
        }

        fetchPosts()
    }, [] )

    return (
        <section className="home section">
            <div className={user && user.role === 'ARTISAN' ? 'home__container' : 'home__container-alt'}>
                <div className="home__container-left">
                    {user && user.role === 'ARTISAN' &&
                        <Artisan/>
                    }
                </div>
                {/* eslint-disable-next-line no-mixed-operators */}
                <div className={`home__container-middle ${user === null || user.role !== 'ARTISAN' ? 'home__container-middle--alt' : ''}`}>
                    {user && user.role === 'ARTISAN'  && <Add/>}
                    {posts.reverse().map( ( post ) => (
                        <Post key={post._id} post={post}/>
                    ) )}
                </div>
                <div className="home__container-right">
                    <Sponsor/>
                    <Suggest/>
                </div>
            </div>
        </section>
    )
}
