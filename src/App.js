import { useEffect, useContext } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { Context } from './context/Context'

import Nav from './navigations/nav/Nav'
import Login from './authentification/login/Login'
import Register from './authentification/register/Register'
import Home from './pages/home/Home'
import Artisans from './pages/artisans/Artisans'
import Posts from './pages/posts/Posts'
import Products from './pages/products/Products'
import Artisan from './pages/artisan/Artisan'
import Chat from './pages/chat/Chat'
import Single from './pages/single/Single'
import Create from './pages/create/Create'
import Modification from './pages/modification/Modification'
import Password from './pages/password/Password'

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
            <Nav/>
            <Routes>
                <Route path="/inscription/:token" element={<Register/>}/>
                <Route path="/connexion" element={user ? <Navigate to="/"/> : <Login/>}/>
                <Route path="/artisan/:id/modifier-mdp" element={<Password/>}/>
                <Route path="/artisan/:id/modifier-informations" element={<Modification/>}/>
                <Route path="/produit/:id" element={<Single product/>}/>
                <Route path="/post/:id" element={<Single post/>}/>
                <Route path="/artisan/:id/ajouter-produit" element={<Create product/>}/>
                <Route path="/artisan/:id/nouveau-post" element={<Create post/>}/>
                <Route path="/artisan/:id" element={<Artisan/>}/>
                <Route path="/chat" element={user ? <Chat/> : <Navigate to="/"/>}/>
                <Route path="/produits" element={<Products/>}/>
                <Route path="/posts" element={<Posts/>}/>
                <Route path="/artisans" element={<Artisans/>}/>
                <Route index path="/" element={<Home/>}/>
            </Routes>
        </>
    )
}
