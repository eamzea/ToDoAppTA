import React, { useState } from 'react';
import UserContext from './utils/user.context';
import AppRouter from './routers/AppRouter';

const ToDoApp = () => {
  const [userState, setUserState] = useState();

  return (
    <UserContext.Provider value={{ user: userState, updateUser: setUserState }}>
      <AppRouter />
    </UserContext.Provider>
  );
};

export default ToDoApp;
