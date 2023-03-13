import { useState, useEffect } from 'react'
import './comments.scss'

export default function Comments( { comments } ) {
    const [currentCommentIndex, setCurrentCommentIndex] = useState( 0 )

    useEffect( () => {
        const interval = setInterval( () => {
            setCurrentCommentIndex( (currentCommentIndex + 1) % comments.length )
        }, 5000 )
        return () => clearInterval( interval )
    }, [currentCommentIndex, comments.length] )

    return (
        <div className="comments">
            {comments.length > 1 &&
                <button onClick={() =>
                    setCurrentCommentIndex(
                        currentCommentIndex === 0
                            ? comments.length - 1
                            : currentCommentIndex - 1 )}>
                    <i className="bx bx-chevron-left"/>
                </button>
            }
            <div className="comments__comment">
                <p>{comments[currentCommentIndex].text}</p>
                <span>{comments[currentCommentIndex].author}</span>
            </div>
            {comments.length > 1 &&
                <button onClick={() =>
                    setCurrentCommentIndex(
                        currentCommentIndex === comments.length - 1
                            ? 0
                            : currentCommentIndex + 1 )}>
                    <i className="bx bx-chevron-right"/>
                </button>
            }
        </div>
    )
}
