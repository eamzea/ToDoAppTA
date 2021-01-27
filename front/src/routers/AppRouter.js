import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import LoginScreen from '../components/auth/LoginScreen';
import LoadingScreen from '../components/ui/LoadingScreen';
import { PrivateRoutes } from './PrivateRoute';
import { PublicRoutes } from './PublicRoute';
import ToDo from '../components/ToDo/ToDo';
import { GlobalContext } from '../ToDoApp';

const AppRouter = () => {
  const { actions, states, dispatch } = useContext(GlobalContext);

  const start = () => {
    dispatch.ui(actions.ui.startLoading());
    actions.auth
      .startChecking()
      .then(data => {
        data && dispatch.auth(data);
        dispatch.ui(actions.ui.endLoading());
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    start();
  }, []);

  if (states.ui.loading) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      <div>
        <Switch>
          <PublicRoutes
            exact
            path="/login"
            component={LoginScreen}
            isAuthenticated={!!states.auth.uid}
          />
          <PrivateRoutes
            exact
            path="/"
            component={ToDo}
            isAuthenticated={!!states.auth.uid}
          />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
};

export default AppRouter;
