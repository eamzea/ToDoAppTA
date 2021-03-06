import React, { useContext } from 'react';
import Swal from 'sweetalert2';
import { useForm } from '../../hooks/useForm';
import { GlobalContext } from '../../ToDoApp';

const LoginScreen = () => {
  const { actions, states, dispatch } = useContext(GlobalContext);

  const [formLoginValues, handleLoginInputChange] = useForm({
    lEmail: '',
    lPassword: '',
  });

  const [formRegisterValues, handleRegisterInputChange] = useForm({
    rEmail: '',
    rPassword: '',
    rPassword2: '',
    rName: '',
  });

  const { lEmail, lPassword } = formLoginValues;
  const { rEmail, rPassword, rName, rPassword2 } = formRegisterValues;

  const handleLogin = e => {
    e.preventDefault();

    actions.auth
      .startLogin(lEmail, lPassword)
      .then(data => data && dispatch.auth(data))
      .catch(err => console.log(err));
  };

  const handleRegister = e => {
    e.preventDefault();

    if (rPassword !== rPassword2) {
      return Swal.fire('Error', 'Passwords has to be equals', 'error');
    }

    actions.auth
      .startRegister(rEmail, rPassword, rName)
      .then(data => data && dispatch.auth(data))
      .catch(err => err);
  };

  return (
    <div className="container login-container d-flex justify-content-center align-items-center rounded">
      <div className="row divs-container">
        <div className="col-md-6 login-form-1">
          <h3>Login</h3>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="your@email.com"
                value={lEmail}
                name="lEmail"
                onChange={handleLoginInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="*******"
                name="lPassword"
                value={lPassword}
                onChange={handleLoginInputChange}
              />
            </div>
            <div className="form-group">
              <input type="submit" className="btnSubmit" value="Login" />
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h3>Register</h3>
          <form onSubmit={handleRegister}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Edgar"
                value={rName}
                name="rName"
                onChange={handleRegisterInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="tu@correo.com"
                value={rEmail}
                name="rEmail"
                onChange={handleRegisterInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={rPassword}
                name="rPassword"
                onChange={handleRegisterInputChange}
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Confirm Password"
                value={rPassword2}
                name="rPassword2"
                onChange={handleRegisterInputChange}
              />
            </div>

            <div className="form-group">
              <input type="submit" className="btnSubmit" value="Register" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
