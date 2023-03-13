import post from '../../assets/images/posts/post1.jpg'
import './modal.scss'

const comments = [
    {
        id: 1,
        text: 'Lorem ipsum dolor sit amet',
        author: 'John Doe'
    },
    {
        id: 2,
        text: 'Lorem dolor',
        author: 'Jane Doe'
    }
]

export default function Modal({close}) {
    return (
        <div className="modal">
            <div className="modal__background" onClick={close}></div>
            <div className="modal__container">
                <i className="bx bx-x modal__container-close" onClick={close}/>
                <div className="modal__content">
                    <img src={post} alt=" "/>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad architecto aspernatur aut beatae
                        consectetur earum et ipsum iusto, nisi nobis odit pariatur tenetur unde vero, vitae. Labore mollitia
                        necessitatibus voluptas.</p>
                </div>
                <div className="modal__interaction">
                    <i className="bx bx-heart"/>
                    <i className="bx bx-message"/>
                    <i className="bx bx-upload"/>
                </div>
                <div className="modal__comments" >
                    {comments.map( ( comment ) =>
                        <div key={comment.id} className="modal__comments-comment">
                            <p>{comment.text}</p>
                            <span>{comment.author}</span>
                        </div>
                    )}
                    {comments.map( ( comment ) =>
                        <div key={comment.id} className="modal__comments-comment">
                            <p>{comment.text}</p>
                            <span>{comment.author}</span>
                        </div>
                    )}
                    {comments.map( ( comment ) =>
                        <div key={comment.id} className="modal__comments-comment">
                            <p>{comment.text}</p>
                            <span>{comment.author}</span>
                        </div>
                    )}
                    {comments.map( ( comment ) =>
                        <div key={comment.id} className="modal__comments-comment">
                            <p>{comment.text}</p>
                            <span>{comment.author}</span>
                        </div>
                    )}
                    <form action="" className="modal__comments-form">
                        <textarea name="text" id="text" placeholder="Ajouter un commentaire"></textarea>
                        <button type="submit">
                            <i className="bx bx-message-add"/>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}