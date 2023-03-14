import logo from '../../assets/images/logos/logo-alt.png'
import './login.scss'

export default function Login(  ) {
    return (
        <section className="login">
            <div className="login__container">
                <h1 className="login__title">
                    <img src={logo} alt=" "/>
                </h1>
                <form action="" className="form">
                    <div className="form__content">
                        <label htmlFor="email"></label>
                        <input type="email" name="email" id="email" placeholder="Merci de saisir votre email" required/>
                    </div>
                </form>
            </div>
        </section>
    )
}