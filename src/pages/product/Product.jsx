import { useContext, useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Context } from '../../context/Context'
import axios from 'axios'

import './product.scss'

export default function Product() {
    const {user} = useContext(Context)
    const id = useParams().id
    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [picture, setPicture] = useState('')
    const [artisanId, setArtisanId] = useState('')
    const [artisan, setArtisan] = useState('')
    const [update, setUpdate] = useState(false)

    const handleGoBack = () => {
        navigate(-1)
    }

    useEffect( () => {
        const getProduct = async () => {
            const response = await axios.get(`http://localhost:8080/product/${id}`)
            setTitle(response.data.title)
            setDescription(response.data.description)
            setPrice(response.data.price)
            setPicture(response.data.picture)
            setArtisanId(response.data.artisan)
        }

        getProduct()
    }, [id])

    useEffect( () => {
        const getArtisan = async () => {
            const response = await axios.get(`http://localhost:8080/user/${artisanId}`)
            setArtisan(response.data)
        }
        getArtisan()
    }, [artisanId])

    const handleUpdate = async () => {
        try {
            await axios.put(`http://localhost:8080/product/${id}`,
                {title, description, price, artisan: user._id})
            setUpdate(false)
        } catch (e) {
            console.log(e)
        }
    }

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8080/product/${id}`,
                {data: { artisan: user._id }})
            navigate(-1)
        } catch (e) {
            console.log(e)
        }
    }

    const formattedPrice = parseFloat(price).toFixed(2)
                                            .replace('.', ' € ')
                                            .replace(',', '')

    return (
        <section className="product section">
            <div className="product__header">
                <span onClick={handleGoBack}>
                    <i className='bx bxs-chevrons-left'></i>
                    retour
                </span>
                {artisanId === user._id &&
                    <div className="product__header-edit">
                        {update ?
                            <span className="product__header-edit--validate" onClick={handleUpdate}>
                                <i className="bx bx-check"/>
                                Valider
                            </span>
                        :
                            <>
                                <span className="product__header-edit--edit" onClick={() => setUpdate(true)}>
                                    <i className="bx bxs-edit-alt"/>
                                    Modifier
                                </span>
                                        <span className="product__header-edit--delete" onClick={handleDelete}>
                                    <i className="bx bxs-trash"/>
                                    Supprimer
                                </span>
                            </>
                        }
                    </div>
                }
            </div>
            <div className="product__container">
              <div className="product__container-left">
                  <img src={`http://localhost:8080/images/${picture}`} alt=" "/>
              </div>
              <div className="product__container-right">
                  <div className="product__infos">
                      <span className="product__infos-artisan">{artisan.firstname + ' ' + artisan.lastname} <span>vous présente :</span></span>
                      {update ?
                          <input type="text" name="title" id="title"
                                 className="product__infos-title" value={title}
                                 onChange={( e ) => setTitle(e.target.value)}/>
                      :
                          <h1 className="product__infos-title">{title}</h1>
                      }
                      {update ?
                          <span className="product__infos-price">
                              <span>À partir de </span>
                              <input type="number" name="price" id="price"
                                     value={price}
                                     onChange={( e ) => setPrice(e.target.value)}/>
                          </span>
                      :
                          <span className="product__infos-price">
                              <span>À partir de </span>
                              {formattedPrice}
                          </span>
                      }
                      {update ?
                          <textarea name="description" id="description"
                                    className="product__infos-description"
                                    value={description}
                                    onChange={( e ) => setDescription(e.target.value)}>
                              {description}
                          </textarea>
                      :
                          <p className="product__infos-description">{description}</p>
                      }
                  </div>
              </div>
            </div>
        </section>
    )
}