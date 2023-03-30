import Card from '../card/Card'

import './search.scss'

export default function Search( { searchResults } ) {

    return (
        <div className="search">
            {searchResults && searchResults.users && searchResults.users.length > 0 &&
                <>
                    <h1 className="search__title">Les Artisans</h1>
                    <ul className="search__contents section__contents">
                        {searchResults.users.map( ( data ) => (
                            <Card key={data._id} data={data}/>
                        ) )}
                    </ul>
                </>
            }
            {searchResults && searchResults.posts && searchResults.posts.length > 0 &&
                <>
                    <h1 className="search__title">Les Posts</h1>
                    <ul className="search__contents section__contents">
                        {searchResults.posts.map( ( data ) => (
                            <Card key={data._id} data={data}/>
                        ) )}
                    </ul>
                </>
            }
            {searchResults && searchResults.products && searchResults.products.length > 0 &&
                <>
                    <h1 className="search__title">Les Produits</h1>
                    <ul className="search__contents section__contents">
                        {searchResults.products.map( ( data ) => (
                            <Card key={data._id} data={data}/>
                        ) )}
                    </ul>
                </>
            }
        </div>
    )
}