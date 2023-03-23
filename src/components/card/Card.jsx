import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Profil from "../profil/Profil";
import { getData, getPreview } from "../../utils";

import "./card.scss";

export default function Card({ data }) {
    const navigate = useNavigate();
    const preview = getPreview(55, data.description);

    const [user, setUser] = useState([]);
    const [isTopCard, setIsTopCard] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    getData("user", data.artisan, setUser);

    const checkIfTopCard = () => {
        const cardElement = document.querySelector(".card");
        const cardPosition = cardElement.getBoundingClientRect();

        if (cardPosition.top <= 0) {
            setIsTopCard(true);
        } else {
            setIsTopCard(false);
        }
    };

    useEffect(() => {
        checkIfTopCard();
        window.addEventListener("scroll", checkIfTopCard);

        return () => {
            window.removeEventListener("scroll", checkIfTopCard);
        };
    }, []);

    const handleDetail = () => {
        let path;

        if (data.title) {
            path = "produit";
        } else if (data.role) {
            path = "artisan";
        } else {
            path = "post";
        }

        navigate(`/${path}/${data._id}`);
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <li
            className={`card ${isTopCard ? "top-card" : ""} ${
                isHovered ? "hovered" : ""
            }`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {data.picture && (
                <img
                    src={`http://localhost:8080/images/${data.picture}`}
                    alt=""
                    className="card__picture"
                />
            )}
            {data.picture === null ? (
                <div className="card__content" onClick={handleDetail}>
                    <p>{preview}</p>
                    {!data.role && (
                        <div className="card__content-profil">
                            <Profil artisan={user} />
                        </div>
                    )}
                </div>
            ) : (
                <div className="card__container" onClick={handleDetail}>
                    <p>{preview}</p>
                    {!data.role && (
                        <div className="card__container-profil">
                            <Profil artisan={user} />
                        </div>
                    )}
                </div>
            )}
        </li>
    );
}
