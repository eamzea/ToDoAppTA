import Swal from 'sweetalert2';
import { fetchNoToken, fetchWithToken } from '../helpers/fetch';
import { types } from '../types/types';
// import { eventLogout } from './events';

const startLogin = async (email, password) => {
  const resp = await fetchNoToken('auth/login', { email, password }, 'POST');
  const body = await resp.json();

  if (body.ok) {
    localStorage.setItem('token', body.token);
    localStorage.setItem('token-init-date', new Date().getTime());

    return {
      type: types.authLogin,
      payload: {
        uid: body.uid,
        name: body.name,
      },
    };
  } else {
    Swal.fire('Error', body.msg, 'error');
  }
};

const startRegister = async (email, password, name) => {
  const resp = await fetchNoToken(
    'auth/new',
    { email, password, name },
    'POST'
  );
  const body = await resp.json();

  if (body.ok) {
    localStorage.setItem('token', body.token);
    localStorage.setItem('token-init-date', new Date().getTime());

    return {
      type: types.authLogin,
      payload: {
        uid: body.uid,
        name: body.name,
      },
    };
  } else {
    Swal.fire('Error', body.msg, 'error');
  }
};

const startChecking = async () => {
  const resp = await fetchWithToken('auth/renew');
  const body = await resp.json();

  if (body.ok) {
    localStorage.setItem('token', body.token);
    localStorage.setItem('token-init-date', new Date().getTime());

    return {
      type: types.authLogin,
      payload: {
        uid: body.uid,
        name: body.name,
      },
    };
  } else {
    return {
      type: types.authCheckingFinish,
    };
  }
};

const startLogout = () => {
  localStorage.clear();
  // dispatch(eventLogout());
  return {
    type: types.authLogout,
  };
};

const AuthActions = {
  startLogin,
  startRegister,
  startChecking,
  startLogout,
};

export default AuthActions;
