import axios from 'axios'

/* POST */
export async function checkEmail(path, data, res, param, option) {
    try {
        const response = await axios.post(`http://localhost:8080/auth/${path}`, data)
        res( response.data.passwordRequired )
        param( true )
        option( !response.data.passwordRequired )
    } catch (e) {
        param( false )
        option( false )
    }
}

export function postData( path, data ) {
    return axios.post(`http://localhost:8080/${path}`, data)
}

/* GET */
export async function getData( path, id, data ) {
    try {
        const response = await axios.get( `http://localhost:8080/${path}/${id}` )
        data( response.data )
    } catch (e) {
    }
}

export async function getAll( path, datas ) {

    try {
        const response = await axios.get( `http://localhost:8080/${path}` )
        datas( response.data )
    } catch (e) {
    }
}

export function getSearch( search, result ) {
    axios.get( `http://localhost:8080/search?q=${search}` )
        .then( ( response ) => {
            result( response.data )
        } )
        .catch( ( e ) => {
            console.error( e )
        } )
}

/* UPDATE */
export function updateData( path, id, data ) {
    return axios.put(`http://localhost:8080/${path}/${id}`, data)
}

/* DELETE */
export function deleteData( path, id, user, userId ) {
    return axios.delete(`http://localhost:8080/${path}/${id}`, {
        data: {user: userId}
    })
}
export function deleteComment( path, id ) {
    return axios.delete(`http://localhost:8080/${path}/${id}`)
}

export async function checkToken( path, token, navigate, param1, param2 ) {
    try {
        const response = await axios.get( `http://localhost:8080/${path}/${token}` );
        const data = response.data;

        if (data === false) {
            navigate( '/connexion' );
            return null;
        }

        param1( data.email );
        param2( data.email );
    } catch (e) {
    }
}

/* ORGANISE DATA */

export function sortAll( datas ) {
    datas.sort( ( a, b ) => new Date( a.created_at ) - new Date( b.created_at ) )
    return datas
}

/* FORMAT DATA */

export function getPreview( length, data ) {
    const maxLength = length
    return data.length > maxLength
        ? data.slice( 0, maxLength ) + '…'
        : data
}


export function formatPrice( price ) {
    return parseFloat( price ).toFixed( 2 )
        .replace( '.', ' € ' )
        .replace( ',', '' )
}

/* TOGGLE */
export function toggle( item, setItem ) {
    if (item) {
        setItem(false)
    } else {
        setItem(true)
    }
}