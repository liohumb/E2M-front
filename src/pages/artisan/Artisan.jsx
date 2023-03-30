import { useState, useEffect, useMemo, useContext } from 'react'
import { useParams } from 'react-router-dom'
import Dropzone from 'react-dropzone'
import { getAll, getData } from '../../utils'
import { Context } from '../../context/Context'

import Side from '../../navigations/side/Side'
import Card from '../../components/card/Card'

import './artisan.scss'
import axios from 'axios'

export default function Artisan() {
    const {user} = useContext(Context)
    const id = useParams().id
    const [artisan, setArtisan] = useState( [] )
    const [file, setFile] = useState( null )
    const [posts, setPosts] = useState([])
    const [products, setProducts] = useState([])
    const [showAbout, setShowAbout] = useState( true )
    const [showPost, setShowPost] = useState( false )
    const [showProduct, setShowProduct] = useState( false )

    useEffect( () => {
        getData( 'user', id, setArtisan )
        getAll('post', setPosts)
        getAll('product', setProducts)
    }, [id])

    const datas = useMemo(() => {
        const allData = posts.filter(post => post.artisan === id).concat(products.filter(post => post.artisan === id))
        allData.sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
        return allData
    }, [id, posts, products])

    const handleDrop = async ( acceptedFiles ) => {
        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0]
            const data = new FormData()
            const fileName = Date.now() + file.name
            data.append( 'name', fileName )
            data.append( 'file', file )

            await axios.post( `http://localhost:8080/upload`, data )

            const updateArtisan = { picture: fileName, userId: user._id }
            await axios.put( `http://localhost:8080/user/${id}`, updateArtisan )

            const imageUrl = `http://localhost:8080/images/${fileName}`
            setFile( imageUrl )
            window.location.reload()
        }
    }

    const handleAbout = () => {
        setShowAbout( true )
        setShowPost( false )
        setShowProduct( false )
    }

    const handlePost = () => {
        setShowAbout( false )
        setShowPost( true )
        setShowProduct( false )
    }

    const handleProduct = () => {
        setShowAbout( false )
        setShowPost( false )
        setShowProduct( true )
    }

    return (
        <section className="artisan section">
            <div className="artisan__container section__container">
                <div className="artisan__container-left section__container-left">
                    <Side artisan={artisan} about={showAbout} post={showPost} product={showProduct}
                          clickAbout={handleAbout} clickPosts={handlePost} clickProducts={handleProduct}/>
                </div>
                <div className="artisan__container-right section__container-right">
                    {showAbout &&
                        <>
                            <div className="artisan__infos">
                                {artisan.picture === '' ?
                                    <Dropzone onDrop={handleDrop}>
                                        {( { getRootProps, getInputProps } ) => (
                                            <div {...getRootProps()} className="artisan__infos-drop">
                                                <input {...getInputProps()}/>
                                                <p>Ajouter une image ici <span>👈</span></p>
                                            </div>
                                        )}
                                    </Dropzone>
                                    :
                                    <img
                                        src={file ? file : artisan.picture && `http://localhost:8080/images/${artisan.picture}`}
                                        alt=""
                                        className="artisan__infos-picture"
                                    />
                                }
                                <h5 className="artisan__infos-title">
                                    <span>À propos de </span>
                                    {artisan.firstname + ' ' + artisan.lastname}
                                </h5>
                                <p className="artisan__infos-description">{artisan.description}</p>
                            </div>
                            <ul className="artisan__contents section__contents">
                                {datas.map((data) => (
                                    <Card key={data._id} data={data}/>
                                ))}
                            </ul>
                        </>
                    }
                    {showPost &&
                        <ul className="artisan__contents section__contents">
                            {posts.map((post) => (
                                <Card data={post}/>
                            ))}
                        </ul>
                    }
                    {showProduct &&
                        <ul className="artisan__contents section__contents">
                            {products.map((product) => (
                                <Card key={product._id} data={product}/>
                            ))}
                        </ul>
                    }
                </div>
            </div>
        </section>
    )
}