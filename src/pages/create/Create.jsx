import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Context } from '../../context/Context'
import Dropzone from 'react-dropzone'
import axios from 'axios'

import Side from '../../navigations/side/Side'

import './create.scss'

export default function Create() {
    const { user } = useContext( Context )
    const navigate = useNavigate()

    const [title, setTitle] = useState( '' )
    const [description, setDescription] = useState( '' )
    const [price, setPrice] = useState('')
    const [file, setFile] = useState( null )

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

        if (file) {
            const data = new FormData()
            const fileName = Date.now() + file.name

            data.append( 'name', fileName )
            data.append( 'file', file )

            newProduct.picture = fileName

            try {
                await axios.post( 'http://localhost:8080/upload', data )
            } catch (e) {
                console.log( e )
            }
        }

        try {
            await axios.post('http://localhost:8080/product', newProduct)
            navigate(`/profil/${user._id}/produits`)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <section className="create section">
            <div className="create__container section__container">
                <div className="create__container-left section__container-left">
                    <form action="" className="form create__form" onSubmit={handleSubmit}>
                        <div className="form__content">
                            <Dropzone onDrop={onDrop}>
                                {({getRootProps, getInputProps}) => (
                                    <div {...getRootProps()} className="form__content-image">
                                        <input {...getInputProps()}/>
                                        {file ? (
                                            <p>{file.name}</p>
                                        ) : (
                                            <p>Ajouter une image ici</p>
                                        )}
                                    </div>
                                )}
                            </Dropzone>
                        </div>
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
                <div className="create__container-right section__container-right">
                    <Side name={user.firstname + ' ' + user.lastname} society={user.society}/>
                </div>
            </div>
        </section>
    )
}