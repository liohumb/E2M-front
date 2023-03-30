import Side from '../../navigations/side/Side'
import Form from '../../components/form/Form'

import './register.scss'

export default function Register() {
    return (
        <section className="register section">
            <div className="register__container section__container">
                <div className="register__container-left section__container-left">
                    <Side/>
                </div>
                <div className="register__container-right section__container-right">
                    <Form auth register/>
                </div>
            </div>
        </section>
    )
}