import { useEffect, useContext } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { Context } from './context/Context'

import Header from './navigations/header/Header'
import Login from './authentification/login/Login'
import Register from './authentification/register/Register'
import Home from './pages/home/Home'

import './assets/styles/style.scss'

export default function App() {
    const { user } = useContext( Context )
    const { pathname, hash, key } = useLocation()

    useEffect( () => {
        if (hash === '') {
            window.scrollTo( 0, 0 )
        } else {
            setTimeout( () => {
                const id = hash.replace( '#', '' )
                const elem = document.getElementById( id )

                if (elem) {
                    elem.scrollIntoView()
                }
            }, 0 )
        }
    }, [pathname, hash, key] )

    return (
        <>
            <Header/>
            <Routes>
                <Route path="/inscription/:token" element={<Register/>}/>
                <Route path="/connexion" element={user ? <Navigate to="/"/> : <Login/>}/>
                <Route index path="/" element={<Home/>}/>
            </Routes>
        </>
    )
}
