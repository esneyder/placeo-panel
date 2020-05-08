import React from 'react';

const SignUp1 = React.lazy(() => import('./App/Views/Auth/SignUp'));
const Signin1 = React.lazy(() => import('./App/Views/Auth/SignIn'));

const route = [
    { path: '/auth/signup', exact: true, name: 'Crear cuenta', component: SignUp1 },
    { path: '/auth/signin', exact: true, name: 'Autenticarme', component: Signin1 }
];

export default route;