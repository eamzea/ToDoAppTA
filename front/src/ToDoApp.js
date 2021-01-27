import React, { createContext, useReducer } from 'react';
import AppRouter from './routers/AppRouter';
import { authReducer, initialAuthState } from './reducers/authReducer';
import { initialUiState, uiReducer } from './reducers/uiReducer';
import UiActions from './actions/ui';
import AuthActions from './actions/auth';
import { initialToDoState, todoReducer } from './reducers/todoReducer';
import TodoActions from './actions/todo';

export const GlobalContext = createContext();

const ToDoApp = () => {
  const [AuthState, dispathAuth] = useReducer(authReducer, initialAuthState);
  const [UiState, dispatchUi] = useReducer(uiReducer, initialUiState);
  const [ToDoState, dispatchToDo] = useReducer(todoReducer, initialToDoState);

  return (
    <GlobalContext.Provider
      value={{
        states: { auth: AuthState, ui: UiState, todo: ToDoState },
        actions: { ui: UiActions, auth: AuthActions, todo: TodoActions },
        dispatch: { auth: dispathAuth, ui: dispatchUi, todo: dispatchToDo },
      }}
    >
      <AppRouter />
    </GlobalContext.Provider>
  );
};

export default ToDoApp;
