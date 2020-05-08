import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Error from "../../components/Error";
import "./../../../assets/scss/style.scss";
import Aux from "../../../hoc/_Aux";
import Breadcrumb from "../../layout/AdminLayout/Breadcrumb";

export default function SignUp({ login, mostrarError }) {
  const [emailYPassword, setEmailYPassword] = useState({
    email: "",
    password: "",
  });
  function handleInputChange(e) {
    setEmailYPassword({
      ...emailYPassword,
      [e.target.name]: e.target.value,
    });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const { data } = await login(
        emailYPassword.email,
        emailYPassword.password
      );
      console.log("evento login");
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
                  <i className="feather icon-unlock auth-icon" />
                </div>
                <h3 className="mb-4">Login</h3>
                <div className="input-group mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    name="email"
                    onChange={handleInputChange}
                    value={emailYPassword.email}
                  />
                </div>
                <div className="input-group mb-4">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="password"
                    name="password"
                    onChange={handleInputChange}
                    value={emailYPassword.password}
                  />
                </div>
                <div className="form-group text-left">
                  <div className="checkbox checkbox-fill d-inline">
                    <input
                      type="checkbox"
                      name="checkbox-fill-1"
                      id="checkbox-fill-a1"
                    />
                    <label htmlFor="checkbox-fill-a1" className="cr">
                      {" "}
                      Recordar credenciales
                    </label>
                  </div>
                </div>
                <button className="btn btn-primary shadow-2 mb-4">
                  Ingresar
                </button>
                <p className="mb-2 text-muted">
                  Olvidé mi contraseña{" "}
                  <NavLink to="/auth/reset-password">Restablecer</NavLink>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Aux>
  );
}
