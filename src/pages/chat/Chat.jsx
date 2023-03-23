import { useState, useEffect, useContext, useRef } from 'react'
import { Context } from '../../context/Context'
import axios from 'axios'
import { io } from 'socket.io-client'

import Side from '../../navigations/side/Side'
import Card from '../../components/card/Card'
import Conversation from '../../components/conversation/Conversation'
import Message from '../../components/message/Message'

import './chat.scss'
import { getData } from '../../utils'

export default function Chat() {
    const { user } = useContext( Context )
    const scrollRef = useRef()
    const socket = useRef()

    const [search, setSearch] = useState( '' )
    const [searchResults, setSearchResults] = useState( [] )
    const [chats, setChats] = useState( [] )
    const [chat, setChat] = useState( null )
    const [messages, setMessages] = useState( [] )
    const [newMessage, setNewMessage] = useState( '' )
    const [arrivalMessage, setArrivalMessage] = useState( null )

    useEffect( () => {
        socket.current = io( 'ws://localhost:8888' )
        socket.current.on( 'getMessage', ( data ) => {
            setArrivalMessage( {
                sender: data.senderId,
                message: data.message,
                createdAt: Date.now()
            } )
        } )
    }, [] )

    useEffect( () => {
        arrivalMessage &&
        chat?.users.includes( arrivalMessage.sender ) &&
        setMessages( ( prev ) => [...prev, arrivalMessage] )
    }, [arrivalMessage, chat] )

    useEffect( () => {
        socket.current.emit( 'addUser', user._id )
        socket.current.on( 'getUsers', users => {
            console.log( users )
        } )
    }, [user] )

    useEffect( () => {
        const getChat = async () => {
            try {
                const response = await axios.get( `http://localhost:8080/chat/${user._id}` )
                setChats( response.data )
            } catch (e) {
            }
        }
        getChat()
    }, [user._id] )

    useEffect( () => {
        if (chat) {
            getData( 'message', chat._id, setMessages )
        }
    }, [chat] )

    const handleSubmit = async ( e ) => {
        e.preventDefault()

        const message = {
            user: user._id,
            message: newMessage,
            chat: chat._id
        }

        const receiverId = chat.users.find(
            ( user ) => user !== user._id
        )

        socket.current.emit( 'sendMessage', {
            senderId: user._id,
            receiverId,
            message: newMessage
        } )

        try {
            const response = await axios.post( `http://localhost:8080/message`, message )
            setMessages( [...messages, response.data] )
            setNewMessage( '' )
            if (chat) {
                await getData( 'message', chat._id, setMessages )
            }
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
                    {searchResults.length === 0 && search.length > 0 ?
                        <div className="chat__result"></div>
                        :
                        search.length === 0 ?
                            <div className="chat__contents">
                                <div className="chat__contents-left">
                                    {chat ?
                                        <>
                                            <div className="chat__contents-content">
                                                {messages.map( ( message ) =>
                                                    <div ref={scrollRef} key={message._id}>
                                                        <Message message={message}
                                                                 you={message.user === user._id}/>
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
                                        <h1 className="chat__title">Sélectionnez un message <span>👉</span></h1>
                                    }
                                </div>
                                <div className="chat__contents-right">
                                    {chats.map( ( chat ) =>
                                        <div key={chat._id} onClick={() => setChat( chat )}>
                                            <Conversation chat={chat} you={user}/>
                                        </div>
                                    )}
                                </div>
                            </div>
                            :
                            <div className="chat__result section__result">
                                {searchResults.users.length > 0 &&
                                    <>
                                        <h1 className="chat__result-title section__result-title">Les Artisans</h1>
                                        <ul className="chat__contents section__contents">
                                            {searchResults.users.map( ( data ) => (
                                                <Card key={data._id} data={data}/>
                                            ) )}
                                        </ul>
                                    </>
                                }
                            </div>
                    }
                </div>
            </div>
        </section>
    )
}
