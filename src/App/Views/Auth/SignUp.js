import React,{useState} from "react";
import { NavLink } from "react-router-dom"; 
import "./../../../assets/scss/style.scss";
import Aux from "../../../hoc/_Aux";
import Breadcrumb from "../../../App/layout/AdminLayout/Breadcrumb";
import DEMO from "../../../store/constant";

export default function SignUp({ signup, mostrarError }) {
  const [usuario, setUsuario] = useState({
    email: "",
    username: "",
    password: "",
    type: "Cliente"
  });

  function handleInputChange(e) {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await signup(usuario);
    } catch (error) { 
      //mostrarError(error.response.data);
    }
  }
  return (
    <Aux>
      <Breadcrumb />
      <div className="auth-wrapper">
        <div className="auth-content">
          <div className="auth-bg">
            <span className="r" />
            <span className="r s" />
            <span className="r s" />
            <span className="r" />
          </div>
          <div className="card">
            <div className="card-body text-center">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <i className="feather icon-user-plus auth-icon" />
              </div>
              <h3 className="mb-4">Crear cuenta</h3>
              <div className="input-group mb-3">
                <input
                  type="text"
                  name="username"
                  className="form-control"
                  placeholder="Username"
                  minLength="3"
                  maxLength="100"
                  required
                  onChange={handleInputChange}
                  value={usuario.username}
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  name="email"
                  required
                onChange={handleInputChange}
                value={usuario.email}
                />
              </div>
              <div className="input-group mb-4">
                <input
                  type="password"
                  className="form-control"
                  placeholder="password"
                  name="password"
                  minLength="3"
                    maxLength="50"
                    required 
                    onChange={handleInputChange}
                    value={usuario.password}
                />
              </div>
              <div className="form-group text-left">
                <div className="checkbox checkbox-fill d-inline">
                  <input
                    type="checkbox"
                    name="checkbox-fill-2"
                    id="checkbox-fill-2"
                  />
                  <label htmlFor="checkbox-fill-2" className="cr">
                  Envíame el  <a href={DEMO.BLANK_LINK}> boletin</a>{" "}
                    semanal.
                  </label>
                </div>
              </div>
              <button type="submit" className="btn btn-primary shadow-2 mb-4">Crear cuenta</button>
              <p className="mb-0 text-muted">
              ¿Ya tienes una cuenta?{" "}
                <NavLink to="/auth/signin">Ingresar</NavLink>
              </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Aux>
  );
}
