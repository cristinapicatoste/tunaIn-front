import React from "react";
import './UserCard.css';
import { Link, useHistory } from "react-router-dom";



export const UserCard = ({ userId, nombre, username, email, img }) => {
    let history = useHistory();
    function handleClick() {
        history.push(`profile/${userId}`);
    }


    return (
        <div className="cartaUsuario">
            <h4>{nombre}</h4>
            <h6>{username}</h6>
            <h6>{email}</h6>
            <Link className="UserCard-title" onClick={handleClick}><p className="enlace">Ver user</p></Link>
        </div>
    );
};
