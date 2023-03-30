import Side from '../../navigations/side/Side'
import Form from '../../components/form/Form'

import './login.scss'

export default function Login() {
    return (
        <section className="login section">
            <div className="login__container section__container">
                <div className="login__container-left section__container-left">
                    <Side/>
                </div>
                <div className="login__container-right section__container-right">
                    <Form auth login/>
                </div>
            </div>
        </section>
    )
}