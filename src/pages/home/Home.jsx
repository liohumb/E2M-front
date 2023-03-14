import Artisan from '../../components/artisan/Artisan'
import Add from '../../components/add/Add'
import Post from '../../components/post/Post'
import Sponsor from '../../components/sponsor/Sponsor'
import Suggest from '../../components/suggest/Suggest'

import './home.scss'

export default function Home(  ) {
    return (
        <section className="home section">
            <div className="home__container">
                <div className="home__container-left">
                    <Artisan/>
                </div>
                <div className="home__container-middle">
                    <Add/>
                    <Post/>
                    <Post/>
                </div>
                <div className="home__container-right">
                    <Sponsor/>
                    <Suggest/>
                </div>
            </div>
        </section>
    )
}