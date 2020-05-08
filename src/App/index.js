import React, { useState, useEffect, Suspense } from "react";
import {Switch, Route } from "react-router-dom";
import Loadable from "react-loadable";
import Axios from "axios";
import {
  setToken,
  deleteToken,
  getToken,
  initAxiosInterceptors
} from "./Helpers/auth-helpers";
import Error from "./../App/components/Error";
import "../../node_modules/font-awesome/scss/font-awesome.scss";
import URL from '../apiUrl';
import Loader from "./layout/Loader";
import Aux from "../hoc/_Aux";
import ScrollToTop from "./layout/ScrollToTop";
import routes from "../route";
import SignIn from "./Views/Auth/SignIn";
import SignUp from "./Views/Auth/SignUp";

const AdminLayout = Loadable({
  loader: () => import("./layout/AdminLayout"),
  loading: Loader
});

initAxiosInterceptors();
export default function App() {
  const [usuario, setUsuario] = useState(null); // no sabemos si hay un usuario autenticado
  const [cargandoUsuario, setCargandoUsuario] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function cargarUsuario() {
      if (!getToken()) {
        setCargandoUsuario(false);
        return;
      }

      try {
        const { data: usuario } = await Axios.get(URL.dev.whoami);
        setUsuario(usuario);
        setCargandoUsuario(false);
      } catch (error) {
        console.log(error);
      }
    }

    cargarUsuario();
  }, []);

  async function login(email, password) {
    const { data } = await Axios.post(URL.dev.signin, {
      email,
      password
    });
    setUsuario(data.usuario);
    setToken(data.token);
  }

  async function signup(usuario) {
    const { data } = await Axios.post(URL.dev.signup, usuario);
    setUsuario(data.usuario);
    setToken(data.token);
  }
  function mostrarError(mensaje) {
    setError(mensaje);
  }
  function esconderError() {
    setError(null);
  }
  function logout() {
    setUsuario(null);
    deleteToken();
  }
  const menu = routes.map((route, index) => {
    return route.component ? (
      <Route
        key={index}
        path={route.path}
        exact={route.exact}
        name={route.name}
        render={props => <route.component {...props} />}
      />
    ) : null;
  });
  if (cargandoUsuario) {
    return ( 
        <Loader /> 
    );
  }
  return (
    <>
      <Error message={error} esconderError={esconderError} />
      {usuario ? (
        <LoginRoutes menu={menu} />
      ) : (
        <LogoutRoutes
          login={login}
          signup={signup}
          mostrarError={mostrarError}
        />
      )}
    </>
  );
}

function LoginRoutes({ menu }) {
  return (
    <Aux>
      <ScrollToTop>
        <Suspense fallback={<Loader />}>
          <Switch>
            menu={menu}
            <Route path="/" component={AdminLayout} default/>
          </Switch>
        </Suspense>
      </ScrollToTop>
    </Aux>
  );
}
function LogoutRoutes({ login, signup, mostrarError }) {
  return (
    <Aux>
      <ScrollToTop>
        <Suspense fallback={<Loader />}>
          <Switch>
            <Route
              path="/auth/signup"
              render={props => (
                <SignUp
                  {...props}
                  signup={signup}
                  mostrarError={mostrarError}
                />
              )}
            />
            <Route
              render={props => (
                <SignIn {...props}
                 login={login}
                 mostrarError={mostrarError} />
              )}
              default
            />
          </Switch>
        </Suspense>
      </ScrollToTop>
    </Aux>
  );
}
