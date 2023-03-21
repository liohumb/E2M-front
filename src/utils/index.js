import axios from 'axios'

/* FETCH DATA */
export async function getData( collection, id, data ) {
    try {
        const response = await axios.get( `http://localhost:8080/${collection}/${id}` )
        data( response.data )
    } catch (e) {}
}

export async function getAll( collection, datas ) {

    try {
        const response = await axios.get( `http://localhost:8080/${collection}` )
        datas( response.data )
    } catch (e) {}
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