import { types } from '../types/types';

export const initialAuthState = {
  checking: true,
  uid: null,
  name: null,
};

export const authReducer = (state = initialAuthState, action) => {
  switch (action.type) {
    case types.authLogin:
      return {
        ...state,
        ...action.payload,
        checking: false,
      };
    case types.authCheckingFinish:
      return {
        ...state,
        checking: false,
      };
    case types.authLogout:
      return {
        checking: false,
      };
    default:
      return state;
  }
};
