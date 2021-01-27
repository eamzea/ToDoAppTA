import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { startChecking } from '../actions/auth';
import LoginScreen from '../components/auth/LoginScreen';
import CalendarScreen from '../components/calendar/CalendarScreen';
import LoadingScreen from '../components/ui/LoadingScreen';
import { PrivateRoutes } from './PrivateRoute';
import { PublicRoutes } from './PublicRoute';

const AppRouter = () => {
  // useEffect(() => {
  //   dispatch(startChecking());
  // }, [dispatch]);

  if (true) {
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
            isAuthenticated={!!uid}
          />
          <PrivateRoutes
            exact
            path="/"
            component={CalendarScreen}
            isAuthenticated={!!uid}
          />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
};

export default AppRouter;
