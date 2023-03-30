import { useState, useEffect, useContext, useRef } from 'react'
import { Context } from '../../context/Context'
import { io } from 'socket.io-client'
import { getData, postData } from '../../utils'

import Side from '../../navigations/side/Side'
import Conversation from '../../components/conversation/Conversation'
import Message from '../../components/message/Message'
import Search from '../../components/search/Search'

import './chat.scss'

export default function Chat() {
    const { user } = useContext( Context )
    const scrollRef = useRef()
    const socket = useRef()

    const [search, setSearch] = useState( '' )
    const [searchResults, setSearchResults] = useState( [] )
    const [conversations, setConversations] = useState( [] )
    const [currentChat, setCurrentChat] = useState( null )
    const [messages, setMessages] = useState( [] )
    const [newMessage, setNewMessage] = useState( '' )
    const [arrivalMessage, setArrivalMessage] = useState( null )

    useEffect( () => {
        socket.current = io( 'ws://localhost:8900' )
        socket.current.on( 'getMessage', ( data ) => {
            setArrivalMessage( {
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now()
            } )
        } )
    }, [] )

    useEffect( () => {
        arrivalMessage &&
        currentChat?.users.includes( arrivalMessage.sender ) &&
        setMessages( ( prev ) => [...prev, arrivalMessage] )
    }, [arrivalMessage, currentChat] )

    useEffect( () => {
        socket.current.emit( 'addUser', user._id )
        socket.current.on( 'getUsers', ( users ) => {
            console.log(users)
        } )
    }, [user] )

    useEffect( () => {
        getData('chat', user._id, setConversations)
    }, [user._id] )

    useEffect( () => {
        getData( 'message', currentChat?._id, setMessages )
    }, [currentChat] )

    const handleSubmit = async ( e ) => {
        e.preventDefault()
        const message = {
            sender: user._id,
            text: newMessage,
            chatId: currentChat._id
        }

        const receiverId = currentChat.users.find(
            ( member ) => member !== user._id
        )

        socket.current.emit( 'sendMessage', {
            senderId: user._id,
            receiverId,
            text: newMessage
        } )

        try {
            const response = await postData( 'message', message )
            setMessages( [...messages, response.data] )
            setNewMessage( '' )
        } catch (e) {
        }
    }

    useEffect( () => {
        scrollRef.current?.scrollIntoView( { behavior: 'smooth' } )
    }, [messages] )

    return (
        <section className="chat section">
            <div className="chat__container section__container">
                <div className="chat__container-left section__container-left">
                    <Side setSearchResults={setSearchResults} search={search}
                          setSearch={setSearch}/>
                </div>
                <div className="chat__container-right section__container-right">
                    {searchResults && searchResults.length === 0 && search.length <= 0 &&
                    search.length === 0 ?
                        <div className="chat__contents">
                            <div className="chat__contents-left">
                                {currentChat ?
                                    <>
                                        <div className="chat__contents-content">
                                            {messages.map( ( message ) =>
                                                <div ref={scrollRef} key={message._id}>
                                                    <Message message={message}
                                                             own={message.sender === user._id}/>
                                                </div>
                                            )}
                                        </div>
                                        <form action="" className="chat__form" onSubmit={handleSubmit}>
                                                <textarea name="message" id="message" placeholder="Votre message…"
                                                          value={newMessage}
                                                          onChange={( e ) => setNewMessage( e.target.value )}/>
                                            <button type="submit">
                                                <i className="bx bx-message-add"/>
                                            </button>
                                        </form>
                                    </>
                                    :
                                    <h1 className="chat__title">Sélectionnez une conversation <span>👉</span></h1>
                                }
                            </div>
                            <div className="chat__contents-right">
                                {conversations.map( ( conversation ) =>
                                    <div key={conversation._id} onClick={() => setCurrentChat( conversation )}>
                                        <Conversation chat={conversation} currentUser={user}/>
                                    </div>
                                )}
                            </div>
                        </div>
                        :
                        <Search searchResults={searchResults}/>
                    }
                </div>
            </div>
        </section>
    )
}
