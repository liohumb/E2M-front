import './modifier.scss';
import users from "../../assets/images/user/profil.png"
import { useState } from 'react';

export default function Modifier() {

    const [icon, setIcon] = useState({
        actifsInformation: "false",
        actifsTarifs: "false"
    })




    function iconInformations() {
        if (icon.actifsInformation === "false") {
            return <i class='bx bx-chevrons-down'></i>
        } else {
            return <i onclick={retourInformation} class='bx bx-chevrons-up' ></i>
        }
    }

    function retourInformation() {
        console.log("oof");
        setIcon([{ actifsInformation: "false" }]);
    }

    function clickInformations() {
        console.log("information");
        setIcon([{ actifsInformation: "true" }])
    }

    function clickTarifs() {
        console.log("tarifs");
    }

    return (
        <section className="modifier section">
            <div className="modifier__container">
                <div className="modifier__container-left">
                    <div className="modifier__container box-left">
                        <div className="modifier__container-element">
                            <div className="box">
                                <div className="box-name">
                                    <div className="box-name cont">
                                        <h1>Nom: </h1>
                                        <h2>Doe</h2>

                                        {/* <i onClick={clickModifs}class='bx bxs-edit'></i> */}
                                    </div>
                                    <div className="box-name cont">
                                        <h1>Prenom: </h1>
                                        <h2>John</h2>
                                        {/* <i onClick={clickModifs}class='bx bxs-edit'></i> */}
                                    </div>
                                    <div className="box-name cont">
                                        <h1>Email: </h1>
                                        <h2>JohnDoe@gmail.com</h2>
                                    </div>

                                    <div className="box-name cont">
                                        <h1>Mot de Passe: </h1>
                                        <input id="mdp" type="password" value="123456" />
                                    </div>

                                </div>
                                <div className="box-img">
                                    <img src={users} alt="" />
                                </div>
                            </div>

                            <div className="box">

                            </div>

                        </div>

                    </div>
                </div>

                <div className="modifier__container-right">
                    <div className="modifier__container-modifs box-right">
                        <h1 onClick={clickInformations}>Informations personnel</h1>
                        <h1>{iconInformations()}</h1>
                    </div>
                    <div className="modifier__container box-right">
                        <h1 onClick={clickTarifs}>Tarifs</h1>
                    </div>
                    <div className="modifier__container box-right">

                    </div>
                </div>

            </div>
        </section>
    )
}