import Dropzone from 'react-dropzone'
import profil from '../../assets/images/user/profil.png'
import './add.scss'

export default function Add() {
    return (
        <div className="add block">
            <form action="" className="add__form">
                <div className="add__form-text">
                    <img src={profil} alt=" "/>
                    <textarea name="content" id="content" placeholder="Dites nous tout…"></textarea>
                </div>
                <div className="add__form-image">
                    <Dropzone onDrop={acceptedFiles => console.log( acceptedFiles )}>
                        {( { getRootProps, getInputProps } ) => (
                            <div {...getRootProps()} className="add__form-image--input">
                                <input {...getInputProps()} />
                                <p>Ajouter une image ici</p>
                            </div>
                        )}
                    </Dropzone>

                    <button type="submit">Publier</button>
                </div>
            </form>
        </div>
    )
}