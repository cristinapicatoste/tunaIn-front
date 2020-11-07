import React, { useEffect, useState } from "react";
import { serverRequest } from "../../hooks/urlBack";
import { DecodeToken } from "../../util/DecodeToken";
import { getToken } from "../../util/LocalStorage.utils";
import "./EditUserProfile.css";

export const EditUserProfile = () => {
  // const [canales, setCanales] = useState("No tienes ningún canal");
  const [user, setUser] = useState({});
  const [userId, setUserId] = useState(null);
  // Contiene los valores del formulario:
  const [editedUser, setEditedUser] = useState({});
  const sitio = "data/user";

  useEffect(() => {
    const token = getToken();
    const decodedToken = DecodeToken(token);
    setUserId(decodedToken.id);

    serverRequest(`${sitio}/${userId}`, "GET")
      .then((response) => {
        setUser(response);
      })
      .catch(console.log);
  }, [userId]);

  // Maneja el estado del formulario:
  const handleChanges = (event) => {
    // Recojo el name y el valor del input:
    const { value, name } = event.target;
    setEditedUser((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    // Prevengo que ser recargue la página:
    e.preventDefault();
    // Hago una petición post al servidor:
    serverRequest(`${sitio}/${userId}`, "PUT", editedUser)
      .then((response) => setUser(response))
      .catch(console.log);
    // Reseteo los campos del formulario:
    e.target.reset();
  };

  const options = { month: "2-digit", day: "2-digit", year: "numeric" };
  const fecha = new Date(user.fechaNacimiento).toLocaleString("es-ES", options);

  return (
    <div className="EditUserProfile-wrap">
      <h1>Edita tu perfil</h1>
      <form onSubmit={handleSubmit}>
        <label id="name-label">Nombre Completo</label>
        <input
          name="nombre"
          type="text"
          onChange={handleChanges}
          placeholder={user.nombre}
        />
        <label id="username-label">Username</label>
        <input
          name="username"
          type="text"
          placeholder={user.username}
          onChange={handleChanges}
        />
        <label id="fechaNacimiento-label">Fecha de nacimiento {fecha}</label>
        <input name="fechaNacimiento" type="date" onChange={handleChanges} />
        <label id="email-label">Email</label>
        <input
          name="email"
          type="email"
          placeholder={user.email}
          onChange={handleChanges}
        />
        <label id="password-label">Password</label>
        <button className="button-cambiar-pss">Cambiar contraseña</button>
        <br />
        <button>Guardar cambios</button>
      </form>
    </div>
  );
};