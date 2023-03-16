import { useState, useContext } from 'react'
import { Context } from '../../context/Context'
import Dropzone from 'react-dropzone'
import axios from 'axios'

import './add.scss'

export default function Add() {
    const { user } = useContext( Context )

    const [content, setContent] = useState( '' )
    const [file, setFile] = useState( null )

    const handleTextChange = ( e ) => {
        setContent( e.target.value )
    }

    const onDrop = ( acceptedFiles ) => {
        if (acceptedFiles.length > 0) {
            setFile( acceptedFiles[0] )
        }
    }

    const handleSubmit = async ( e ) => {
        e.preventDefault()

        const newPost = {
            author: user._id,
            content: content,
            picture: file
        }

        if (file) {
            const data = new FormData()
            const fileName = Date.now() + file.name

            data.append( 'name', fileName )
            data.append( 'file', file )

            newPost.picture = fileName

            try {
                await axios.post( 'http://localhost:8080/upload', data )
            } catch (e) {
                console.log( e )
            }
        }

        try {
            await axios.post( 'http://localhost:8080/post', newPost )

        } catch (e) {
            console.log( e )
        }
    }

    return (
        <div className="add block">
            <form action="" className="add__form" onSubmit={handleSubmit}>
                <div className="add__form-text">
                    <img src={`http://localhost:8080/images/${user.picture}`}
                         alt={user.firstname + ' ' + user.lastname}/>
                    <textarea
                        name="content"
                        id="content"
                        placeholder="Dites nous tout…"
                        value={content}
                        onChange={handleTextChange}
                    ></textarea>
                </div>
                <div className="add__form-image">
                    <Dropzone onDrop={onDrop}>
                        {( { getRootProps, getInputProps } ) => (
                            <div {...getRootProps()} className="add__form-image--input">
                                <input {...getInputProps()} />
                                {file ? (
                                    <p>{file.name}</p>
                                ) : (
                                    <p>Ajouter une image ici</p>
                                )}
                            </div>
                        )}
                    </Dropzone>
                    <button type="submit">Publier</button>
                </div>
            </form>
        </div>
    )
}
