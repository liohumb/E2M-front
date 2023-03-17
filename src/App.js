import { useEffect, useContext } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { Context } from './context/Context'

import Header from './navigations/header/Header'
import Login from './authentification/login/Login'
import Register from './authentification/register/Register'
import Home from './pages/home/Home'
import Profils from './pages/profils/Profils'
import Modification from './pages/modification/Modification'
import Social from './pages/social/Social'
import Password from './pages/password/Password'

import './assets/styles/style.scss'
import Products from './pages/products/Products'
import Create from './pages/create/Create'

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
                <Route path="/profil/:id/modifier-mot-de-passe" element={user ? <Password/> : <Navigate to="/connexion"/>}/>
                <Route path="/profil/:id/reseaux-social" element={user ? <Social/> : <Navigate to="/connexion"/>}/>
                <Route path="/profil/:id/modifier" element={user ? <Modification/> : <Navigate to="/connexion"/>}/>
                <Route path="/profil/:id/produits/ajouter" element={user ? <Create/> : <Navigate to="/connexion"/>}/>
                <Route path="/profil/:id/produits" element={user ? <Products/> : <Navigate to="/connexion"/>}/>
                <Route path="/profil/:id" element={user ? <Profils/> : <Navigate to="/connexion"/>}/>
                <Route path="/inscription/:token" element={<Register/>}/>
                <Route path="/connexion" element={user ? <Navigate to="/"/> : <Login/>}/>
                <Route index path="/" element={<Home/>}/>
            </Routes>
        </>
    )
}
