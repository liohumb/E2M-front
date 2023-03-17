import { useContext } from 'react'
import { Context } from '../../context/Context'

import Side from '../../navigations/side/Side'

import './create.scss'

export default function Create() {
    const {user} = useContext(Context)

    return (
        <section className="create">
            <div className="create__container section__container">
                <div className="create__container-left section__container-left"></div>
                <div className="create__container-right section__container-right">
                    <Side name={user.firstname + ' ' + user.lastname} society={user.society}/>
                </div>
            </div>
        </section>
    )
}