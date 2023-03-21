import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Context } from '../../context/Context'
import { getData, getPreview } from '../../utils'
import Dropzone from 'react-dropzone'
import axios from 'axios'

import Side from '../../navigations/side/Side'

import './create.scss'

export default function Create({post, product}) {
    const { user } = useContext( Context )
    const id = useParams().id
    const navigate = useNavigate()

    const [artisan, setArtisan] = useState( [] )
    const [title, setTitle] = useState( '' )
    const [description, setDescription] = useState( '' )
    const [price, setPrice] = useState('')
    const [file, setFile] = useState( null )

    useEffect( () => {
        getData( 'user', id, setArtisan )
    }, [id] )

    const onDrop = ( acceptedFiles ) => {
        if (acceptedFiles.length > 0) {
            setFile(acceptedFiles[0])
        }
    }

    const handleSubmit = async ( e ) => {
        e.preventDefault()

        const newProduct = {
            title, picture: file, description, price, artisan: user._id
        }
        
        const newPost = {
            picture: file, description, artisan: user._id
        }

        if (file) {
            const data = new FormData()
            const fileName = Date.now() + file.name

            data.append( 'name', fileName )
            data.append( 'file', file )

            post ? newPost.picture = fileName :newProduct.picture = fileName

            try {
                await axios.post( 'http://localhost:8080/upload', data )
            } catch (e) {}
        }
        if (post) {
            try {
                await axios.post( 'http://localhost:8080/post', newPost )
                navigate(`/artisan/${user._id}`)
            } catch (e) {
                console.log( e )
            }
        } else if (product) {
            try {
                await axios.post('http://localhost:8080/product', newProduct)
                navigate(`/artisan/${user._id}`)
            } catch (e) {
                console.log(e)
            }
        }
    }

    return (
        <section className="create section">
            <div className="create__container section__container">
                <div className="create__container-left section__container-left">
                    <Side artisan={artisan}/>
                </div>
                <div className="create__container-right section__container-right">
                    <form action="" className="form create__form" onSubmit={handleSubmit}>
                        <div className="form__content">
                            <Dropzone onDrop={onDrop}>
                                {({getRootProps, getInputProps}) => (
                                    <div {...getRootProps()} className="form__content-image">
                                        <input {...getInputProps()}/>
                                        {file ? (
                                            <p>{getPreview(25, file.name)}</p>
                                        ) : (
                                            <p>Ajouter une image ici <span>👈</span></p>
                                        )}
                                    </div>
                                )}
                            </Dropzone>
                        </div>
                        {product &&
                            <div className="form__contents">
                                <div className="form__content">
                                    <label htmlFor="title"></label>
                                    <input type="text" name="title" id="title"
                                           placeholder="Le titre de votre produit"
                                           value={title} onChange={( e ) => setTitle(e.target.value)}/>
                                </div>
                                <div className="form__content">
                                    <label htmlFor="price"></label>
                                    <input type="number" name="price" id="price"
                                           placeholder="À partir de… €"
                                           value={price} onChange={( e ) => setPrice(e.target.value)}/>
                                </div>
                            </div>
                        }
                        <div className="form__content">
                            <label htmlFor="description"></label>
                            <textarea name="description" id="description"
                                      value={description} placeholder="La description de votre produit"
                                      onChange={( e ) => setDescription(e.target.value)}></textarea>
                        </div>
                        <div className="form__content">
                            <button type="submit">Ajouter</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}