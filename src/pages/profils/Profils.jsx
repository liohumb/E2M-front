import { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { Context } from '../../context/Context'

import Side from '../../navigations/side/Side'
import Pictures from '../../components/pictures/Pictures'
import Post from '../../components/post/Post'
import Card from '../../components/card/Card'

import './profils.scss'

export default function Profils() {
    const { user } = useContext( Context )
    const id = useParams().id

    const [firstname, setFirstname] = useState( '' )
    const [lastname, setLastname] = useState( '' )
    const [society, setSociety] = useState( '' )
    const [postcode, setPostcode] = useState( '' )
    const [city, setCity] = useState( '' )
    const [activity, setActivity] = useState( '' )
    const [description, setDescription] = useState( '' )
    const [socials, setSocials] = useState( [] )
    const [posts, setPosts] = useState( [] )
    const [products, setProducts] = useState([])
    const [showIcons, setShowIcons] = useState( false )
    const [btnPost, setBtnPost] = useState(true)
    const [btnProduct, setBtnProduct] = useState(false)

    // const {firstHalf: firstPosts, secondHalf: secondPosts} = split(posts)
    // const {firstHalf: firstProducts, secondHalf: secondProducts} = split(products)

    useEffect( () => {
        const getInfo = async () => {
            const response = await axios.get( `http://localhost:8080/user/${id}` )
            setFirstname( response.data.firstname )
            setLastname( response.data.lastname )
            setSociety( response.data.society )
            setPostcode( response.data.postcode )
            setCity( response.data.city )
            setActivity( response.data.activity )
            setDescription( response.data.description )
        }
        getInfo()
    }, [id] )

    useEffect( () => {
        const getSocials = async () => {
            try {
                const response = await axios.get( 'http://localhost:8080/social', {
                    params: {
                        user: id
                    }
                } )
                setSocials( response.data )
            } catch (e) {
                console.error( e )
            }
        }
        getSocials()
    }, [id] )

    useEffect( () => {
        const getPosts = async () => {
            try {
                const response = await axios.get( `http://localhost:8080/post` )
                const postUser = response.data.filter(post => post.author === id)
                setPosts( postUser )
            } catch (e) {
                console.error( e )
            }
        }

        getPosts()
    }, [id] )

    useEffect( () => {
        const getProducts = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/product`)
                const productUser = response.data.filter(product => product.artisan === id)
                setProducts(productUser)
            } catch (e) {
                console.log(e)
            }
        }
        getProducts()
    }, [id])

    const handleIcons = () => {
        if (showIcons) {
            setShowIcons( false )
        } else {
            setShowIcons( true )
        }
    }

    const handlePosts = () => {
        setBtnPost(true)
        setBtnProduct(false)
    }

    const handleProducts = () => {
        setBtnProduct(true)
        setBtnPost(false)
    }

    return (
        <section className="profils section">
            <div className="profils__container section__container">
                <div className="profils__container-left section__container-left">
                    {user && user.role === 'ARTISAN' &&
                        <div className="profils__details">
                            <div className="profils__details-localisation">
                                <i className="bx bx-map"/>
                                <span>{postcode + ' | ' + city}</span>
                            </div>
                            <div className="profils__details-job">
                                <span>{activity}</span>
                                <i className="bx bx-briefcase"/>
                            </div>
                        </div>}
                    <Pictures/>
                    <div className="profils__dots">
                        <i className={`bx ${showIcons ? 'bx-x' : 'bx-dots-horizontal-rounded'}`} onClick={handleIcons}/>
                        <div className={`profils__dots-modal ${showIcons && 'profils__dots-modal--active'}`}>
                            {socials.map( ( social ) => (
                                <Link key={social._id} to={social.url} target="_blank">
                                    {social.name === 'Site internet' ?
                                        <i className="bx bx-code-block"></i>
                                        :
                                        <i className={`bx bxl-${(social.name).toLowerCase()}`}/>
                                    }
                                </Link>
                            ) )}
                            <i className="bx bxs-chat"/>
                            <i className="bx bx-at"/>
                        </div>
                    </div>
                    <div className="profils__infos">
                        <div className="profils__infos-left">
                            <div className="profils__infos-social">
                                {socials.map( ( social ) => (
                                    <Link key={social._id} to={social.url} target="_blank">
                                        {social.name === 'Site internet' ?
                                            <i className="bx bx-code-block"></i>
                                            :
                                            <i className={`bx bxl-${(social.name).toLowerCase()}`}/>
                                        }
                                    </Link>
                                ) )}
                            </div>
                        </div>
                        <div className="profils__infos-right">
                            <div className="profils__infos-contact">
                                <i className="bx bxs-chat"/>
                                <i className="bx bx-at"/>
                            </div>
                        </div>
                    </div>
                    <div className={`profils__contents ${showIcons && 'profils__contents-active'}`}>
                        <div className="profils__contents-category">
                            <span onClick={handlePosts}>Les posts</span>
                            <span onClick={handleProducts}>Les produits</span>
                        </div>
                        {/*{btnPost &&*/}
                        {/*    <div className="profils__contents-content">*/}
                        {/*        <div className="profils__contents-content--left">*/}
                        {/*            {firstPosts.reverse().map((post) => (*/}
                        {/*                <Post key={post._id} post={post} profil/>*/}
                        {/*            ))}*/}
                        {/*        </div>*/}
                        {/*        <div className="profils__contents-content--right">*/}
                        {/*            {secondPosts.reverse().map((post) => (*/}
                        {/*                <Post key={post._id} post={post} profil/>*/}
                        {/*            ))}*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*}*/}
                        {/*{btnProduct &&*/}
                        {/*    <div className="profils__contents-content">*/}
                        {/*        <div className="profils__contents-content--left">*/}
                        {/*            {firstProducts.reverse().map((product) => (*/}
                        {/*                <Card key={product._id} product={product} />*/}
                        {/*            ))}*/}
                        {/*        </div>*/}
                        {/*        <div className="profils__contents-content--right">*/}
                        {/*            {secondProducts.reverse().map((product) => (*/}
                        {/*                <Card key={product._id} product={product} />*/}
                        {/*            ))}*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*}*/}
                    </div>
                </div>
                <div className="profils__container-right section__container-right">
                    <Side name={firstname + ' ' + lastname} society={society} description={description}/>
                </div>
            </div>
        </section>
    )
}